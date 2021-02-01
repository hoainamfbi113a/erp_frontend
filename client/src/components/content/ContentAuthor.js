import React, { Component } from "react";
import { Input } from "antd";
import { Button, Modal, DatePicker } from "antd";

import { message } from "antd";
import TableSix from "components/Table/TableSix";
const { Search } = Input;

import "./Content.css";

export default class ContentAuthor extends Component {
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
               nhân viên
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
              Thêm nhân viên
            </Button>
          </div>
        </div>
        <TableSix showModalAddUser={this.state.visible} hideModal={this.hideModal} />
      </div>
    );
  }
}
