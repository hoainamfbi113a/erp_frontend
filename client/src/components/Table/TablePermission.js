import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import "../../App/App.css";
import "./Table.css";
import * as userSixActions from "actions/userSix";
import * as uiAction from "actions/ui";
import { Layout } from "antd";
import { Table, Space, Tag, Avatar } from "antd";
import { Popconfirm, message } from "antd";
import { Input, Modal } from "antd";
import { getListPermission, addPermission, updatePermission } from "apis/permissionApi";
import { Select } from "antd";
const { Option } = Select;
const { Content } = Layout;
class TablePermission extends Component {
  state = {
    collapsed: false,
    data: null,
    loading: false,
    id: "",
    app_id: "99",
    feature_id: "1",
    name: "",
    status: 1,
  };
  componentDidMount = () => {
    this.fetchData();
  };
  fetchData = async () => {
    let res = await getListPermission(1);
    if (!res.err) {
      this.setState({
        data: res,
      });
    } else {
      alert("get list permission failed");
    }
  };
  onSubmit = async () => {
    let params = {
        app_id: this.state.app_id,
        feature_id: this.state.feature_id,
        name: this.state.name,
        status: this.state.status,
      };
    if (this.state.id === "") {
      this.hideModal();
      let res = await addPermission(params);
          if (res.message === "Success!. Stored") {
            message.success("Thêm permission thành công");
            this.fetchData();
          } else {
              message.error("Thêm permission thất bại");
          }
    } else {
      this.hideModal();
      let res = await updatePermission(id, params);
          if (res.message === "Success!. Updated") {
            message.success("Update permission thành công");
            this.setState({
              id: "",
            });
            this.fetchData();
          } else{
          message.error("Update permission thất bại");
          }
  };
}
  hideModal = () => {
    this.props.hideModal();
  };
  showModal = (id) => {
    let permission = this.state.data.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
      id: permission[0].id,
      feature_id: permission[0].feature_id,
      name: permission[0].name,
      status: permission[0].status,
    });
    this.props.showModal();
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  confirm = (e) => {
    const { userSixActionCreators } = this.props;
    const { deleteUserSix } = userSixActionCreators;
    deleteUserSix(e);
  };

  cancel = (e) => {
    message.error("Không ẩn");
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  handleChangeFeature = (value) => {
    this.setState({
      feature_id: value,
    });
  };
  handlePagination = async (pagination) => {
    this.props.uiActionCreators.showLoading();
    let res = await getListPermission(1);
      if(!res.err){
        this.setState({
            data: res,
          });
      } else {
        message.error("get list permission failed");
        console.log("False to load API", error);
      }
      this.props.uiActionCreators.hideLoading();
      
  };
  render() {
    let data = "";
    let total = 0;
    if (this.state.data) {
      data = this.state.data.data;
      total = this.state.data.meta.pagination.total;
    }
    const columns = [
      {
        title: "id đặc tính",
        width: 200,
        dataIndex: "name",
        key: "name",
        fixed: "left",
      },
      {
        title: "Tên quyền",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Slug",
        dataIndex: "slug",
        key: "slug",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (text) => {
          if (text == 1)
            return (
              <Tag color="geekblue" className="table-action">
                ACTIVE
              </Tag>
            );
          return (
            <Tag color="geekblue" className="table-action">
              HIDE
            </Tag>
          );
        },
      },
      {
        title: "Ngày tạo",
        dataIndex: "created",
        key: "created",
      },

      {
        title: "Hành động",
        key: "operation",
        dataIndex: "id",
        fixed: "right",
        render: (text, row) => (
          <Space size="middle">
            <Popconfirm
              title="Are you sure hide this user?"
              onConfirm={() => this.confirm(text)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tag color="volcano" className="table-action">
                Ẩn
              </Tag>
            </Popconfirm>
            <Tag
              onClick={() => this.showModal(text)}
              color="geekblue"
              className="table-action"
            >
              Cập nhật
            </Tag>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Content>
          <div className="layout-content">
            <div style={{ padding: 24, minHeight: 200 }}>
              <Table
                style={{ minHeight: "70vh" }}
                dataSource={data}
                columns={columns}
                className="table-content"
                rowKey="id"
                pagination={{
                  onChange: this.handlePagination,
                  pageSize: 15,
                  total: total,
                }}
              />
            </div>
          </div>
        </Content>
        <Modal
          title="Tạo permission"
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
            // onSubmit={this.onSubmit}
            method="post"
          >
            <ul style={{ marginLeft: "23px" }}>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Chọn đặc tính</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                  <Select
                    value={this.state.feature_id.toString()}
                    style={{ width: 120 }}
                    onChange={this.handleChangeFeature}
                  >
                    <Option value="1">Profile</Option>
                    <Option value="2">Department</Option>
                    <Option value="3">Personal History</Option>
                    <Option value="4">Work Object</Option>
                    <Option value="5">Journalist Card</Option>
                    <Option value="6">User Degree</Option>
                  </Select>
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Tên permission</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.name}
                    name="name"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Trạng thái</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Select defaultValue="1" style={{ width: 120 }}>
                    <Option value="1">Action</Option>
                  </Select>
                </div>
              </li>
            </ul>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  listUserSix: state.userSixReducer,
});
const mapDispatchToProps = (dispatch) => ({
  userSixActionCreators: bindActionCreators(userSixActions, dispatch),
  uiActionCreators: bindActionCreators(uiAction, dispatch),
});
export default connect(null, mapDispatchToProps)(TablePermission);
