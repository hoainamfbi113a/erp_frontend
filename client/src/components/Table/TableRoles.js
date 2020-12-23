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
class TableRoles extends Component {
  state = {
    app_id: "99",
    name:"",
    description:"",
    status:1,
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
      name:this.state.name,
      description:this.state.description,
      status:this.state.status,
    };
    this.hideModal();
    axios
      .post("/api/role", params)
      .then((res) => {
        if (res.data.message === "Success!. Stored") {
          message.success("Thêm role thành công");
          // this.fetchData()
        }
      })
      .catch((err) => {
        message.error("Thêm role thất bại");
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
        name:"manager",
        status:"1",
        created:"12/12/2012"
      },
      {
        key:"2",
        name:"human resource",
        status:"1",
        created:"12/12/2012"
      },
      {
        key:"3",
        name:"employee",
        status:"1",
        created:"12/12/2012"
      },
    ]
    const columns = [
      {
        title:"Tên Roles",
        width:200,
        dataIndex:"name",
        key:"name",
        fixed:'left',
      },
      {
        title: 'Mô tả',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (text) =>{
          if(text ==1)
            return  <Tag color="geekblue" className="table-action">ACTIVE</Tag>
          return <Tag color="geekblue" className="table-action">HIDE</Tag>
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
          title="Tạo roles mới"
          visible={this.props.showModalRoles}
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
                <span className="tabs-user-infor-top">Tên roles</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                  <Input
                    name="name"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Mô tả roles</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    name="description"
                    onChange={this.onChange}
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
export default connect(null, null)(TableRoles)