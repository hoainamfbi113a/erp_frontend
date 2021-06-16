import React, { Component } from "react";
import { withRouter } from "react-router";
import { Layout, Dropdown, Menu, Avatar, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import docCookies from "doc-cookies";
import { logout } from "apis/authenticationApi";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Header.css";
const { Header } = Layout;
import { LogoutOutlined, RollbackOutlined } from "@ant-design/icons";
import { showLoading, hideLoading} from "reduxToolkit/features/uiLoadingSlice"
import { Logout } from "reduxToolkit/features/authencationSlice";
import { setUser } from "reduxToolkit/features/userSlice";
import { setUserProfile } from "reduxToolkit/features/userProfileSlice";
import { setPermission } from "reduxToolkit/features/permissionSlice";

const HeaderLayout = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const menu = () => {
    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    const logOut = async (e) => {
      dispatch(showLoading());

      await sleep(1000);
      await logout();
      await dispatch(Logout());
      
      //clear redux stories
      await dispatch(setUser({}));
      await dispatch(setUserProfile({}));
      await dispatch(setPermission([]));
      history.push("/")
      
      dispatch(hideLoading());
    };
    return (
      <Menu>
        {/* <Menu.Item icon={<RollbackOutlined />}>
          <a target="_blank" rel="noopener noreferrer">
            Đổi mật khẩu
          </a>
        </Menu.Item> */}
        <Menu.Item icon={<LogoutOutlined />} onClick={logOut}>
          <a>Đăng xuất</a>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <div className="header-main">
      <Header className="site-layout-background header-main-top">
        <div className="header-left"></div>
        <div className="header-right">
          <Badge
            className="header-notification"
            count={5}
            style={{
              boxShadow: "none",
            }}
          >
            <BellOutlined className="header-bell" twoToneColor="#000" />
          </Badge>
          <Dropdown overlay={menu} className="header-user">
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              <span className="header-user-name">
                &nbsp; Xin chào: {docCookies.getItem("email")}
              </span>
            </a>
          </Dropdown>
        </div>
      </Header>
    </div>
  );
};
export default withRouter(HeaderLayout);
