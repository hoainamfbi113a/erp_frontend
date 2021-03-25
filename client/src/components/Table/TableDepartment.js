import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../../App/App.css";
import "./Table.css";
import { Layout } from "antd";
import { Table, Space, Tag } from "antd";
import { Popconfirm, message } from "antd";
import { Input, Modal } from "antd";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { ValidateField, ValidateNumber } from "helpers/FuncHelper";
const { Content } = Layout;
import {
  getListDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../apis/departmentApi";
class TablePermission extends Component {
  state = {
    collapsed: false,
    data: null,
    loading: false,
    is_create: false,
    id: "",
    app_id: "99",
    feature_id: "1",
    dep_name: "",
    err_name: "",
    dep_address: "",
    err_address: "",
    dep_phone: "",
    err_phone: "",
    dep_note: "",
    status: 1,
  };

  componentDidMount = () => {
    this.fetchData(1);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.valueSearch !== prevProps.valueSearch) {
      let resListDepart = await getListDepartment("all");
      let listDepartSearch = resListDepart.data.filter((depart) => {
        return (
          depart.dep_name
            .toLowerCase()
            .indexOf(this.props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        meta: {
          pagination: listDepartSearch.length,
        },
        data: listDepartSearch,
      };
      this.setState({
        data: obj,
      });
      this.props.totalDepartment(obj.meta.pagination)
    }
  };

  fetchData = async (page) => {
    let data = await getListDepartment(page);
    this.setState({
      data,
    });
    this.props.totalDepartment(data.meta.pagination.total);
  };
  onSubmit = async () => {
    let ts = this.state;
    let params = {
      dep_name: ts.dep_name,
      dep_address: ts.dep_address,
      dep_phone: ts.dep_phone,
      dep_note: ts.dep_note,
    };
    let err_name = await ValidateField(params.dep_name, 8, 30, "Tên");
    let err_address = await ValidateField(params.dep_address, 8, 30, "Địa chỉ");
    let err_phone = await ValidateNumber(params.dep_phone, 9, 11, "Số điện thoại")
    if(err_name || err_address || err_phone) {
      this.setState({
        err_name,
        err_address,
        err_phone
      })
    }
    
    if (err_name === "" && err_address === "" && err_phone === "") {
      this.hideModal();
      this.props.uiActionCreatorsS();
      if (this.state.id === "") {
        
        let res = await addDepartment(params);
        if (res.message === "Success!. Stored") {
          message.success("Thêm phòng ban thành công");
          this.fetchData();
        } else {
          message.error("Thêm phòng ban thất bại");
        }
      } else {
        let res = await updateDepartment(params, this.state.id);
        this.setState({
          id: "",
        });
        if (res.message === "Success!. Updated") {
          message.success("Cập nhật phòng ban thành công");
          this.fetchData();
        } else {
          message.error("Cập nhật phòng ban thất bại");
        }
      }
      this.props.uiActionCreatorsH();
    }
  };
  hideModal = () => {
    this.props.hideModal();
    this.setState({
      is_create: false,
      dep_name: "",
      err_name: "",
      dep_address: "",
      err_address: "",
      dep_phone: "",
      err_phone: "",
      dep_note: "",
    });
  };
  showModal = (id) => {
    let department = this.state.data.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
      is_create: true,
      id: department[0].id,
      dep_name: department[0].dep_name,
      dep_address: department[0].dep_address,
      dep_phone: department[0].dep_phone,
      dep_note: department[0].dep_note,
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
    let res = await deleteDepartment(params);
    if (res.message === "Success!. Deleted") {
      this.fetchData();
      message.success("Ẩn phòng ban thành công");
    } else {
      message.error("Ẩn phòng ban thất bại");
    }
    this.props.uiActionCreatorsH();
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
    this.fetchData(pagination);
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
        title: "Tên phòng ban",
        dataIndex: "dep_name",
        key: "dep_name",
      },
      {
        title: "Địa chỉ",
        dataIndex: "dep_address",
        key: "dep_address",
      },
      {
        title: "Số điện thoại",
        dataIndex: "dep_phone",
        key: "dep_phone",
      },
      {
        title: "Ghi chú phòng ban",
        dataIndex: "dep_note",
        key: "dep_note",
      },
      {
        title: "Ngày tạo",
        dataIndex: "created_at",
        key: "created_at",
      },

      {
        title: "Hành động",
        key: "operation",
        dataIndex: "id",
        fixed: "right",
        render: (text, row) => (
          <Space size="middle">
            <Popconfirm
              title="Bạn có muốn Ẩn không?"
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
          title={!this.state.is_create ? "Tạo phòng ban" : "Cập nhật phòng ban"}
          visible={this.props.showModalDepartment}
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
                  Tên phòng ban<span>*</span>
                </span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.dep_name}
                    name="dep_name"
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
                <span className="tabs-user-infor-top">
                  Địa chỉ phòng ban<span>*</span>
                </span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.dep_address}
                    name="dep_address"
                    onChange={this.onChange}
                  />
                </div>
                {this.state.err_address !== "" ? (
                  <span
                    style={{
                      color: "red",
                      fontStyle: "italic",
                    }}
                  >
                    {this.state.err_address}
                  </span>
                ) : null}
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">
                  Số điện thoại phòng ban<span>*</span>
                </span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.dep_phone}
                    name="dep_phone"
                    onChange={this.onChange}
                  />
                </div>
                {this.state.err_phone !== "" ? (
                  <span
                    style={{
                      color: "red",
                      fontStyle: "italic",
                    }}
                  >
                    {this.state.err_phone}
                  </span>) : null}
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Ghi chú phòng ban</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.dep_note}
                    name="dep_note"
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

export default connect(null, mapDispatchToProps)(TablePermission);
