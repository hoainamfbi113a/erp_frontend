import React, { Component } from "react";
import { Input } from "antd";
import { Button } from "antd";

import TableRoles from "components/Table/TableRoles_v2";
const { Search } = Input;

import "./Content.css";

export default class ContentRoles extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      visible: false,
      registerUserSuccess: false
    };
  }
  showModal = () => {
    // this.clickChild()
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
              10 Roles
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
              Thêm roles mới
            </Button>
          </div>
        </div>
        <TableRoles showModalRoles={this.state.visible}
        // setClick={click => this.clickChild = click}
        hideModal={this.hideModal} showModal={this.showModal} />
      </div>
    );
  }
}
