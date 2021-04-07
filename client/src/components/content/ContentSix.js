import React, { useState , useContext } from "react";
import { Input } from "antd";
import { Button } from "antd";

import { Link ,useRouteMatch } from "react-router-dom";
import TableSix from "components/Table/TableSix";
const { Search } = Input;

import "./Content.css";
import { PermissionContext } from "../RouterULR/RouterUrl";
import withRoute from "../RouterULR/route/withRoute";

const ContentSix = () => {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState(0);
  let { path } = useRouteMatch();
  const {permissions} = useContext(PermissionContext)
  
  return (
    <div>
      <div className="content-top">
        <div className="content-top-left">
          <div className="content-top-left-sum-item">{total} Nhân viên</div>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={(e) => setValue(e)}
            style={{ width: 200 }}
            className="table-btn-search"
          />
        </div>
        <div className="content-top-right">
          <Link to={`${path}/create`}>
            <Button className="btn-add-user-six">Thêm hồ sơ nhân viên</Button>
          </Link>
        </div>
      </div>
      <TableSix valueSearch={value} totalEmploy={setTotal}/>
    </div>
  );
}

export default withRoute(ContentSix)