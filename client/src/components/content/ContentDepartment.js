import React, { useState,useContext } from "react";
import { Input, Button } from "antd";
import TableDepartment from "components/Table/TableDepartment";
const { Search } = Input;
import "./Content.css";
import withRoute from "../RouterULR/route/withRoute";
import PermissionContext from "../../context/PermissionContext";

const ContentDepartment = () => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const {permissions,domain} = useContext(PermissionContext)
  
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
          <div className="content-top-left-sum-item">{total} Phòng ban</div>
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
            Thêm Department
          </Button>
        </div>
      </div>
      <TableDepartment
        valueSearch={value}
        showModalDepartment={visible}
        hideModal={hideModal}
        showModal={showModal}
        totalDepartment={setTotal}
      />
    </div>
  );
};
export default withRoute(ContentDepartment);
