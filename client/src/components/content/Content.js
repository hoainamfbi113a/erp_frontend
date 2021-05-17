import React, { useState, useContext } from "react";
import { Input, Button } from "antd";
const { Search } = Input;
import "./Content.css";
import PermissionContext from "../../context/PermissionContext";
import { checkVisible } from "../../helpers/FuncHelper";

const Content = (props) => {
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
  const ComponentGenerator = () => {
    const Table = props.component;
    return (
      <Table
        valueSearch={value}
        showModalData={visible}
        hideModal={hideModal}
        showModal={showModal}
        total={setTotal}
      />
    );
  }

  return (
    <div>
      <div className="content-top">
        <div className="content-top-left">
          <div className="content-top-left-sum-item">
            {total} {props.name}
          </div>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={(e) => setValue(e)}
            style={{ width: 200 }}
            className="table-btn-search"
          />
        </div>
        { checkVisible(permissions, "create", `api/${props.service}`) && (
          <div className="content-top-right">
            <Button onClick={showModal} className="btn-add-user-six">
              Thêm {props.name}
            </Button>
          </div>
        )}
      </div>
      {ComponentGenerator()}
    </div>
  );
};
export default Content;
