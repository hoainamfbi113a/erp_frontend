import React, { useState, useContext } from "react";
import { Input, Button } from "antd";
import TablePosition from "components/Table/TablePosition";
import PermissionContext from "../../context/PermissionContext";
import { checkVisible } from "../../helpers/FuncHelper";
const { Search } = Input;
import "./Content.css";

export default function ContentPosition() {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const { permissions } = useContext(PermissionContext);

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
          <div className="content-top-left-sum-item">{total} chức vụ</div>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={(e) => setValue(e)}
            style={{ width: 200 }}
            className="table-btn-search"
          />
        </div>
        {checkVisible(permissions, "create", "api/positions") && (
          <div className="content-top-right">
            <Button onClick={showModal} className="btn-add-user-six">
              Thêm chức vụ
            </Button>
          </div>
        )}
      </div>
      <TablePosition
        valueSearch={value}
        showModalPosition={visible}
        hideModal={hideModal}
        showModal={showModal}
        totalPosition={setTotal}
      />
    </div>
  );
}
