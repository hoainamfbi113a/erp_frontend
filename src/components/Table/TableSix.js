import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link}  from 'react-router-dom'
import axios from "axios"
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import * as userSixActions from '../../actions/userSix';
import {  Layout, Steps } from "antd";
import { Table, Space, Tag, Avatar } from 'antd';
import { Popconfirm, message } from 'antd';
import { Input, Modal, DatePicker } from "antd";
import imgUser from "../../assets/images/imguser.png";

const { Content } = Layout;
const { Step } = Steps;
class TableSix extends Component {
  state = {
    collapsed: false,
    visibleModify: false,
    visibleAdduser: false,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    current_user_id: "4",
    app_id: "99",
    full_name: "",
    email: "",
    phone: "",
  };
  hideModal = () => {
    this.props.hideModal()
  };
  onChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = () => {
    let params = {
      current_user_id: process.env.current_user_id,
      app_id: process.env.app_id,
      email: this.state.email,
      phone: this.state.phone,
      full_name: this.state.full_name
    };
    this.hideModal();
    axios
      .post(process.env.apiEmployee + "/api/register", params)
      .then((res) => {
        if (res.data.message === "Success!. Stored") {
          message.success("Đăng ký user thành công");
          const { userSixActionCreators } = this.props;
          const { fetchListUserSix } = userSixActionCreators;
          fetchListUserSix();
        }
      })
      .catch((err) => {
        message.error("đăng ký user thất bại");
        console.log(err);
      });
  };
  componentDidMount() {
    const { userSixActionCreators } = this.props;
    const { fetchListUserSix } = userSixActionCreators;
    fetchListUserSix();
  }
  confirm = (e) => {
    const { userSixActionCreators } = this.props;
    const { deleteUserSix } = userSixActionCreators;
    deleteUserSix(e); 
    // message.success('Bạn đã xoá thành công');
  }

  cancel = (e) => {
    message.error('Không ẩn');
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  render() {
    const data = this.props.listUserSix.listUserSix;
    const columns = [
      {
        title:"Ảnh đại diện",
        width:200,
        dataIndex:"userImg",
        key:"userImg",
        fixed:'left',
        render: () =>(
          <div>
            <Avatar shape="square" size={64} style={{ marginRight: "3px" }} src={imgUser} />
          </div>
        )
      },
      {
        title: 'Họ và tên',
        // width: 330,
        dataIndex: 'full_name',
        key: 'sex',
        sorter: (a, b) => a.full_name - b.full_name,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: '2',
        // sorter: (a, b) => a.pro_name.length - b.pro_name.length,
      },
      {
        title: 'Số điện thoại',
        // width: 330,
        dataIndex: 'phone',
        key: 'sex',
        sorter: (a, b) => a.phone - b.phone,
      },
      
      {
        title: 'Hành động',
        key: 'operation',
        dataIndex: 'id',
        fixed: 'right',
        // width: 300,
        render: (text, row) => (
          <Space size="middle" >
            <Popconfirm title="Are you sure hide this user?" onConfirm={()=>this.confirm(text)} onCancel={this.cancel} okText="Yes" cancelText="No">
              <Tag color="volcano" className="table-action">Ẩn</Tag>
            </Popconfirm>
            {/* <Link to={`/crm/employee/edit-information/base/${text}`}> 
            <Tag color="geekblue" className="table-action">Sửa thông tin </Tag></Link> */}
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Steps size="small" className="process-work-flow">
          <Step title="Nhân sự tạo nhân viên mới" />
          <Step title="Nhân sự thêm thông tin căn bản" />
          <Step title="Nhân viên vào chỉnh sửa thông tin của mình" />
          <Step title="Nhân sự duyệt" />
        </Steps>
        <Content >
          {/* <div style={{ height: "calc(100vh - 139px)" }} className="layout-content"> */}
          <div className="layout-content">
            <div
              style={{ padding: 24, minHeight: 200 }}
            >
              <Table  columns={columns} dataSource={data}  className="table-content" rowKey="id" />
            </div>
          </div>
        </Content>
        <Modal
          title="Tạo nhân viên mới"
          visible={this.props.showModalAddUser}
          onOk={this.onSubmit}
          onCancel={this.hideModal}
          okText="OK"
          cancelText="Cancel"
          width={600}
        >
          <form
            style={{ width: "100%" }}
            className="tabs-main tabs-main-modal"
            noValidate
            onSubmit={this.onSubmit}
            method="post"
          >
            <ul style={{ marginLeft: "23px" }}>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Họ và tên</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                  <Input
                    name="full_name"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              {/* <li className="tabs-main-left-li tabs-main-left-li-row">
                <span className="tabs-user-infor-top">Ngày tháng năm sinh</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <DatePicker
                  placeholder="Chọn ngày"
                    style={{ width: 150 }}
                    onChange={(date, dateString) =>
                      this.onChangeBirthDay(
                        date,
                        dateString,
                        "pro_identity_card_when"
                      )
                    }
                  />
                </div>
              </li> */}
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Tên đăng nhập</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    name="pro_resident"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Mật khẩu</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    name="pro_resident"
                    onChange={this.onChange}
                    // placeholder="Thuộc đảng bộ"
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Số điện thoại</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    name="phone"
                    // defaultValue={ this.state.pro_resident }
                    onChange={this.onChange}
                    // placeholder="Thuộc đảng bộ"
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Email</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    name="email"
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


const mapStateToProps = (state,ownProps) => ({
  listUserSix: state.userSixReducer
})
const mapDispatchToProps = dispatch => ({
  userSixActionCreators: bindActionCreators(userSixActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TableSix)