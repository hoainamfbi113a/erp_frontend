import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
class TablePosition extends Component {
  state = {
    collapsed: false,
    data: null,
    dataDepartment: null,
    loading: false,
    id: "",
    pos_name:"",
    pos_note:""
  };
  componentDidMount = () => {
    this.fetchData();
    this.fetchDepartment();
  };
  fetchDepartment = () => {
    axiosConfig
      .get("/api/departments")
      .then((res) => {
        this.setState({
          dataDepartment: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fetchData = () => {
    axiosConfig
      .get("/api/positions")
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
        pos_name:this.state.pos_name,
        pos_note:this.state.pos_note
      };
      this.hideModal();
      axiosConfig
        .post("/api/positions", params)
        .then((res) => {
          if (res.message === "Success!. Stored") {
            message.success("Thêm chức vụ thành công");
            this.fetchData();
          } else {
            message.error("Thêm chức vụ thất bại");
          }
        })
        .catch((err) => {
          message.error("Thêm chức vụ thất bại");
          console.log(err);
        });
    } else {
      let params = {
        pos_name:this.state.pos_name,
        pos_note:this.state.pos_note,
      };
      this.hideModal();
      axiosConfig
        .put(`/api/positions/${this.state.id}`, params)
        .then((res) => {
          if (res.message === "Success!. Updated") {
            message.success("Cập nhật chức vụ thành công");
            this.setState({
              id: "",
            });
            this.fetchData();
          }
        })
        .catch((err) => {
          this.setState({
            id: "",
          });
          message.error("Cập nhật chức vụ thất bại");
          console.log(err);
        });
    }
  };
  hideModal = () => {
    this.props.hideModal();
  };
  showModal = (id) => {
    let position = this.state.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
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

  confirm = (id) => {
    const params = {
      id,
    }
    axiosConfig.post(`/api/positionsd`,params)
    .then((res)=>{
      if(res.message === "Success!. Deleted"){
        this.fetchData()
        message.success("Ẩn chức vụ thành công")
      }
      else{
        message.error("Ẩn chức vụ thất bại")
      }
    })
    .catch((err)=>{
      message.error("Ẩn chức vụ thất bại")
      console.log(err);
    })
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
  render() {
    let data = this.state.data;
    const columns = [
      {
        title: "Tên bộ phận",
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
          title="Tạo tổ"
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
                <span className="tabs-user-infor-top">Tên chức vụ</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.pos_name}
                    name="pos_name"
                    onChange={this.onChange}
                  />
                </div>
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

const mapStateToProps = (state, ownProps) => ({
  listUserSix: state.userSixReducer,
});
const mapDispatchToProps = (dispatch) => ({
  userSixActionCreators: bindActionCreators(userSixActions, dispatch),
});
export default connect(null, null)(TablePosition);
