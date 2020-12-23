import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link}  from 'react-router-dom'
import axios from "axios"
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import * as userSixActions from '../../actions/userSix';
import {  Layout } from "antd";
import { Table, Space, Tag, Avatar } from 'antd';
import { Popconfirm, message } from 'antd';
import { Input, Modal } from "antd";
import imgUser from "../../assets/images/imguser.png";
import user from "../../assets/images/user2.png";

const { Content } = Layout;
class TablePermission extends Component {
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
      .post("/api/register", params)
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
    const data = [
      {
        key:"1",
        feature_id:1,
        name:"manager",
        slug:"123",
        status:"1",
        created:"12/12/2012"
      },
      {
        key:"2",
        feature_id:2,
        name:"human resource",
        slug:"123",
        status:"1",
        created:"12/12/2012"
      },
      {
        key:"3",
        feature_id:3,
        name:"employee",
        slug:"1234",
        status:"1",
        created:"12/12/2012"
      },
    ]
    const columns = [
      {
        title:"id đặc tính",
        width:200,
        dataIndex:"name",
        key:"name",
        fixed:'left',
      },
      {
        title: 'Tên quyền',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Slug',
        dataIndex: 'slug',
        key: 'slug',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (text) =>{
          if(text == 1)
            return  <Tag color="geekblue" className="table-action">ACTIVE</Tag>
          return  <Tag color="geekblue" className="table-action">HIDE</Tag>
        }
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'created',
        key: 'created',
      },
      
      {
        title: 'Hành động',
        key: 'operation',
        dataIndex: 'id',
        fixed: 'right',
        render: (text, row) => (
          <Space size="middle" >
            <Popconfirm title="Are you sure hide this user?" onConfirm={()=>this.confirm(text)} onCancel={this.cancel} okText="Yes" cancelText="No">
              <Tag color="volcano" className="table-action">Ẩn</Tag>
            </Popconfirm>
            <Link to={`/crm/admin/edituser/${text}`}> 
            <Tag color="geekblue" className="table-action">Cập nhật</Tag></Link> 
            <Link to={`/crm/admin/edituser/${text}`}> 
            <Tag color="geekblue" className="table-action">Phân quyền</Tag></Link> 
          </Space>
        ),
      },
    ];
    return (
      <div >
        <Content >
          <div className="layout-content">
            <div
              style={{ padding: 24, minHeight: 200 }}
            >
              <Table style={{minHeight:'70vh'}} dataSource={data}  columns={columns} className="table-content" rowKey="id" />
            </div>
          </div>
        </Content>
        <Modal
          title="Tạo nhân viên mới"
          visible={this.props.showModalPermission}
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
                  <Input.Password
                    name="pro_resident"
                    onChange={this.onChange}
                    className="modal-password"
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
export default connect(null, null)(TablePermission)