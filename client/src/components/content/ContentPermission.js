import React, { Component } from "react";
import { Input } from "antd";
import { Button } from "antd";

import TablePermission from "../Table/TablePermission";
const { Search } = Input;

import "./Content.css";

export default class ContentPermission extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      registerUserSuccess: false
    };
  }
  showModal = () => {
    this.setState({
      visible:true
    })
  }
  hideModal =() => {
    this.setState({
      visible:false
    })
  }
  render() {
    return (
      <div>
        <div className="content-top">
          <div className="content-top-left">
            <div className="content-top-left-sum-item">
              10 Permission
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
            <Button onClick={this.showModal} className="btn-add-user-six">
              Thêm permission
            </Button>
          </div>
        </div>
        <TablePermission showModalPermission={this.state.visible} hideModal={this.hideModal} showModal={this.showModal} />
      </div>
    );
  }
}
