import React, { useState } from "react";
import { Input, Button } from "antd";
import TableRolePosition from "components/Table/TableRolePosition";
const { Search } = Input;
import "./Content.css";

export default function ContentPosition() {
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
            {total} chức vụ
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
        </div>
      </div>
      <TableRolePosition
        // valueSearch={value}
        // showModalPosition={visible}
        // hideModal={hideModal}
        // showModal={showModal}
        // totalPosition={setTotal}
      />
    </div>
  );
}
