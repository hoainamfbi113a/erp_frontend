import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logomall from "../../assets/images/logoPage.png";
import { Menu, Layout } from "antd";
import { message } from "antd";
import { withRouter } from "react-router";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import docCookies from "doc-cookies";
import axiosConfig from "../../apis/axios";
import "./Menu.css";
const { SubMenu } = Menu;
const { Sider } = Layout;
class MenuLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeProfile: 0,
        };
    }
    handleOnclick = () => {
        this.props.history.push("/erp/admin/user");
    };
    componentDidMount = async () => {
        await axiosConfig
            .post(`/api/fe/profiles/user`, {
                id: docCookies.getItem("user_id"),
            })
            .then((res) => {
                if (res === "Unauthorized") {
                } else {
                    this.setState({
                        activeProfile: 1,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                                <Link to="/erp/employee/notification/general">Thông báo chung</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/erp/employee/notification/my">Thông báo của tôi</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/erp/employee/notification/department">
                                    Thông tin phòng ban
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/erp/employee/notification/myword">Việc của tôi</Link>
                            </Menu.Item>
                            {this.state.activeProfile == 0 ? (
                                <Menu.Item
                                    onClick={() => {
                                        message.error("Nhân sự đang duyệt hồ sơ");
                                    }}
                                    key="5"
                                >
                                    <Link to="#">Cập nhật thông tin</Link>
                                </Menu.Item>
                            ) : (
                                <Menu.Item key="5">
                                    <Link to="/erp/employee/edit-information">
                                        Cập nhật thông tin
                                    </Link>
                                </Menu.Item>
                            )}

                            <Menu.Item key="6">
                                <Link to="/erp/employee/notification/create">Tạo</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="7"
                            icon={<UserOutlined />}
                            title="Nghiệp vụ"
                            icon={<ShopOutlined />}
                        >
                            {/* {localStorage.getItem("per") === "hr" ? (
                <Menu.Item key="8" onClick={this.handleOnclick}>
                  <Link to="/erp/admin/usersix">Nhân sự </Link>
                </Menu.Item>
              ) : null} */}

                            <Menu.Item key="8" onClick={this.handleOnclick}>
                                <Link to="/erp/admin/usersix">Nhân sự </Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to="/erp/admin/department">Phòng ban </Link>
                            </Menu.Item>
                            <Menu.Item key="10">
                                <Link to="/erp/admin/parts">Tổ</Link>
                            </Menu.Item>
                            <Menu.Item key="11">
                                <Link to="/erp/admin/position">Chức vụ</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="12"
                            icon={<UserOutlined />}
                            title="Vai trò & Quyền"
                            icon={<ShopOutlined />}
                        >
                            <Menu.Item key="13" onClick={this.handleOnclick}>
                                <Link to="/erp/admin/usersix">Gán quyền </Link>
                            </Menu.Item>
                            <Menu.Item key="14">
                                <Link to="/erp/admin/permission"> Quyền </Link>
                            </Menu.Item>
                            <Menu.Item key="15">
                                <Link to="/erp/admin/roles"> Roles </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
            </div>
        );
    }
}
export default withRouter(MenuLayout);
