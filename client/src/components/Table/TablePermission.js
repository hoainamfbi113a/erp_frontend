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
import lodash, { forEach } from "lodash";
import axiosConfig from "apis/axios";
import { simpleDate } from "../../helpers/FuncHelper";
import { AllPermissionGroup } from "../../helpers/DataHelper";
const { Option } = Select;
const { Content } = Layout;

class TablePermission extends Component {
  state = {
    collapsed: false,
    data: null,
    loading: true,
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
    this.setState({ loading: true });
    this.fetchAction();
    this.fetchData();
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
    if (!data.err) {
      this.setState({
        data: AllPermissionGroup(data),
      });
      console.log(this.state.data);
    } else {
      message.error("Get list permission failed");
    }
    axios
      .get("https://employee.tuoitre.vn/api/service-management")
      .then((res) => {
        this.setState({
          dataService: res.data.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onSubmit = async () => {
    this.setState({ loading: true });
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
    console.log(id);
    let permiss
    const data = this.state.data;
    for(let i in data) {
      for(let j in data[i].options) {
        if(data[i].options[j].value === id) {
          this.setState({
            id: data[i].options[j].value,
            table_management_id: data[i].options[j].table_management_id,
            name: data[i].options[j].label,
            status: data[i].options[j].status,
          });
        }
      }
    }
    
    this.props.showModal();
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  confirm = (id) => {
    this.setState({ loading: true });
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
      const expandedRow = (row) => {
        //total = this.state.data.meta.pagination.total;

        const columnsExpand = [
          { title: "Quyền", dataIndex: "label", key: "label" },
          { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
          {
            title: "Hành động",
            key: "operation",
            dataIndex: "value",
            fixed: "right",
            render: (value, row) => (
              <Space size="middle">
                <Popconfirm
                  title="Bạn có muốn ẩn không?"
                  onConfirm={() => this.confirm(value)}
                  onCancel={this.cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tag color="volcano" className="table-action">
                    Ẩn
                  </Tag>
                </Popconfirm>
                <Tag
                  onClick={() => this.showModal(value)}
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
          <Table
            loading={this.state.loading}
            style={{ paddingLeft: "2rem" }}
            columns={columnsExpand}
            dataSource={
              //data[1].options
              data.find((group) => group.key === row.key).options
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
          loading={this.state.loading}
          style={{ minHeight: "70vh" }}
          className="table-content"
          //rowKey="id"
          columns={columns}
          expandedRowRender={expandedRow}
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
