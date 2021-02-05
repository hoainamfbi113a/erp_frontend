import React, { Component } from "react";
import { connect } from "react-redux";
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
    dataDepartment: null,
    loading: false,
    id: "",
    pos_name: "",
    pos_note: "",
    visible: false,
    dep_id: "",
    action: [],
    dataPermission: null,
    pos_id: "",
    dataAction: [],
    crud: "",
    option: [],
  };

  componentDidMount = () => {
    this.fetchData();
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.dep_id !== this.state.dep_id) {
      const { dep_id } = this.state;
      const { pos_id } = this.state;

      if (this.state.crud == 1) {
        const data = await this.getListPermissionNotYet(dep_id, pos_id);
        this.setState({
          dataPermission: data,
        });
      }
      if (this.state.crud == 2) {
        axiosConfig
          .get(
            `/api/permission/departments/positions?dep_id=${dep_id}&pos_id=${pos_id}`
          )
          .then((res) => {
            this.setState({
              dataPermission: res,
            });
          });
      }
    }
    if (prevState.per_id !== this.state.per_id) {
      const { dep_id } = this.state;
      const { pos_id } = this.state;

      if (this.state.crud == 1) {
        const data = await this.getListPermissionNotYet(dep_id, pos_id);
        let arrayAction;
        // Lấy action theo quyền
        data.map((item) => {
          if (item.id == this.state.per_id) {
            return (arrayAction = item.actions);
          }
        });
        const listAllAction = await axiosConfig.get(`/api/action`);

        if (listAllAction) {
          let res = listAllAction.data.filter(
            (item) => !arrayAction.includes(item.name)
          );

          this.setState({
            option: res,
          });
        }
      }
      if (this.state.crud == 2) {
        // const listAllAction = await axiosConfig.get(`/api/action`);
        const listPerByPosDep = await axiosConfig.get(
          `/api/permission/departments/positions?dep_id=${dep_id}&pos_id=${pos_id}`
        );
        let arrayAction;
        listPerByPosDep.map((item) => {
          if (item.id == this.state.per_id) {
            return (arrayAction = item.actions);
          }
        });
        const listAllAction = await axiosConfig.get(`/api/action`);

        if (listAllAction) {
          let res = listAllAction.data.filter((item) =>
            arrayAction.includes(item.name)
          );
          this.setState({
            option: res,
          });
        }
      }
    }
  };
  fetchData = async () => {
    let data = await getListPosition(1);
    this.setState({
      data,
    });
  };
  onSubmit = async () => {
    let params = {
      pos_name: this.state.pos_name,
      pos_note: this.state.pos_note,
    };
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
  };
  submitAddModelPermission = async () => {
    const posId = this.state.pos_id;
    const params = {
      dep_id: this.state.dep_id.toString(),
      permission_id: this.state.per_id.toString(),
      actions: this.state.action,
    };
    const data = await axiosConfig.post(
      `/api/position/permission/${posId}`,
      params
    );
    if (data.message === "Success!. Stored") {
      message.success("Thêm quyền thành công");
      this.hideModal();
    } else {
      message.error("Thêm quyền thất bại");
    }
  };
  submitDeleteModelPermission = async () => {
    try {
      const posId = this.state.pos_id;
      const params = {
        dep_id: this.state.dep_id.toString(),
        permission_id: this.state.per_id.toString(),
        actions: this.state.action,
      };
      const data = await axiosConfig.post(
        `/api/position/permissiond/${posId}`,
        params
      );
      if (data.message === "Success!. Removed") {
        message.success("Xóa quyền thành công");
        this.hideModal();
      } else {
        message.error("Xóa quyền thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmitPermission = () => {
    switch (true) {
      case !this.state.crud:
        message.error("Bạn chưa chọn thao tác");
        break;
      case !this.state.dep_id:
        message.error("Bạn chưa chọn phòng ban");
        break;
      case !this.state.per_id:
        message.error("Bạn chưa chọn quyền");
        break;
      case this.state.action.length == 0:
        message.error("Bạn chưa chọn action");
        break;
      case this.state.crud == 1:
        this.submitAddModelPermission();
        break;
      case this.state.crud == 2:
        this.submitDeleteModelPermission();
        break;
      default:
        break;
    }
  };
  hideModal = () => {
    this.setState({
      visible: false,
      crud: null,
      action: [],
      per_id: null,
      dep_id: null,
    });
    this.props.hideModal();
  };
  showModal = (id) => {
    let position = this.state.data.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
      id: position[0].id,
      pos_name: position[0].pos_name,
      pos_note: position[0].pos_note,
    });
    this.props.showModal();
  };
  showModalPosition = async (id) => {
    this.setState({
      pos_id: id,
    });
    axiosConfig
      .get(`/api/departments?per_page=10`)
      .then((res) => {
        this.setState({
          dataDepartment: res,
        });
      })
      .catch((error) => {
        console.log("False to load API", error);
      });

    this.setState({
      visible: true,
    });
  };

  compareArray = (ar1, ar2) => {
    if (ar1.length !== ar2.length) {
      return false;
    } else {
      const a = ar1.filter((item) => !ar2.includes(item));
      if (a) {
        return false;
      } else {
        return true;
      }
    }
  };

  getListPermissionNotYet = async (dep_id, pos_id) => {
    let res = [];
    try {
      const data = await axiosConfig.get(`/api/permission`);
      const dataAction = await axiosConfig.get(`/api/action`);
      const dataByPosDep = await axiosConfig.get(
        `/api/permission/departments/positions?dep_id=${dep_id}&pos_id=${pos_id}`
      );
      //compare 2 array
      const compareArray = (ar1, ar2) => {
        const a = ar1.filter((item) => !ar2.includes(item));
        if (a.length > 0) {
          return false;
        } else {
          return true;
        }
      };
      // Lấy id của quyền theo chức vụ và phòng ban
      let filterDataPosDep = dataByPosDep.map((item) => {
        return item.id;
      });
      // Lấy ra mảng các action  (all)
      let filterAction = dataAction.data.map((item) => {
        return item.name;
      });
      // Lấy ra những item không có trong mảng posDEP so với all quyền
      res = data.data.filter((item) => !filterDataPosDep.includes(item.id));
      res.map((items) => {
        items.actions = [];
      });
      // Lấy ra những quyền thiếu actions
      let resAction = dataByPosDep.filter(
        (item) => !compareArray(filterAction, item.actions)
      );
      const dataArrayLast = res.concat(resAction);
      return [...dataArrayLast];
    } catch (error) {
      return (res = []);
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  confirm = async (id) => {
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
  };

  cancel = (e) => {
    message.error("Không ẩn");
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  handleChangeCrud = (value) => {
    this.setState({
      crud: value,
    });
  };
  handleChangeDepartment = (value) => {
    this.setState({
      dep_id: value,
    });
  };
  handleChangePermission = (value) => {
    this.setState({
      per_id: value,
    });
  };
  handleChangeAction = (value) => {
    this.setState({
      action: value,
    });
  };
  handlePagination = async (pagination) => {
    let data = await getListPosition(pagination);
    this.setState({
      data,
    });
  };
  showDepartment = () => {
    if (this.state.dataDepartment) {
      return this.state.dataDepartment.data.map((element) => {
        return (
          <Option key={element.id} value={element.id}>
            {element.dep_name}
          </Option>
        );
      });
    }
  };
  showPermission = () => {
    if (this.state.dataPermission) {
      return this.state.dataPermission.map((element) => {
        return (
          <Option key={element.id} value={element.id}>
            {element.name}
          </Option>
        );
      });
    }
  };
  showAction = () => {
    const { action } = this.state;
    let OPTIONS = this.state.option;
    if (this.state.dataAction) {
      this.state.dataAction.map((item) => {
        OPTIONS.push(item.name);
      });
      const filteredOptions = OPTIONS.filter((o) => !action.includes(o));
      return filteredOptions.map((item) => (
        <Option key={item.id} value={item.id.toString()}>
          {item.name}
        </Option>
      ));
    }
  };

  handleFocusCrud = () => {
    this.setState({
      dep_id: null,
      per_id: null,
      action: [],
      crud: null,
    });
  };
  handleFocusDepartment = () => {
    this.setState({
      dep_id: null,
      per_id: null,
    });
  };
  handleFocusPermission = () => {
    this.setState({
      per_id: null,
    });
  };
  render() {
    const { action } = this.state;
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
            <Tag
              className="table-action"
              onClick={() => this.showModalPosition(text)}
            >
              Gán quyền
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
        <Modal
          title="Gán quyền"
          visible={this.state.visible}
          onOk={this.handleSubmitPermission}
          onCancel={this.hideModal}
          style={{ width: "200px" }}
        >
          <form method="POST">
            <div className="select-span-table">
              <span>Chọn thao tác</span>
              <Select
                value={this.state.crud}
                onChange={this.handleChangeCrud}
                onFocus={this.handleFocusCrud}
              >
                <Option value="1">Thêm quyền</Option>
                <Option value="2">Xóa quyền</Option>
              </Select>
            </div>
            <div className="select-span-table">
              <span>Chọn phòng ban :</span>
              <Select
                showSearch
                value={this.state.dep_id}
                placeholder="Chọn phòng ban"
                onChange={this.handleChangeDepartment}
                onFocus={this.handleFocusDepartment}
              >
                {this.showDepartment()}
              </Select>
            </div>
            <div className="select-span-table">
              <span>Chọn quyền :</span>
              <Select
                value={this.state.per_id}
                onChange={this.handleChangePermission}
                onFocus={this.handleFocusPermission}
              >
                {this.showPermission()}
              </Select>
            </div>
            <div className="select-span-table">
              <span>Chọn Action :</span>
              <Select
                mode="multiple"
                value={this.state.action}
                onChange={this.handleChangeAction}
              >
                {this.showAction()}
              </Select>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default connect(null, null)(TablePosition);
