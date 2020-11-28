import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import Profile from "../Profile/Profile"
import Modify from "../Modify/Modify";
import Adduser from "../Adduser/Adduser";
import * as userActions from '../../actions/userAction';
import { Button, Layout, Upload } from "antd";
import { Table, Space, Tag, Avatar } from 'antd';
import { Input } from 'antd';
import { Popconfirm, message } from 'antd';
import imgUser from "../../assets/images/imguser.png";

import {
  PlusOutlined
} from "@ant-design/icons";
import { identity } from 'lodash';
const { Content } = Layout;
class TableTest extends Component {
  componentDidMount() {
    const { userActionCreators } = this.props;
    const { fetchListUser } = userActionCreators;
    fetchListUser();
  }

  state = {
    collapsed: false,
    visible: false,
    visibleModify: false,
    visibleAdduser: false,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
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
    // alert("123")
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
    const { userActionCreators } = this.props;
    const { deleteUser } = userActionCreators;
    deleteUser(e); 
    // message.success('Bạn đã xoá thành công');
  }

  cancel = (e) => {
    console.log(e);
    message.error('Không xoá');
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  
  render() {
    const data = this.props.user.listUser;
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
        // width: 430,
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: (text,row) => (
          <div >
            <b className="user-infor-table-top">{text}</b>
            <p className="user-infor-table-center">{row.position}</p>
            <span className="user-infor-table-bottom">{row.email}</span>
            <span style={{fontSize:"12px"}} className="user-infor-table-bottom user-infor-phone">{row.phone}</span>
              {/* <p className="user-infor-table-top user-infor-name user-infor-table-top-link">aaaaaaaaaaaaa</p> 
              <p className="user-infor-table-center user-infor-position">{row.position}</p>
              <span style={{marginRight:"15px",fontSize:"12px"}} className="user-infor-table-bottom user-infor-mail">{row.email}</span>
              <span style={{fontSize:"12px"}} className="user-infor-table-bottom user-infor-phone">{row.phone}</span> */}
          </div>
        )
      },
      {
        title: 'Ngày sinh',
        // width: 330,
        dataIndex: 'sex',
        key: 'sex',
        sorter: (a, b) => a.age - b.age,
        render: (text,row) => (
          <div>
            <p className="user-infor-table-top">{text}</p>
            <p className="user-infor-table-center">{}</p>
            <span className="user-infor-table-bottom">{row.birthday}</span>
          </div>
        )
      },
      {
        //  width:330,
         title: 'Trình độ', dataIndex: 'lever', key: '2',
         render: (text,row) => (
          <div>
            <p className="user-infor-table-top">{text}</p>
            <span className="user-infor-table-bottom">{row.school}</span>
          </div>
        )
      },
      {
        title: 'Hành động',
        key: 'operation',
        fixed: 'right',
        // width: 300,
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
              <Table  columns={columns} dataSource={data}  className="table-content" rowKey="id" />
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


const mapStateToProps = state => ({
  user: state.userReducer
})
const mapDispatchToProps = dispatch => ({
  userActionCreators: bindActionCreators(userActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TableTest)