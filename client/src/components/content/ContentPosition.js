import React, { Component } from "react";
import { Input } from "antd";
import { Button } from "antd";

import TablePosition from "components/Table/TablePosition";
const { Search } = Input;

import "./Content.css";

export default class ContentPosition extends Component {
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
              10 Position
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
              Thêm Position
            </Button>
          </div>
        </div>
        <TablePosition showModalPosition={this.state.visible} hideModal={this.hideModal} showModal={this.showModal} />
      </div>
    );
  }
}
