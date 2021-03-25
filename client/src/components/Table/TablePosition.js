import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { ValidateField } from "helpers/FuncHelper";
import "../../App/App.css";
import "./Table.css";
import { Layout } from "antd";
import { Table, Space, Tag, Select } from "antd";
import { Popconfirm, message } from "antd";
import { Input, Modal } from "antd";
const { Option } = Select;
import {
  getListPosition,
  addPosition,
  updatePosition,
  deletePosition,
} from "apis/positionApi";
import axiosConfig from "apis/axios";
const { Content } = Layout;
class TablePosition extends Component {
  state = {
    collapsed: false,
    data: null,
    loading: false,
    is_create: false,
    id: "",
    pos_name: "",
    err_name: "",
    pos_note: "",
  };

  componentDidMount = () => {
    this.fetchData();
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.valueSearch !== prevProps.valueSearch) {
      let resListPos = await getListPosition("all");
      let listPosSearch = resListPos.data.filter((pos) => {
        return (
          pos.pos_name
            .toLowerCase()
            .indexOf(this.props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        meta: {
          pagination: listPosSearch.length,
        },
        data: listPosSearch,
      };
      this.setState({
        data: obj,
      });
    }
  };
  fetchData = async () => {
    let data = await getListPosition(1);
    this.setState({
      data,
    });
    this.props.totalPosition(data.meta.pagination.total);
  };
  onSubmit = async () => {
    let ts = this.state;
    let params = {
      pos_name: ts.pos_name,
      pos_note: ts.pos_note,
    };
    let err_name = await ValidateField(params.pos_name, 8, 30, "Chức vụ");
    if (err_name) {
      this.setState({
        err_name,
      });
    }
    if (err_name === "") {
      this.hideModal();
      this.props.uiActionCreatorsS();
      if (this.state.id === "") {
        this.hideModal();
        let res = await addPosition(params);
        if (res.message === "Success!. Stored") {
          message.success("Thêm chức vụ thành công");
          this.fetchData();
        } else {
          message.error("Thêm chức vụ thất bại");
        }
      } else {
        this.hideModal();
        let res = await updatePosition(params, this.state.id);
        this.setState({
          id: "",
        });
        if (res.message === "Success!. Updated") {
          message.success("Cập nhật chức vụ thành công");
          this.fetchData();
        } else {
          message.error("Cập nhật chức vụ thất bại");
        }
      }
      this.props.uiActionCreatorsH();
    }
  };
  hideModal = () => {
    this.props.hideModal();
    this.setState({
      is_create: false,
      pos_name: "",
      pos_note: "",
      err_name: "",
    });
  };
  showModal = (id) => {
    let position = this.state.data.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
      is_create: true,
      id: position[0].id,
      pos_name: position[0].pos_name,
      pos_note: position[0].pos_note,
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
    let res = await deletePosition(params);
    if (res.message === "Success!. Deleted") {
      this.fetchData();
      message.success("Ẩn chức vụ thành công");
    } else {
      message.error("Ẩn chức vụ thất bại");
    }
    this.props.uiActionCreatorsH();
  };

  cancel = (e) => {
    message.error("Không ẩn");
  };
  handlePagination = async (pagination) => {
    let data = await getListPosition(pagination);
    this.setState({
      data,
    });
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
        title: "Tên chức vụ",
        dataIndex: "pos_name",
        key: "pos_name",
      },
      {
        title: "Ghi chú",
        dataIndex: "pos_note",
        key: "pos_note",
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
              title="Bạn có muốn ẩn không?"
              onConfirm={() => this.confirm(text)}
              onCancel={this.cancel}
              okText="Có"
              cancelText="Không"
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
          title={!this.state.is_create ? "Tạo chức vụ" : "Cập nhật chức vụ"}
          visible={this.props.showModalPosition}
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
                <span className="tabs-user-infor-top">
                  Tên chức vụ<span>*</span>
                </span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.pos_name}
                    name="pos_name"
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
                  </span>) : null}
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Ghi chú chức vụ</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.pos_note}
                    name="pos_note"
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

export default connect(null, mapDispatchToProps)(TablePosition);
