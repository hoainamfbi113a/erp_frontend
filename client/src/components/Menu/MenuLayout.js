import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import logomall from "assets/images/logoPage.png";
import { Menu, Layout } from "antd";
import { withRouter } from "react-router";
import { LockOutlined, MinusOutlined } from "@ant-design/icons";
import { AiOutlineNotification } from "react-icons/ai";
import {
  RiMessage3Line,
  RiInformationLine,
  RiBuilding3Line,
  RiBook2Line,
} from "react-icons/ri";
import { CgWorkAlt, CgFileDocument } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";
import { TiFlowSwitch } from "react-icons/ti";
import { getPermission } from "reduxToolkit/features/permissionSlice";
import { useDispatch, useSelector } from "react-redux";
import docCookies from "doc-cookies";
import "./Menu.css";
const { SubMenu } = Menu;
const { Sider } = Layout;
const icons = {
  "profile-service": <MdPeopleOutline />,
  "workflow-service": <TiFlowSwitch />,
  "document-service": <RiBook2Line />,
};

const MenuLayout = (props) => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permission);

  // useEffect(async () => {
  //   await dispatch(getPermission(docCookies.getItem("user_id")));
  // }, [dispatch]);

  const renderAdmin = () => {
    // if (docCookies.getItem("user_id") === "1") {
      return (
        <SubMenu key="sub3" icon={<LockOutlined />} title="Vai trò & Quyền">
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
    // }
  };
  const renderMenu = () => {
    if (permissions.length !== 0) {
      return (
        <Fragment>
          {permissions.map((subMenu) => (
            <SubMenu icon={icons[subMenu.slug]} key={subMenu.name} title={subMenu.name}>
              {subMenu.groups.map((menu) =>{
                if(menu.is_display === 1){
                  return    (<Menu.Item
                  icon={<MinusOutlined />}
                  className="sub-item"
                  key={menu.name}
                >
                  <Link to={`/${subMenu.slug}/${menu.slug}`}>{menu.name}</Link>
                </Menu.Item>)
                }
              
              })}
            </SubMenu>
          ))}
        </Fragment>
      );
    }
  };
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
          <Menu.Item
            icon={<AiOutlineNotification />}
            className="ant-menu-submenu-title"
            key="1"
          >
            <Link to="/notification-general">Thông báo chung</Link>
          </Menu.Item>
          <Menu.Item
            icon={<RiMessage3Line />}
            className="ant-menu-submenu-title"
            key="2"
          >
            <Link to="/notification-my">Việc của tôi</Link>
          </Menu.Item>
          <Menu.Item
            icon={<RiInformationLine />}
            className="ant-menu-submenu-title"
            key="3"
          >
            <Link to="/notification-department">Thông tin phòng ban</Link>
          </Menu.Item>
          <Menu.Item
            icon={<CgWorkAlt />}
            className="ant-menu-submenu-title"
            key="4"
          >
            <Link to="/notification-my-work">Thông báo của tôi</Link>
          </Menu.Item>
          <Menu.Item
            icon={<FiEdit />}
            className="ant-menu-submenu-title"
            key="5"
          >
            <Link to="/edit-information">Cập nhật thông tin</Link>
          </Menu.Item>
          <Menu.Item
            icon={<CgFileDocument />}
            className="ant-menu-submenu-title"
            key="6"
          >
            <Link to="/notification-create">Tạo loại tài liệu</Link>
          </Menu.Item>
          <li className="spacing"></li>
          {renderMenu()}

          {renderAdmin()}
          
          {/* <SubMenu key="sub4" icon={<RiBook2Line />} title="Tài liệu">
            <Menu.Item key="13">
              <Link to="/form-builder">Form builder</Link>
            </Menu.Item>
            <Menu.Item key="14">
              <Link to="/document-type">DocumentType</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="12" icon={<TiFlowSwitch />} className="ant-menu-submenu-title">
            <Link to="/workflow">Workflow</Link>
          </Menu.Item> */}
        </Menu>
      </Sider>
    </div>
  );
};
export default withRouter(MenuLayout);
