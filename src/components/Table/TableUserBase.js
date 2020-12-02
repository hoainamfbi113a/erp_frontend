import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Layout } from "antd";
import { Table, Space, Tag, Avatar } from 'antd';
import { Popconfirm, message } from 'antd';
import { bindActionCreators } from 'redux';
import {Link}  from 'react-router-dom'
import Profile from "../Profile/Profile"
import Modify from "../Modify/Modify";
import Adduser from "../Adduser/Adduser";
import * as userBaseActions from '../../actions/userBaseAction';
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import imgUser from "../../assets/images/imguser.png";
const { Content } = Layout;
class TableUserBase extends Component {
  componentDidMount() {
    const { userBaseActionCreators } = this.props;
    const { fetchListUserBase } = userBaseActionCreators;
    fetchListUserBase();
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
    const { userBaseActionCreators } = this.props;
    const { deleteUserBase } = userBaseActionCreators;
    console.log(deleteUserBase(e)); 
    // message.success('Bạn đã xoá thành công');
  }

  cancel = (e) => {
    message.error('Không xoá');
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  
  render() {
    const data = this.props.userBase.listUserBase;
    const columns = [
      {
        title:"Ảnh đại diện",
        // width:200,
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
        width: 100,
        dataIndex: 'base1',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
          // width:330,
          title: 'Số điện thoại', dataIndex: 'base2', key: '2',
      },
      {
          // width:330,
          title: 'Địa chỉ', dataIndex: 'base3', key: '2',
      },
      {
        title: 'Bút danh',
        // width: 330,
        dataIndex: 'base4',
        key: 'pen_name',
        sorter: (a, b) => a.age - b.age,
      },
      {
        //  width:330,
         title: 'Ngày sinh', dataIndex: 'base5', key: '2',
      },
      {
        //  width:330,
         title: 'Giới tính', dataIndex: 'base6', key: '2',
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
            <Link to={`/crm/user/edit/${row.id}`}> 
            <Tag  color="geekblue" className="table-action">Sửa thông tin</Tag> </Link>
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
              <Table  columns={columns} dataSource={data}  rowKey="id" />
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
  userBase: state.userBaseReducer
})
const mapDispatchToProps = dispatch => ({
  userBaseActionCreators: bindActionCreators(userBaseActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TableUserBase)