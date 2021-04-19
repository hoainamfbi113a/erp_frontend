import React, { Component } from "react";
import { connect } from "react-redux";
import "../../App/App.css";
import "./Table.css";
import { Layout } from "antd";
import { Table, Space, Tag } from "antd";
import { Popconfirm, message } from "antd";
import { Input, Modal } from "antd";
import {
  getListPermission,
  addPermission,
  updatePermission,
  allPermission,
} from "apis/permissionApi";
import { Select } from "antd";
import axios from "axios";
import lodash from "lodash";
import axiosConfig from "apis/axios";
import { AllPermissionGroup } from "../../helpers/DataHelper";
const { Option } = Select;
const { Content } = Layout;

class TablePermission extends Component {
  state = {
    collapsed: false,
    data: null,
    loading: false,
    id: "",
    app_id: "99",
    table_management_id: "",
    name: "",
    uri: "",
    method: "",
    action: "",
    param: "",
    body: "",
    option: "",
    status: 1,
    dataTableManager: null,
    service_management_id: "",
    dataService: null,
    listAction: null,
  };
  componentDidMount = () => {
    this.fetchData();
    this.fetchAction();
  };
  fetchAction = () => {
    axiosConfig
      .get("/api/action")
      .then((res) => {
        this.setState({
          listAction: res,
        });
      })
      .catch((err) => {
        console.log("err");
      });
  };
  fetchData = async () => {
    let data = await allPermission();
    console.log(data);
    if (!data.err) {
      this.setState({
        data: AllPermissionGroup(data),
      });
    } else {
      message.error("Get list permission failed");
    }
    axios
      .get("https://employee.tuoitre.vn/api/service-management")
      .then((res) => {
        console.log(res.data);
        this.setState({
          dataService: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onSubmit = async () => {
    let {
      table_management_id,
      name,
      uri,
      method,
      action,
      param,
      body,
      option,
      status,
    } = this.state;
    let params = {
      table_management_id,
      name,
      uri,
      method,
      action,
      param,
      body,
      option,
      status,
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
      } else {
        message.error("Update permission thất bại");
      }
    }
  };
  hideModal = () => {
    this.props.hideModal();
  };
  showModal = (id) => {
    let permission = this.state.data.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
      id: permission[0].id,
      table_management_id: permission[0].table_management_id,
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

  confirm = (id) => {
    axiosConfig
      .post("/api/permission/delete", { id })
      .then((res) => {
        console.log(res);
        if (res.message === "Success!. Deleted") {
          this.fetchData();
          message.success("Xoá quyền thành công");
        } else {
          message.error("Xoá quyền thất bại");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // const { userSixActionCreators } = this.props;
    // const { deleteUserSix } = userSixActionCreators;
    // deleteUserSix(e);
  };

  cancel = (e) => {
    message.error("Không ẩn");
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  handleChangeFeature = (value) => {
    axiosConfig
      .get(`/api/service-management/table-management/${value}`)
      .then((res) => {
        console.log(res);
        this.setState({
          dataTableManager: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      service_management_id: value,
    });
  };
  handleChangeTable = (value) => {
    this.setState({
      table_management_id: value,
    });
  };
  handlePagination = async (pagination) => {
    let res = await getListPermission(pagination);
    if (!res.err) {
      this.setState({
        data: res,
      });
    } else {
      message.error("get list permission failed");
      console.log("False to load API", error);
    }
  };
  renderServiceManager = () => {
    if (this.state.dataService) {
      return this.state.dataService.map((item) => {
        return <Option value={item.id}>{item.name}</Option>;
      });
    }
  };
  renderAction = () => {
    // console.log(this.state.listAction);
    // let { data } = this.state.listAction;
    if (this.state.listAction) {
      return this.state.listAction.data.map((item) => {
        return <Option value={item.name}>{item.name}</Option>;
      });
    }
  };
  renderTableManager = () => {
    if (this.state.dataService && this.state.dataTableManager) {
      return this.state.dataTableManager.map((item) => {
        // if (this.state.service_management_id == item.service_management_id) {
        return <Option value={item.id}>{item.name}</Option>;
        //  }
      });
    }
  };
  handleServiceManager = (value) => {
    this.setState({
      service_management_id: value,
    });
  };
  handleChangeAction = (value) => {
    this.setState({
      action: value,
    });
  };
  handleChangeMethod = (value) => {
    this.setState({
      method: value,
    });
  };

  NestedTable() {
    let data = "";
    if (this.state.data) {
      data = this.state.data;
      console.log(data);
      const expandedRow = (row) => {
        //total = this.state.data.meta.pagination.total;

        for (let i of data) {
          let arr = [];
          for (let a of i.options) {
            arr.push(a.label);
          }
        }
        const columnsExpand = [
          { title: "Quyền", dataIndex: "label", key: "label" },
          {
            title: "Hành động",
            dataIndex: "operation",
            key: "operation",
            render: () => (
              <Space size="middle">
                <a>Pause</a>
                <a>Stop</a>
              </Space>
            ),
          },
        ];

        return (
          <Table
            columns={columnsExpand}
            dataSource={
              data[1].options
            }
            pagination={false}
          />
        );
      };

      const columns = [
        {
          title: "Nhóm quyền",
          dataIndex: "label",
          key: "key",
        },
      ];

      return (
        <Table
          style={{ minHeight: "70vh" }}
          className="table-content"
          //rowKey="id"
          columns={columns}
          expandedRowRender={ expandedRow }
          dataSource={data}
          // pagination={{
          //   onChange: this.handlePagination,
          //   pageSize: 15,
          //   total: total,
          // }}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Content>
          <div className="layout-content">
            <div style={{ padding: 24, minHeight: 200 }}>
              {/* <Table
                style={{ minHeight: "70vh" }}
                dataSource={data}
                columns={columns}
                className="table-content"
                expandable={
                  <Table
                    columns={expandColumns}
                    dataSource={datas}
                    pagination={false}
                  />
                }
                rowKey="id"
                pagination={{
                  onChange: this.handlePagination,
                  pageSize: 15,
                  total: total,
                }}
              /> */}
              {this.NestedTable()}
            </div>
          </div>
        </Content>
        <Modal
          title="Tạo quyền"
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
            method="post"
          >
            <ul style={{ marginLeft: "23px" }}>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Chọn Service</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                  <Select
                    value={this.state.service_manager_id}
                    style={{ width: 120 }}
                    onChange={this.handleChangeFeature}
                  >
                    {this.renderServiceManager()}
                  </Select>
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Chọn table</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                  <Select
                    value={this.state.table_management_id}
                    style={{ width: 120 }}
                    onChange={this.handleChangeTable}
                  >
                    {this.renderTableManager()}
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
                <span className="tabs-user-infor-top">URL</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.uri}
                    name="uri"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Method</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Select
                    value={this.state.method}
                    style={{ width: 120 }}
                    onChange={this.handleChangeMethod}
                  >
                    <Option value="GET">GET</Option>
                    <Option value="POST">POST</Option>
                    <Option value="PUT">PUT</Option>
                    <Option value="DELETE">DELETE</Option>
                  </Select>
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Action</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                  <Select
                    value={this.state.action}
                    style={{ width: 120 }}
                    onChange={this.handleChangeAction}
                  >
                    {this.renderAction()}
                  </Select>
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Params</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.param}
                    name="param"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Body</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.body}
                    name="body"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Option</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.option}
                    name="option"
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

export default connect(null, null)(TablePermission);
