import React, { Component } from "react";
import { Input } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";
import TableSix from "../Table/TableSix";
const { Search } = Input;

import "./Content.css";

export default class ContentSix extends Component {
  render() {
    return (
      <div>
        <div className="content-top">
          <div className="content-top-left">
            <div className="content-top-left-sum-item">
              {localStorage.getItem("countUser")} nhân viên
            </div>
            <Search
              placeholder="Tìm kiếm"
              allowClear
              onSearch={this.onSearch}
              style={{ width: 200 }}
              className="table-btn-search"
            />
          </div>
          <div className="content-top-right">
            <Link to="/crm/addUserSix">
              {" "}
              <Button className="btn-add-user">Thêm nhân viên</Button>
            </Link>
          </div>
        </div>
        <TableSix />
      </div>
      // <div>aaaa</div>
    );
  }
}
