import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { ValidateField, notNull } from "helpers/FuncHelper";
import "../../App/App.css";
import "./Table.css";
import { Layout } from "antd";
import { Table, Space, Tag } from "antd";
import { Popconfirm, message } from "antd";
import { Input, Modal } from "antd";
import axiosConfig from "apis/axios";
import {
  getListParts,
  addParts,
  updateParts,
  deleteParts,
} from "apis/partsApi";
import { Select } from "antd";
const { Option } = Select;
const { Content } = Layout;
class TableParts extends Component {
  state = {
    collapsed: false,
    data: null,
    dataDepartment: null,
    loading: false,
    is_create: false,
    id: "",
    dep_id: "",
    err_dep: "",
    part_name: "",
    err_name: "",
    part_note: "",
    department_name: "",
    status: 1,
  };

  componentDidMount = () => {
    this.fetchData(1);
    this.fetchDepartment();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.valueSearch !== prevProps.valueSearch) {
      let resListPart = await getListParts("all");
      let listPartSearch = resListPart.data.filter((part) => {
        return (
          part.part_name
            .toLowerCase()
            .indexOf(this.props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        meta: {
          pagination: listPartSearch.length,
        },
        data: listPartSearch,
      };
      this.setState({
        data: obj,
      });
    }
  };

  fetchDepartment = () => {
    axiosConfig
      .get("/api/departments/map")
      .then((res) => {
        this.setState({
          dataDepartment: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fetchData = async (page) => {
    let res = await getListParts(page);
    if (!res.err) {
      this.setState({
        data: res,
      });
      this.props.totalPart(res.meta.pagination.total);
    } else {
      message.error("get list parts failed");
    }
  };
  onSubmit = async () => {
    let ts = this.state;
    let params = {
      dep_id: ts.dep_id,
      part_name: ts.part_name,
      part_note: ts.part_note,
    };
    let err_name = await ValidateField(params.part_name, 8, 30, "Tổ");
    let err_dep = await notNull(params.dep_id, "Phòng ban");

    if (err_name || err_dep) {
      this.setState({
        err_name,
        err_dep,
      });
    }
    if (err_dep === "" && err_name === "") {
      this.hideModal();
      this.props.uiActionCreatorsS();
      if (this.state.id === "") {
        let res = await addParts(params);
        if (res.message === "Success!. Stored") {
          message.success("Thêm tổ thành công");
          this.fetchData();
        } else {
          message.error("Thêm tổ thất bại");
        }
      } else {
        let res = await updateParts(this.state.id, params);
        if (res.message === "Success!. Updated") {
          message.success("Cập nhật tổ thành công");
          this.setState({
            id: "",
          });
          this.fetchData();
        } else {
          message.error("Update permission thất bại");
        }
      }
      this.props.uiActionCreatorsH();
    }
  };
  hideModal = () => {
    this.props.hideModal();
    this.setState({
      is_create: false,
      dep_id: "",
      err_dep: "",
      part_name: "",
      err_name: "",
      part_note: "",
    });
  };
  showModal = (id) => {
    let parts = this.state.data.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
      is_create: true,
      id: parts[0].id,
      dep_id: parts[0].dep_id,
      part_name: parts[0].part_name,
      part_note: parts[0].part_note,
    });
    this.props.showModal();
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  confirm = async (id) => {
    this.props.uiActionCreatorsS();
    const params = {
      id,
    };
    let res = await deleteParts(params);
    if (res.message === "Success!. Deleted") {
      this.fetchData();
      message.success("Ẩn tổ thành công");
    } else {
      message.error("Ẩn tổ thất bại");
    }
    this.props.uiActionCreatorsH();
  };

  cancel = (e) => {
    message.error("Không ẩn");
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  handleChangeDepartment = (value) => {
    this.setState({
      dep_id: value,
    });
  };
  renderDepartment = () => {
    if (this.state.dataDepartment !== null) {
      return this.state.dataDepartment.map((item) => {
        return (
          <Option key={item.id} value={item.id}>
            {item.dep_name}
          </Option>
        );
      });
    } else return "";
  };
  handlePagination = async (pagination) => {
    try {
      let res = await getListParts(pagination);
      this.setState({
        data: res,
      });
    } catch (error) {
      console.log("False to load API", error);
    }
  };
  render() {
    // console.log(this.state.name);
    let data = "";
    let total = 0;
    if (this.state.data) {
      data = this.state.data.data;
      total = this.state.data.meta.pagination.total;
    }
    const department = this.state.dataDepartment;
    if (data !== null && department !== null) {
      for (let item of data) {
        for (let itemDepartment of department) {
          if (item.dep_id === itemDepartment.id) {
            item.department = itemDepartment.dep_name;
          }
        }
      }
    }

    const columns = [
      {
        title: "Tên tổ",
        dataIndex: "part_name",
        key: "part_name",
      },
      {
        title: "phòng ban",
        width: 200,
        dataIndex: "department",
        key: "department",
        fixed: "left",
      },
      {
        title: "Ghi chú",
        dataIndex: "part_note",
        key: "part_note",
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
        dataIndex: "created_at",
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
          title={!this.state.is_create ? "Tạo tổ" : "Cập nhật tổ"}
          visible={this.props.showModalParts}
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
                <span className="tabs-user-infor-top">
                  Chọn phòng ban<span>*</span>
                </span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                  <Select
                    value={this.state.dep_id}
                    // value=406
                    style={{ width: 450 }}
                    onChange={this.handleChangeDepartment}
                  >
                    {this.renderDepartment()}
                  </Select>
                </div>
                {this.state.err_dep !== ""  ? (
                  <span
                    style={{
                      color: "red",
                      fontStyle: "italic",
                    }}
                  >
                    {this.state.err_dep}
                  </span>
                ) : null}
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">
                  Tên tổ<span>*</span>
                </span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.part_name}
                    name="part_name"
                    onChange={this.onChange}
                  />
                </div>
                {this.state.err_name !== "" ? (
                  <span
                    style={{
                      color: "red",
                      fontStyle: "italic",
                    }}
                  >
                    {this.state.err_name}
                  </span>
                ) : null}
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Ghi chú tổ</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.part_note}
                    name="part_note"
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

const mapDispatchToProps = (dispatch) => ({
  uiActionCreatorsS: bindActionCreators(showLoading, dispatch),
  uiActionCreatorsH: bindActionCreators(hideLoading, dispatch),
});

export default connect(null, mapDispatchToProps)(TableParts);
