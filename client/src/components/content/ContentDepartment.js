import React, { Component } from "react";
import { Input } from "antd";
import { Button } from "antd";

import TableDepartment from "components/Table/TableDepartment";
const { Search } = Input;

import "./Content.css";

export default class ContentDepartment extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      registerUserSuccess: false,
      totalDepartment:0,
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
  totalDepartment = (value) =>{
    this.setState({
      totalDepartment: value
    })
  }
  render() {
    return (
      <div>
        <div className="content-top">
          <div className="content-top-left">
            <div className="content-top-left-sum-item">
              {this.state.totalDepartment} Phòng ban
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
              Thêm Department
            </Button>
          </div>
        </div>
        <TableDepartment showModalDepartment={this.state.visible} hideModal={this.hideModal} showModal={this.showModal}
                         totalDepartment = {this.totalDepartment}
        />
      </div>
    );
  }
}
