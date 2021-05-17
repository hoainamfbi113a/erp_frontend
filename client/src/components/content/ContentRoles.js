import React, { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";

import TableRoles from "components/Table/TableRoles_v2";
const { Search } = Input;

import "./Content.css";

const ContentRoles = () => {
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
          <div className="content-top-left-sum-item">{total} Roles</div>
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
            Thêm roles mới
          </Button>
        </div>
      </div>
      <TableRoles
        showModalData={visible}
        hideModal={hideModal}
        showModal={showModal}
        valueSearch={value}
        total={setTotal}
      />
    </div>
  );
};
export default ContentRoles;