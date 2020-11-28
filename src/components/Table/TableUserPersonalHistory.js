import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../../App/App.css";
import "../Crm/Crm.css"
import "./Table.css"
import Profile from "../Profile/Profile"
import Modify from "../Modify/Modify";
import Adduser from "../Adduser/Adduser";
import * as userPersonalHistoryActions from '../../actions/userPersonalHistoryAction';
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
class TableUserPersonalHistory extends Component {
  componentDidMount() {
    const { userPersonalHistoryActionCreators } = this.props;
    const { fetchListUserPersonalHistory } = userPersonalHistoryActionCreators;
    fetchListUserPersonalHistory();
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
    const { userPersonalHistoryActionCreators } = this.props;
    const { deleteUserPersonalHistory } = userPersonalHistoryActionCreators;
    deleteUserPersonalHistory(e); 
    // message.success('Bạn đã xoá thành công');
  }

  cancel = (e) => {
    message.error('Không xoá');
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  
  render() {
    const data = this.props.userPersonalHistory.listUserPersonalHistory;
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
        title: 'work_place',
        width: 200,
        dataIndex: 'work_place',
        key: 'work_place',
        sorter: (a, b) => a.work_place.length - b.work_place.length,
      },
      {
          width:330,
          title: 'work_from', dataIndex: 'work_from', key: 'work_from',
      },
      {
          width:330,
          title: 'work_to', dataIndex: 'work_to', key: 'work_to',
      },
      {
        title: 'working_process',
        width: 330,
        dataIndex: 'working_process',
        key: 'working_process',
        sorter: (a, b) => a.working_process - b.working_process,
      },
      {
         width:330,
         title: 'note', dataIndex: 'note', key: 'note',
      },
      {
        title: 'Hành động',
        key: 'operation',
        fixed: 'right',
        width: 300,
        render: (text, row) => (
          <Space size="middle" >
            <Popconfirm title="Are you sure delete this task?" onConfirm={()=>this.confirm(row.id)} onCancel={this.cancel} okText="Yes" cancelText="No">
              <Tag color="volcano" className="table-action">Ẩn user</Tag>
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
  userPersonalHistory: state.userPersonalHistoryReducer
})
const mapDispatchToProps = dispatch => ({
  userPersonalHistoryActionCreators: bindActionCreators(userPersonalHistoryActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TableUserPersonalHistory)