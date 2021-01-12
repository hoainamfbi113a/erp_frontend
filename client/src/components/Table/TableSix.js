import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link}  from 'react-router-dom'
import GrantRole from "../Modal/GrantRole";
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import * as uiActions from "../../actions/ui";
import {  Layout } from "antd";
import { Table, Space, Tag, Avatar } from 'antd';
import { Popconfirm, message } from 'antd';
import { Input, Modal } from "antd";
import user from "../../assets/images/user2.png";
import axiosConfig from "../../apis/axios"
const { Content } = Layout;
class TableSix extends Component {
  state = {
    collapsed: false,
    visibleModify: false,
    visibleAdduser: false,
    showModalGrantRole:false,
    selectedRowKeys: [],
    roleAndPermissionUser:null, 
    loading: false,
    current_user_id: "4",
    app_id: "99",
    full_name: "",
    email: "",
    phone: "",
    idGrantRole:"",
    dataUser:null,
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
      app_id: process.env.app_id,
      email: this.state.email,
      phone: this.state.phone,
      full_name: this.state.full_name
    };
    this.hideModal();
    axiosConfig
      .post("/api/register", params)
      .then((res) => {
        if (res.message === "Đăng ký thành công!") {
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
    this.props.uiActionCreators.showLoading();
    axiosConfig
      .get(`/api/userpagin?page=1`)
      .then((res) => {
        this.setState({
          dataUser:res,
        })
        this.props.uiActionCreators.hideLoading();
      })
      .catch((err) => {
        message.error("get user failed");
        console.log(err);
        this.props.uiActionCreators.hideLoading();
      });
      
  }
  confirm = (e) => {
    const { userSixActionCreators } = this.props;
    const { deleteUserSix } = userSixActionCreators;
    deleteUserSix(e); 
  }

  cancel = (e) => {
    message.error('Không ẩn');
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  handleGrantRole = (id) =>{
    this.setState({
      showModalGrantRole:true,
      idGrantRole:id
    })
    axiosConfig.get(`/api/user/permission/${id}`)
    .then((res)=>{
      this.setState({
        roleAndPermissionUser:res
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  handleOkGrantRole = () =>{
    this.setState({
      showModalGrantRole:false
    })
  }
  handleCancelGrantRole = () =>{
    this.setState({
      showModalGrantRole:false
    })
  }
  handlePagination = async (pagination) =>{
    this.props.uiActionCreators.showLoading();
   await axiosConfig
      .get(`/api/userpagin?page=${pagination}`)
      .then((res) => {
        this.setState({
          dataUser:res
        })
      })
      .catch((err) => {
        message.error("get user failed");
        console.log(err);
      });
      this.props.uiActionCreators.hideLoading();
  }
  updateUser = async (id) =>{
    await axiosConfig
    .post(`/api/fe/profiles/user`, {
      id: id,
    })
    .then(res=>{
      console.log(res)
      if(res=== "Unauthorized"){
        alert("Nhân viên đang chỉnh sửa hồ sơ của mình")
      } else {
        window.location.href=`http://localhost:3001/crm/admin/edituser/${id}`
      }
    })
    .catch(err=>{
      console.log(err)
    })

  }
  render() {
    let data = [];
    let total = 0;
    if(this.state.dataUser){
       data = this.state.dataUser.data
       total = this.state.dataUser.meta.pagination.total;
    }

    const columns = [
      {
        title:"Ảnh đại diện",
        width:200,
        dataIndex:"userImg",
        key:"userImg",
        fixed:'left',
        render: () =>(
          <div>
            <Avatar shape="square" size={64} style={{ marginRight: "3px" }} src={user} />
          </div>
        )
      },
      {
        title: 'Họ và tên',
        dataIndex: 'full_name',
        key: 'full_name',
        // sorter: (a, b) => a.full_name.length - b.full_name.length,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: '2',
        // sorter: (a, b) => a.pro_name.length - b.pro_name.length,
      },
      {
        title: 'Số điện thoại',
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
              <Tag onClick = {()=>{
                this.updateUser(text)
              }} color="geekblue" className="table-action">Sửa và duyệt</Tag>
            <Tag color="volcano" onClick ={()=>{
              this.handleGrantRole(text)
            }}>Grant quyền</Tag>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Content >
          {/* <div style={{ height: "calc(100vh - 139px)" }} className="layout-content"> */}
          <div className="layout-content">
            <div
              style={{ padding: 24, minHeight: 200 }}
            >
              <Table  columns={columns} dataSource={data}  className="table-content" rowKey="id" 
              pagination={{
                onChange: this.handlePagination,
                pageSize: 15,
                total: total
            }}
              />
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
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Mật khẩu</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input.Password
                    name="pro_resident"
                    onChange={this.onChange}
                    className="modal-password"
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Số điện thoại</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    name="phone"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Email</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    name="email"
                    onChange={this.onChange}
                  />
                </div>
              </li>
            </ul>
          </form>
        </Modal>
        <GrantRole idGrant ={this.state.idGrantRole} handleOk ={this.handleOkGrantRole} 
        handleCancel = {this.handleCancelGrantRole} visible ={this.state.showModalGrantRole}
        roleAndPermissionUser = {this.state.roleAndPermissionUser}
        ></GrantRole>
      </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => ({
  listUserSix: state.userSixReducer
})
const mapDispatchToProps = (dispatch) => ({
  uiActionCreators: bindActionCreators(uiActions, dispatch),
});
export default connect(null, mapDispatchToProps)(TableSix);
