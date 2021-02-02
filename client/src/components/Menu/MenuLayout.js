import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getPermissionUser,
  slugPermission,
} from "apis/authenticationApi";
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
      isTrue:false,
    };
  }
  handleOnclick = () => {
    this.props.history.push("/admin/user");
  };
  componentDidMount = async () => {
    await this.fetchSlugPermission();
    await this.fetchPermission();
    this.getMajor();
  };
  fetchPermission = async () => {
    const user_id = docCookies.getItem("user_id");
    const data = await getPermissionUser(user_id);
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
    if(dataPermission.permissions.length >7 && dataPermission.permissions[8]&& dataPermission.permissions[8].actions[4]=="Confirm"){
      this.setState({
        major:8,
        isTrue:true
      })
    }
    if(dataPermission.permissions>8){
      this.setState({
        major:1,
      })
    }
    // if (dataPermission) {
    //   for (let item of dataPermission.permissions) {
    //     if(item.actions[4]==="Confirm" && item.slug_service_management === "position"){
    //       this.setState({
    //           isTrue : true
    //       })       
    //      }
    //     if (
    //         item.slug_service_management === "profile" ||
    //         item.slug_service_management === "position" ||
    //         item.slug_service_management === "department" ||
    //         item.slug_service_management === "part"||
    //         item.slug_service_management === "journalist-card"||
    //         item.slug_service_management === "work-object"||
    //         item.slug_service_management === "user-degree"||
    //         item.slug_service_management === "personal-history"
    //     ) {
    //         dem++;
    //     }
    //     if (dem == 4) {
    //         this.setState({
    //             major:1
    //         })
    //     }
    //     if (item.slug_service_management === "department") {
    //         this.setState({
    //             major:2
    //         })
    //     }
    //     if (item.slug_service_management === "part") {
    //         this.setState({
    //             major:3
    //         })
    //     }
    //     if (item.slug_service_management === "position") {
    //         this.setState({
    //             major:4
    //         })
    //     }
    //     if(dem== 8){
    //         this.setState({
    //             major:8
    //         })
    //     }
    //   }
    // }
  };
  renderAdmin = () =>{
    if(this.state.major === 8 && localStorage.getItem("0")==0){
      return (
        <SubMenu
        key="12"
        icon={<UserOutlined />}
        title="Vai trò & Quyền"
        icon={<ShopOutlined />}
      >
        <Menu.Item key="13" onClick={this.handleOnclick}>
          <Link to="/admin/usersix">Gán quyền </Link>
        </Menu.Item>
        <Menu.Item key="14">
          <Link to="/admin/permission"> Quyền </Link>
        </Menu.Item>
        <Menu.Item key="15">
          <Link to="/admin/roles"> Roles </Link>
        </Menu.Item>
      </SubMenu>
      )
    }
  }
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
          <Link to="/admin/usersix">Nhân sự </Link>
        </Menu.Item>
        </SubMenu>
      );
    }
    if (this.state.major == 2) {
        <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      >
      <Menu.Item key="9">
        <Link to="/admin/department">Phòng ban </Link>
      </Menu.Item>;
      </SubMenu>
    }
    if (this.state.major == 3) {
        <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      >
      <Menu.Item key="10">
        <Link to="/admin/parts">Tổ</Link>
      </Menu.Item>;
      </SubMenu>
    }
    if (this.state.major == 4) {
        <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      >
      <Menu.Item key="11">
        <Link to="/admin/position">Chức vụ</Link>
      </Menu.Item>;
      </SubMenu>
    }
    if (this.state.major == 8 && this.state.isTrue === true) {
        return(
        <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      >
         <Menu.Item key="8" onClick={this.handleOnclick}>
          <Link to="/admin/usersix">Nhân sự </Link>
        </Menu.Item>
        <Menu.Item key="9">
          <Link to="/admin/department">Phòng ban </Link>
        </Menu.Item>
        ;
        <Menu.Item key="10">
          <Link to="/admin/parts">Tổ</Link>
        </Menu.Item>
        ;
        <Menu.Item key="11">
          <Link to="/admin/position">Chức vụ</Link>
        </Menu.Item>
        <Menu.Item key="12">
          <Link to="/admin/workflow">Workflow</Link>
        </Menu.Item>
        ;

      </SubMenu>
        )
    }
    return (
        <SubMenu
        key="7"
        icon={<UserOutlined />}
        title="Nghiệp vụ"
        icon={<ShopOutlined />}
      >
      </SubMenu>
      )
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
                <Link to="/employee/notification/general">
                  Thông báo chung
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/employee/notification/my">
                  Thông báo của tôi
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/employee/notification/department">
                  Thông tin phòng ban
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/employee/notification/myword">Việc của tôi</Link>
              </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/employee/edit-information">
                    Cập nhật thông tin
                  </Link>
                </Menu.Item>
              <Menu.Item key="6">
                <Link to="/employee/notification/create">Tạo</Link>
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
