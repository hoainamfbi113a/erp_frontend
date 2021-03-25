import React, { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";

import { Link } from "react-router-dom";
import TableSix from "components/Table/TableSix";
const { Search } = Input;

import "./Content.css";

export default function ContentSix() {
  const [valueSearch, setValueSearch] = useState("");
  const [totalEmploy, setTotalEmploy] = useState(0);
  const onSearch = (value) => {
    setValueSearch(value);
  };
  const totalEmployee = (value) => {
    setTotalEmploy(value);
  };
  return (
    <div>
      <div className="content-top">
        <div className="content-top-left">
          <div className="content-top-left-sum-item">{totalEmploy} Nhân viên</div>
          <Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={onSearch}
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
      <TableSix valueSearch={valueSearch} totalEmploy={setTotalEmploy}/>
    </div>
  );
}
