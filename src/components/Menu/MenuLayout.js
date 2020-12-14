import React, { Component } from "react";
import {Link}  from 'react-router-dom'
import logo from "../../assets/images/logo.png";
import logomall from "../../assets/images/logomall.jpeg";
import { Menu,Layout,Modal,Input,DatePicker } from "antd"
import { withRouter } from 'react-router'
import { UserOutlined,ShopOutlined } from '@ant-design/icons';

import "./Menu.css"
const { SubMenu } = Menu;
const { Sider } = Layout;
class MenuLayout extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  handleOnclick = () => {
    this.props.history.push('/crm/admin/usersix');
  }
  render() {
    return (
      <div className="bbbb">
        <Sider collapsed={this.props.collapsed}>
        <Link to="/crm/employee/notification" className="logo">
          <div className="logo">
            <img 
              className="logo-img"
              style={{ objectFit: "cover" }}
              src={this.props.collapsed == true ? logomall : logo}
            ></img>
          </div>
          </Link>
          <Menu mode="inline" className="menulayout-main" >
         <SubMenu  title="Thông tin cá nhân" icon={<UserOutlined />}>
              <Menu.Item key="1">
              <Link to="/crm/employee/notification/general">Thông báo chung</Link>
              </Menu.Item>
              <Menu.Item key="2">
              <Link to="/crm/employee/notification/my">Thông báo của tôi</Link>
              </Menu.Item>
              <Menu.Item key="3">
              <Link to="/crm/employee/notification/department">Thông tin phòng ban</Link>
              </Menu.Item>
              <Menu.Item key="4">
              <Link to="/crm/employee/notification/myword">Việc của tôi</Link>
              </Menu.Item>
              <Menu.Item key="5">
              <Link to="/crm/employee/notification/create">Tạo</Link>
              </Menu.Item>
              
          </SubMenu>
          {/* <Menu.Item key="4" icon={<TeamOutlined />}>
         
          </Menu.Item> */}
          <SubMenu key="sub2" icon={<UserOutlined />} title="Nghiệp vụ" icon={<ShopOutlined/>}>
            { localStorage.getItem("per") ==="hr" ?
              <Menu.Item key="4" onClick ={this.handleOnclick} >
              <Link to="/crm/admin/usersix">Nhân sự </Link>
              </Menu.Item>:null
            }
            {/* { localStorage.getItem("per")  == "hr" ?
            <Menu.Item key="6"  onClick={this.showModal}>
                
                <Link to="#">
                  Tạo user
                  </Link>
     
              </Menu.Item>: null
            } */}
               <Menu.Item key="10">
               <Link to="/crm/employee/edit-information/base">Cập nhật thông tin</Link>
               </Menu.Item>
              
           
              <Menu.Item key="9">
                {/* <Link to="/crm/user/department"> */}
                
                <Link to="/crm/usersix">Bình bầu</Link>
                {/* </Link> */}
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
        <Modal
              title="Tạo nhân viên mới"
              visible={this.state.visible}
              onOk={this.hideModal}
              onCancel={this.hideModal}
              okText="OK"
              cancelText="Cancel"
              width={477}
            >
              <form
                style={{ width: "100%" }}
                className="tabs-main"
                noValidate
                onSubmit={this.onSubmit}
                method="post"
              >
                <ul style={{marginLeft:'23px'}}>
                <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Tên đăng nhập</span>
                    <div className="tabs-user-infor-bottom">
                    <Input
                              name="pro_resident"
                              // defaultValue={ this.state.pro_resident }
                              onChange={this.onChange}
                              // placeholder="Thuộc đảng bộ"
                            />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-row">
                    <span className="tabs-user-infor-top">Ngày tháng năm sinh</span>
                    <div className="tabs-user-infor-bottom">
                    <DatePicker
                              style={{ width: 150 }}
                              // defaultValue={this.state.pro_identity_card_when == null ? null: moment(this.state.pro_identity_card_when, dateFormat)}
                              onChange={(date, dateString) =>
                                this.onChangeBirthDay(
                                  date,
                                  dateString,
                                  "pro_identity_card_when"
                                )
                              }
                            />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Tên đăng nhập</span>
                    <div className="tabs-user-infor-bottom">
                    <Input
                              name="pro_resident"
                              // defaultValue={ this.state.pro_resident }
                              onChange={this.onChange}
                              // placeholder="Thuộc đảng bộ"
                            />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Mật khẩu</span>
                    <div className="tabs-user-infor-bottom">
                    <Input
                              name="pro_resident"
                              // defaultValue={ this.state.pro_resident }
                              onChange={this.onChange}
                              // placeholder="Thuộc đảng bộ"
                            />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Số điện thoại</span>
                    <div className="tabs-user-infor-bottom">
                    <Input
                              name="pro_resident"
                              // defaultValue={ this.state.pro_resident }
                              onChange={this.onChange}
                              // placeholder="Thuộc đảng bộ"
                            />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Email</span>
                    <div className="tabs-user-infor-bottom">
                    <Input
                              name="pro_resident"
                              // defaultValue={ this.state.pro_resident }
                              onChange={this.onChange}
                              // placeholder="Thuộc đảng bộ"
                            />
                    </div>
                  </li>
                </ul>
              </form>
            </Modal>
       </div>
    );
  }
}
export default withRouter(MenuLayout);