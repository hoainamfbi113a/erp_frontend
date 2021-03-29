import React, { useState } from "react";
import { Input, Button } from "antd";
import TableParts from "components/Table/TableParts";
const { Search } = Input;

import "./Content.css";

export default function ContentParts() {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  return (
    <div>
      <div className="content-top">
        <div className="content-top-left">
          <div className="content-top-left-sum-item">
            {total} tổ làm việc
          </div>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={(e) => setValue(e)}
            style={{ width: 200 }}
            className="table-btn-search"
          />
        </div>
        <div className="content-top-right">
          <Button onClick={showModal} className="btn-add-user-six">
            Thêm tổ
          </Button>
        </div>
      </div>
      <TableParts
        valueSearch={value}
        showModalParts={visible}
        hideModal={hideModal}
        showModal={showModal}
        totalPart={setTotal}
      />
    </div>
  );
}
