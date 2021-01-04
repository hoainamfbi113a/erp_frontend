import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App/App.css";
import "../Crm/Crm.css";
import "./Table.css";
import * as userSixActions from "../../actions/userSix";
import { Layout } from "antd";
import { Table, Space, Tag, Avatar } from "antd";
import { Popconfirm, message } from "antd";
import { Input, Modal } from "antd";
import axiosConfig from "../../apis/axios";
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
  fetchData = () => {
    axiosConfig
      .get("/api/permission")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onSubmit = () => {
    if (this.state.id === "") {
      let params = {
        app_id: this.state.app_id,
        feature_id: this.state.feature_id,
        name: this.state.name,
        status: this.state.status,
      };
      this.hideModal();
      axiosConfig
        .post("/api/permission", params)
        .then((res) => {
          console.log(res);
          if (res.message === "Success!. Stored") {
            message.success("Thêm permission thành công");
            this.fetchData();
          }
        })
        .catch((err) => {
          message.error("đăng ký user thất bại");
          console.log(err);
        });
    }
    else {
      let params = {
        app_id: this.state.app_id,
        feature_id: this.state.feature_id,
        name: this.state.name,
        status: this.state.status,
      };
      this.hideModal();
      axiosConfig
        .put(`/api/permission/${this.state.id}`, params)
        .then((res) => {
          console.log(res);
          if (res.message === "Success!. Updated") {
            message.success("Update permission thành công");
            this.setState({
              id:"",
            })
            this.fetchData();
          }
        })
        .catch((err) => {
          this.setState({
            id:"",
          })
          message.error("Update permission thất bại");
          console.log(err);
        });
    }
  };
  hideModal = () => {
    this.props.hideModal();
  };
  showModal = (id) => {
    let permission = this.state.data.filter((item) => {
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
      feature_id:value
    })
  };
  render() {
    console.log(this.state.name)
    const data = this.state.data;
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
            {/* <Link to={`/crm/admin/edituser/${text}`}>
              <Tag color="geekblue" className="table-action">
                Phân quyền
              </Tag>
            </Link> */}
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
});
export default connect(null, null)(TablePermission);
