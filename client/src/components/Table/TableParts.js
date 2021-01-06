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
class TableParts extends Component {
  state = {
    collapsed: false,
    data: null,
    dataDepartment: null,
    loading: false,
    id: "",
    dep_id:"",
    part_name:"",
    part_note:"",
    department_name:"",
    status: 1,
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
      .get("/api/parts")
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
        dep_id:this.state.dep_id,
        part_name:this.state.part_name,
        part_note:this.state.part_note,
      };
      this.hideModal();
      axiosConfig
        .post("/api/parts", params)
        .then((res) => {
          if (res.message === "Success!. Stored") {
            message.success("Thêm bộ phận thành công");
            this.fetchData();
          } else {
            message.error("Thêm bộ phân thất bại");
          }
        })
        .catch((err) => {
          message.error("Thêm bộ phân thất bại");
          console.log(err);
        });
    } else {
      let params = {
        dep_id:this.state.dep_id,
        part_name:this.state.part_name,
        part_note:this.state.part_note,
      };
      this.hideModal();
      axiosConfig
        .put(`/api/parts/${this.state.id}`, params)
        .then((res) => {
          if (res.message === "Success!. Updated") {
            message.success("Cập nhật bộ phận thành công");
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
          message.error("Update permission thất bại");
          console.log(err);
        });
    }
  };
  hideModal = () => {
    this.props.hideModal();
  };
  showModal = (id) => {
    let parts = this.state.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
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

  confirm = (id) => {
    const params = {
      id,
    }
    axiosConfig.post(`/api/partsd`,params)
    .then((res)=>{
      if(res.message === "Success!. Deleted"){
        this.fetchData()
        message.success("Xoá bộ phận thành công")
      }
      else{
        message.error("Xoá bộ phận thất bại")
      }
    })
    .catch((err)=>{
      message.error("Xoá bộ phận thất bại")
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
  renderDepartment = () => {
    if (this.state.dataDepartment !== null) {
      return this.state.dataDepartment.map((item) => {
        return <Option key={item.id} value={item.id}>{item.dep_name}</Option>;
      });
    } else return "";
  };
  render() {
    // console.log(this.state.name);
    let data = this.state.data;
    const department = this.state.dataDepartment
    if(data !==null && department!== null){
      for(let item of data){
        for(let itemDepartment of department){
          if(item.dep_id === itemDepartment.id)
          {
            item.department = itemDepartment.dep_name
          }
        }
      }
    }
    console.log(data)
    const columns = [
      {
        title: "phòng ban",
        width: 200,
        dataIndex: "department",
        key: "department",
        fixed: "left",
      },
      {
        title: "Tên bộ phận",
        dataIndex: "part_name",
        key: "part_name",
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
          title="Tạo bộ phận"
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
            // onSubmit={this.onSubmit}
            method="post"
          >
            <ul style={{ marginLeft: "23px" }}>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Chọn phòng ban</span>
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
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Tên bộ phận</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                  <Input
                    value={this.state.part_name}
                    name="part_name"
                    onChange={this.onChange}
                  />
                </div>
              </li>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Ghi chú bộ phận</span>
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

const mapStateToProps = (state, ownProps) => ({
  listUserSix: state.userSixReducer,
});
const mapDispatchToProps = (dispatch) => ({
  userSixActionCreators: bindActionCreators(userSixActions, dispatch),
});
export default connect(null, null)(TableParts);
