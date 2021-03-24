import React, { Component } from "react";
import { Input } from "antd";
import { Button } from "antd";

import TableParts from "components/Table/TableParts";
const { Search } = Input;

import "./Content.css";

export default class ContentParts extends Component {
  constructor() {
    super();
    this.state = {
      valueSearch: "",
      visible: false,
      registerUserSuccess: false,
      totalPart: 0,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  totalPart = (value) => {
    this.setState({
      totalPart: value,
    });
  };

  onSearch = (value) => {
    this.setState({
      valueSearch: value,
    })
  }

  render() {
    return (
      <div>
        <div className="content-top">
          <div className="content-top-left">
            <div className="content-top-left-sum-item">
              {this.state.totalPart} tổ làm việc
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
              Thêm tổ
            </Button>
          </div>
        </div>
        <TableParts
          valueSearch={this.state.valueSearch}
          showModalParts={this.state.visible}
          hideModal={this.hideModal}
          showModal={this.showModal}
          totalPart={this.totalPart}
        />
      </div>
    );
  }
}
