import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import logomall from "assets/images/logoPage.png";
import { Menu, Layout } from "antd";
import { withRouter } from "react-router";
import { UserOutlined, ShopOutlined, LockOutlined } from "@ant-design/icons";
import { getPermission } from "reduxToolkit/features/permissionSlice";
import { useDispatch, useSelector } from "react-redux";
import docCookies from "doc-cookies";
import "./Menu.css";
const { SubMenu } = Menu;
const { Sider } = Layout;

const MenuLayout = (props) => {

  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permission);

  useEffect(async () => {
    await dispatch(getPermission(docCookies.getItem("user_id")));
  }, [dispatch]);

  const checkPermission = (itemMenu, action) => {
    if (dataPermission && dataPermission.permissions)
      for (const element of dataPermission.permissions) {
        let name = element.actions[0].name === action;
        let service = element.slug_service_management;
        if (service === itemMenu  && name) {
          return true;
        }
      }
      return true;
  };

  const renderAdmin = () => {
    if (docCookies.getItem("user_id") === "1") {
      return (
        <SubMenu
          key="sub3"
          icon={<LockOutlined />}
          title="Vai trò & Quyền"
        >
          <Menu.Item key="13">
            <Link to="/permission"> Quyền </Link>
          </Menu.Item>
          <Menu.Item key="14">
            <Link to="/roles"> Quyền CD-PB</Link>
          </Menu.Item>
          <Menu.Item key="15">
            <Link to="/roles-position"> Quyền CD</Link>
          </Menu.Item>
          <Menu.Item key="16">
            <Link to="/roles-action"> Roles-Action</Link>
          </Menu.Item>
        </SubMenu>
      );
    }
  };
  const renderMenu = () => {
    if(permissions.length) {
      return (
        <Fragment>
          {
            permissions.map((subMenu) => (
              <SubMenu key={subMenu.name} title={subMenu.name}>
                {
                  subMenu.groups.map((menu) => (
                    <Menu.Item className="sub-item" key={menu.name}>
                      <Link to={`/${subMenu.slug}/${menu.slug}`}>{menu.name}</Link>
                    </Menu.Item>
                  ))
                }
              </SubMenu>
            ))
          }
        </Fragment>

      );
    }
  }
  return (
    <div className="bbbb">
      <Sider collapsed={props.collapsed}>
        <Link to="/" className="logo">
          <div className="logo">
            <img
              className="logo-img"
              style={{ objectFit: "cover" }}
              src={logomall}
            ></img>
          </div>
        </Link>
        <Menu mode="inline" className="menulayout-main">
            <Menu.Item className="ant-menu-submenu-title" key="1" >
              <Link  to="/notification-general">Thông báo chung</Link>
            </Menu.Item>
            <Menu.Item className="ant-menu-submenu-title" key="2">
              <Link to="/notification-my">Thông báo của tôi</Link>
            </Menu.Item>
            <Menu.Item className="ant-menu-submenu-title" key="3">
              <Link to="/notification-department">Thông tin phòng ban</Link>
            </Menu.Item>
            <Menu.Item className="ant-menu-submenu-title" key="4">
              <Link to="/notification-my-work">Việc của tôi</Link>
            </Menu.Item>
            <Menu.Item className="ant-menu-submenu-title" key="5">
              <Link to="/edit-information">Cập nhật thông tin</Link>
            </Menu.Item>
            <Menu.Item style={{borderBottom: '2px solid'}} className="ant-menu-submenu-title" key="6">
              <Link to="/notification-create">Tạo loại tài liệu</Link>
            </Menu.Item>     
          {renderMenu()}

          {renderAdmin()}
          <Menu.Item key="13">
            <Link to="/form-builder">Form builder</Link>
          </Menu.Item>

        </Menu>
      </Sider>
    </div>
  );
}
export default withRouter(MenuLayout);
