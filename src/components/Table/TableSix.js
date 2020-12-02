import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link}  from 'react-router-dom'
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import Profile from "../Profile/Profile"
import Modify from "../Modify/Modify";
import Adduser from "../Adduser/Adduser";
import * as userSixActions from '../../actions/userSix';
import { Button, Layout, Upload } from "antd";
import { Table, Space, Tag, Avatar } from 'antd';
import { Popconfirm, message } from 'antd';
import imgUser from "../../assets/images/imguser.png";

const { Content } = Layout;
class TableSix extends Component {
  componentDidMount() {
    const { userSixActionCreators } = this.props;
    const { fetchListUserSix } = userSixActionCreators;
    fetchListUserSix();
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
    const {userSixActionCreators} = this.props;
    const { editUserSix } = userSixActionCreators;
    editUserSix(user);
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
    const { userSixActionCreators } = this.props;
    const { deleteUserSix } = userSixActionCreators;
    deleteUserSix(e); 
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
    const data = this.props.listUserSix.listUserSix;
    console.log(data)
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
        dataIndex: 'profiles',
        key: '2',
        sorter: (a, b) => a.name.length - b.name.length,
        render: (text,row) => (
          <div >{row.profiles.name}
            {/* <b className="user-infor-table-top">{text.name}</b>
            <p className="user-infor-table-center">{row.profiles.name}</p>
            <span className="user-infor-table-bottom">{row.mobile_phone}</span> */}
            {/* <span style={{fontSize:"12px"}} className="user-infor-table-bottom user-infor-phone">{row.mobile_phone}</span> */}
          </div>
        )
      },
      {
         title: 'Ngày sinh', dataIndex: 'diploma', key: '2',
         render: (text,row) => (
            <div >{row.profiles.birth_day}
            {/* <b className="user-infor-table-top">{text}</b>
            <p className="user-infor-table-center">{row.majors}</p>
            <span className="user-infor-table-bottom">{row.school_name}</span> */}
            {/* <span style={{fontSize:"12px"}} className="user-infor-table-bottom user-infor-phone">{row.phone}</span> */}
          </div>
        )
      },
      {
        title: 'Số điện thoại',
        // width: 330,
        dataIndex: 'birth_day',
        key: 'sex',
        sorter: (a, b) => a.age - b.age,
        render: (text,row) => (
            <div >{row.profiles.local_phone}
            {/* <b className="user-infor-table-top">{text}</b>
            <p className="user-infor-table-center">{row.gender}</p>
            <span className="user-infor-table-bottom">{row.pen_name}</span> */}
            {/* <span style={{fontSize:"12px"}} className="user-infor-table-bottom user-infor-phone">{row.phone}</span> */}
          </div>
        )
      },
      {
        title: 'Phòng ban',
        // width: 330,
        dataIndex: 'birth_day',
        key: 'sex',
        sorter: (a, b) => a.age - b.age,
        render: (text,row) => (
            <div >{row.department.name}
            {/* <b className="user-infor-table-top">{text}</b>
            <p className="user-infor-table-center">{row.gender}</p>
            <span className="user-infor-table-bottom">{row.pen_name}</span> */}
            {/* <span style={{fontSize:"12px"}} className="user-infor-table-bottom user-infor-phone">{row.phone}</span> */}
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
            <Link to={`/crm/usersix/edit/${row.id}`}> 
            <Tag color="geekblue" className="table-action">Sửa thông tin</Tag></Link>
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


const mapStateToProps = (state,ownProps) => (
  console.log("123"),
  {
  listUserSix: state.userSixReducer
})
const mapDispatchToProps = dispatch => (
  console.log("1234"),
  {
  userSixActionCreators: bindActionCreators(userSixActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TableSix)