import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPermissionUser, slugPermission } from "apis/authenticationApi";
import logomall from "assets/images/logoPage.png";
import { Menu, Layout } from "antd";
import { withRouter } from "react-router";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import docCookies from "doc-cookies";
import "./Menu.css";
const { SubMenu } = Menu;
const { Sider } = Layout;
class MenuLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPermission: null,
      slugPermission: null,
      major: 0,
      isTrue: false,
    };
  }
  handleOnclick = () => {
    this.props.history.push("/user");
  };
  componentDidMount = async () => {
    await this.fetchSlugPermission();
    await this.fetchPermission();
    this.getMajor();
  };
  fetchPermission = async () => {
    const user_id = docCookies.getItem("user_id");
    const data = await getPermissionUser(user_id);
    console.log(data);
    this.setState({
      dataPermission: data,
    });
  };
  fetchSlugPermission = async () => {
    // const data = await slugPermission();
    // this.setState({
    //   slugPermission: data,
    // });
  };
  getMajor = () => {
    // let dataSlug = this.state.slugPermission;
    let dem = 0;
    let dataPermission = this.state.dataPermission;
    if (
      dataPermission.permissions.length > 7 &&
      dataPermission.permissions[0].name == "Manage Profile" &&
      dataPermission.permissions[0].actions[4] == "Confirm" &&
      dataPermission.permissions[1].actions[4] != "Confirm"
    ) {
      this.setState({
        major: 10,
      });
    }
    if (
      dataPermission.permissions.length > 6 &&
      dataPermission.permissions[1].name == "Manage Department" &&
      dataPermission.permissions[1].actions[4] == "Confirm"
    ) {
      this.setState({
        major: 11,
      });
    }
    if (
      dataPermission.permissions.length > 7 &&
      dataPermission.permissions[8] &&
      dataPermission.permissions[8].actions[4] == "Confirm" &&
      localStorage.getItem("0") == 0
    ) {
      this.setState({
        major: 8,
        isTrue: true,
      });
    }
    if (
      dataPermission.permissions.length > 7 &&
      dataPermission.permissions[0].actions[4] == "Confirm" &&
      dataPermission.permissions[6].actions[4] == "Confirm" &&
      localStorage.getItem("0") != 0
    ) {
      this.setState({
        major: 1,
      });
    }
  };
  renderAdmin = () => {
    // alert(this.state.major)
    if (this.state.major === 8 && localStorage.getItem("0") == 0) {
      return (
        <SubMenu
          key="12"
          icon={<UserOutlined />}
          title="Vai trò & Quyền"
          icon={<ShopOutlined />}
        >
          <Menu.Item key="14">
            <Link to="/permission"> Quyền </Link>
          </Menu.Item>
          {/* <Menu.Item key="15">
          <Link to="/roles"> Roles </Link>
        </Menu.Item> */}
        </SubMenu>
      );
    }
  };
  renderMenu = () => {
    if (this.state.major == 1) {
      return (
        <SubMenu
          key="7"
          icon={<UserOutlined />}
          title="Nghiệp vụ"
          icon={<ShopOutlined />}
        >
          <Menu.Item key="8" onClick={this.handleOnclick}>
            <Link to="/usersix">Nhân sự </Link>
          </Menu.Item>
        </SubMenu>
      );
    }
    if (this.state.major == 11) {
      return(
        <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      >
        <Menu.Item key="9">
          <Link to="/department">Phòng ban </Link>
        </Menu.Item>
        ;
      </SubMenu>
      )
    }
    if (this.state.major == 3) {
      <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      >
        <Menu.Item key="10">
          <Link to="/parts">Tổ</Link>
        </Menu.Item>
        ;
      </SubMenu>;
    }
    if (this.state.major == 4) {
      <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      >
        <Menu.Item key="11">
          <Link to="/position">Chức vụ</Link>
        </Menu.Item>
        ;
      </SubMenu>;
    }
    if (this.state.major == 8 && this.state.isTrue === true) {
      return (
        <SubMenu
          key="7"
          icon={<UserOutlined />}
          title="Nghiệp vụ"
          icon={<ShopOutlined />}
        >
          <Menu.Item key="8" onClick={this.handleOnclick}>
            <Link to="/usersix">Nhân sự </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/department">Phòng ban </Link>
          </Menu.Item>
          ;
          <Menu.Item key="10">
            <Link to="/parts">Tổ</Link>
          </Menu.Item>
          ;
          <Menu.Item key="11">
            <Link to="/position">Chức vụ</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/workflow">Workflow</Link>
          </Menu.Item>
          ;
        </SubMenu>
      );
    }
    return (
      <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      ></SubMenu>
    );
  };
  render() {
    return (
      <div className="bbbb">
        <Sider collapsed={this.props.collapsed}>
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
            <SubMenu title="Thông tin cá nhân" icon={<UserOutlined />}>
              <Menu.Item key="1">
                <Link to="/notification/general">Thông báo chung</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/notification/my">Thông báo của tôi</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/notification/department">Thông tin phòng ban</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/notification/myword">Việc của tôi</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/edit-information">Cập nhật thông tin</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/notification/create">Tạo</Link>
              </Menu.Item>
            </SubMenu>
            {/* <SubMenu
              key="7"
              icon={<UserOutlined />}
              title="Nghiệp vụ"
              icon={<ShopOutlined />}
            > */}
            {this.renderMenu()}
            {/* </SubMenu> */}
            {this.renderAdmin()}
          </Menu>
        </Sider>
      </div>
    );
  }
}
export default withRouter(MenuLayout);
