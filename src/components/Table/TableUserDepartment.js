import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import Profile from "../Profile/Profile"
import Modify from "../Modify/Modify";
import Adduser from "../Adduser/Adduser";
import * as userDepartmentActions from '../../actions/userDepartmentAction';
import { Button, Layout, Upload } from "antd";
import { Table, Space, Tag, Avatar } from 'antd';
import { Input } from 'antd';
import { Popconfirm, message } from 'antd';
import imgUser from "../../assets/images/imguser.png";

const { Content } = Layout;
export default class TableUserDepartment extends Component {
  state = {
    collapsed: false,
    visible: false,
    visibleModify: false,
    visibleAdduser: false,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    userDepartment:[],
  };
  onSearch = value => console.log(value);
  collapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  showDrawerModify = (user) => {
    const {userActionCreators} = this.props;
    const { editUser } = userActionCreators;
    editUser(user);
    this.setState({
      visibleAdduser: true,
    });
  };

  onCloseModify = () => {
    this.setState({
      visibleModify: false,
    });
  };
  showDrawerAdduser = () => {
    this.setState({
      visibleAdduser: true,
    });
  };

  onCloseAdduser = () => {
    this.setState({
      visibleAdduser: false,
    });
  };
  confirm = (e) => {
    const { userDepartmentActionCreators } = this.props;
    const { deleteUserDepartment } = userDepartmentActionCreators;
    console.log(deleteUserDepartment(e)); 
  }

  cancel = (e) => {
    console.log(e);
    message.error('Không xoá');
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  
  render() {
    if(this.props.userDepartments.length!==0){
       this.state.userDepartment = this.props.userDepartments;
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
            <Avatar shape="square" size={64} style={{ marginRight: "3px" }} src={imgUser} />
          </div>
        )
      },
      {
        title: 'Tên phòng ban',
        width: 200,
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
          width:330,
          title: 'Chức danh nhân viên', dataIndex: 'position', key: '2',
      },
      {
          width:330,
          title: 'Ngày gia nhập', dataIndex: 'appointment_date', key: '3',
      },
      {
        title: 'Hành động',
        key: 'operation',
        fixed: 'right',
        width: 300,
        render: (text, row) => (
          <Space size="middle" >
            <Popconfirm title="Are you sure delete this task?" onConfirm={()=>this.confirm(row.id)} onCancel={this.cancel} okText="Yes" cancelText="No">
              <Tag color="volcano" className="table-action">Xoá</Tag>
            </Popconfirm>
            <Tag onClick={()=>this.showDrawerModify(row)} color="geekblue" className="table-action">Sửa thông tin</Tag>
          </Space>
        ),
      },
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Content >
          {/* <div style={{ height: "calc(100vh - 139px)" }} className="layout-content"> */}
          <div className="layout-content">
            <div
              style={{ padding: 24, minHeight: 200 }}
            >
              <Table  columns={columns} dataSource={this.state.userDepartment}  className="table-content" rowKey="id" />
            </div>
          </div>
        </Content>
        <Profile visible={this.state.visible} onCloseProfile={this.onClose} />
        <Modify visibleModify={this.state.visibleModify} onCloseModify={this.onCloseModify} />
        <Adduser visibleAdduser={this.state.visibleAdduser} onCloseAdduser={this.onCloseAdduser} />
      </div>
    );
  }
}
