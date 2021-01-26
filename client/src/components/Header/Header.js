import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Layout, Dropdown, Menu, Avatar, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import docCookies from "doc-cookies"
import { Breadcrumb } from 'antd';

import { logout } from "../../apis/authenticationApi";

import "./Header.css"
const { Header } = Layout;

import {
  LogoutOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
class HeaderLayout extends Component {
  constructor() {
    super();
    this.state = {
      userLogin: "",
      userPass: "",
      ishow: false,
    };
  }
  toggle = () => {
    this.props.collapsed();
  };
  sleep = m => new Promise(r => setTimeout(r, m))
  logOut = async (e) => {
    this.setState({ ishow: !this.state.ishow });
    await this.sleep(800);
    await logout()
    this.props.history.push('/')
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item icon={<RollbackOutlined />}>
          <a target="_blank" rel="noopener noreferrer" >
            Đổi mật khẩu
                </a>
        </Menu.Item>
        <Menu.Item icon={<LogoutOutlined />} onClick={this.logOut}>
          <a >
            Đăng xuất
                </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header-main">
        <Header className="site-layout-background header-main-top">
          <div className="header-left">
          </div>
          <div className="header-right">
            <Badge className="header-notification"
              count={5}
              style={{
                boxShadow: 'none',
              }}
            >
              <BellOutlined className="header-bell" twoToneColor="#000" />
            </Badge>
            <Dropdown overlay={menu} className="header-user" >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              ><Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                <span className="header-user-name" >&nbsp;
                Xin chào: { docCookies.getItem("email")}
                  </span>
              </a>
            </Dropdown>
          </div>
        </Header>
        <div className="example">
          {this.state.ishow == true ? <Spin /> : ""}
        </div>
        <Breadcrumb separator=">>" className="breadcrumb-main">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
          <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}
export default withRouter(HeaderLayout);
