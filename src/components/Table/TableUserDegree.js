import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import Profile from "../Profile/Profile"
import Modify from "../Modify/Modify";
import Adduser from "../Adduser/Adduser";
import * as userDegreeActions from '../../actions/userDegreeAction';
import { Button, Layout, Upload } from "antd";
import { Table, Space, Tag, Avatar } from 'antd';
import { Input } from 'antd';
import { Popconfirm, message } from 'antd';
import imgUser from "../../assets/images/imguser.png";


const { Content } = Layout;
class TableUserDegree extends Component {
  componentDidMount() {
    const { userDegreeActionCreators } = this.props;
    const { fetchListUserDegree } = userDegreeActionCreators;
    fetchListUserDegree();
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
    const { userDegreeActionCreators } = this.props;
    const { deleteUserDegree } = userDegreeActionCreators;
    console.log(deleteUserDegree(e)); 
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
    const data = this.props.userDegree.listUserDegree;
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
        title: 'Loại văn bằng',
        width: 200,
        dataIndex: 'type',
        key: 'type',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
          width:330,
          title: 'Tên bằng cấp', dataIndex: 'diploma', key: '2',
      },
      {
          width:330,
          title: 'Chuyên nghành', dataIndex: 'majors', key: '2',
      },
      {
        title: 'Tên trường',
        width: 330,
        dataIndex: 'school_name',
        key: 'school_name',
        sorter: (a, b) => a.age - b.age,
      },
      {
         width:330,
         title: 'Ngày bắt đầu học', dataIndex: 'start_study', key: '2',
      },
      {
         width:330,
         title: 'Ngày kết thúc', dataIndex: 'end_study', key: '22',
      },
      {
         width:330,
         title: 'Ngày nhận bằng', dataIndex: 'graduation_time', key: '23'
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
  userDegree: state.userDegreeReducer
})
const mapDispatchToProps = dispatch => ({
  userDegreeActionCreators: bindActionCreators(userDegreeActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TableUserDegree)