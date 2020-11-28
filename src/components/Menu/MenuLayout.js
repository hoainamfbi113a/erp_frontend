import React, { Component } from "react";
import {Link}  from 'react-router-dom'
import logo from "../../assets/images/logo.png";
import { Menu,Layout } from "antd"
import { UserOutlined,PieChartOutlined,TeamOutlined,DesktopOutlined,FileOutlined } from '@ant-design/icons';

import "./Menu.css"
const { SubMenu } = Menu;
const { Sider } = Layout;
export default class MenuLayout extends Component {
  render() {
    return (
      <div className="bbbb">
        <Sider collapsed={this.props.collapsed}>
          <div className="logo">
            <img
              className="logo-img"
              style={{ objectFit: "cover" }}
              src={logo}
            ></img>
          </div>
          <Menu mode="inline" className="menulayout-main" >
         <SubMenu  title="Thông tin cá nhân" icon={<UserOutlined />}>
              <Menu.Item key="1">Thông báo chung</Menu.Item>
              <Menu.Item key="2">Thông báo của tôi</Menu.Item>
              <Menu.Item key="3">Tạo</Menu.Item>
          </SubMenu>
          {/* <Menu.Item key="4" icon={<TeamOutlined />}>
         
          </Menu.Item> */}
          <SubMenu key="sub2" icon={<UserOutlined />} title="Quản lý nhân sự" icon={<TeamOutlined />}>
              <Menu.Item key="1">
              <Link to="/crm"> Quản lý nhân sự </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/crm/user/department">
                Bình bầu
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="3">
                <Link to="/crm/user/personal-history">
                Lịch sử cá nhân
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/crm/user/degree">
                Trình độ nhân viên
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/crm/user/work-object">
                Hình thứ làm việc
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/crm/user/journalist-card">
                 Thẻ Nhà báo
                </Link>
              </Menu.Item> */}
          </SubMenu>
          </Menu>
        </Sider>
       </div>
    );
  }
}
