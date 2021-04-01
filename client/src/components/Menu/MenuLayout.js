import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPermissionUser } from "apis/authenticationApi";
import logomall from "assets/images/logoPage.png";
import { Menu, Layout } from "antd";
import { withRouter } from "react-router";
import { UserOutlined, ShopOutlined, LockOutlined } from "@ant-design/icons";
import docCookies from "doc-cookies";
import "./Menu.css";
const { SubMenu } = Menu;
const { Sider } = Layout;

const MenuLayout = (props) => {

  const [dataPermission, setDataPer] = useState(null);

  useEffect(() => {
    fetchPermission();
  }, [])

  const fetchPermission = async () => {
    const user_id = docCookies.getItem("user_id");
    const data = await getPermissionUser(user_id);
    setDataPer(data);
  };

  const checkPermission = (itemMenu, action) => {
    if (dataPermission && dataPermission.permissions)
      for (const element of dataPermission.permissions) {
        let name = element.actions[0].name === action;
        let service = element.slug_service_management;
        if (service === itemMenu  && name) {
          return true;
        }
      }
      return false;
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
            <Link to="/roles"> Roles </Link>
          </Menu.Item>
          <Menu.Item key="15">
            <Link to="/roles-action"> Roles-Action</Link>
          </Menu.Item>
        </SubMenu>
      );
    }
  };
  const renderMenu = () => {
      return (
        <SubMenu
          key="sub2"
          icon={<UserOutlined />}
          title="Nghiệp vụ"
          icon={<ShopOutlined />}
        >
          {checkPermission("profile-service", "Create") ? (
            [
              <Menu.Item key="7">
                <Link to="/user">Nhân sự </Link>
              </Menu.Item>,
              <Menu.Item key="8">
                <Link to="/department">Phòng ban </Link>
              </Menu.Item>,
              <Menu.Item key="9">
                <Link to="/parts">Tổ</Link>
              </Menu.Item>,
              <Menu.Item key="10">
                <Link to="/position">Chức vụ</Link>
              </Menu.Item>
            ]) : ""
          }
          {checkPermission("workflow-service", "Create") === true ? (
            <Menu.Item key="11">
              <Link to="/workflow">Workflow</Link>
            </Menu.Item>
            ) : ""
          }
          {checkPermission("document-service", "Create") === true ? (
          <Menu.Item key="12">
            <Link to="/form-builder">Form builder</Link>
          </Menu.Item>
            ) : ""
          }
          
        </SubMenu>
      );
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
          <SubMenu key="sub1" title="Thông tin cá nhân" icon={<UserOutlined />}>
            <Menu.Item key="1">
              <Link to="/notification-general">Thông báo chung</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/notification-my">Thông báo của tôi</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/notification-department">Thông tin phòng ban</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/notification-myword">Việc của tôi</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/edit-information">Cập nhật thông tin</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/notification-create">Tạo loại tài liệu</Link>
            </Menu.Item>
          </SubMenu>
          {renderMenu()}

          {renderAdmin()}
        </Menu>
      </Sider>
    </div>
  );
}
export default withRouter(MenuLayout);
