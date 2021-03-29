import React, { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";

import { Link } from "react-router-dom";
import TableSix from "components/Table/TableSix";
const { Search } = Input;

import "./Content.css";

export default function ContentSix() {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState(0);
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
          <Link to={`/adduser`}>
            <Button className="btn-add-user-six">Thêm hồ sơ nhân viên</Button>
          </Link>
        </div>
      </div>
      <TableSix valueSearch={value} totalEmploy={setTotal}/>
    </div>
  );
}
