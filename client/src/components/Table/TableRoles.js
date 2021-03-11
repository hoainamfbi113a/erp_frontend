import {
  Layout,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Transfer,
  Tree,
} from "antd";
import axiosConfig from "apis/axios";
import { getListPosition } from "apis/positionApi";
import { getListRole } from "apis/roleApi";
import axios from "axios";
import lodash from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import "../../App/App.css";
import "./Table.css";
const { Option } = Select;
const { Content } = Layout;
class TableRoles extends Component {
  constructor(props) {
    super(props);
    this.showModalAssign = this.showModalAssign.bind(this);
    this.state = {
      dataDepartment: null,
      dataRoles: null,
      dep_id: null,
      dos_id: null,
      modalAssign: false,
      id: "",
      idPosition: "",
      app_id: "99",
      name: "",
      status: 1,
      data: null,
      dataPermission: null,
      dataAction: [],
      mockData: [],
      targetKeys: [],
      moveKeys: [],
      arrCheckedAction: [],
    };
  }

  componentDidMount = () => {
    this.fetchData();
    this.props.setClick(this.showModalAssign);
  };
  fetchData = async () => {
    let data = await getListPosition(1);
    this.setState({
      data,
    });
    let dataRoles = await getListRole();
    this.setState({
      dataRoles,
    });
    // await axiosConfig.get("/api/action").then((res) => {
    //   this.setState({
    //     dataAction: res.data,
    //   });
    // });
  };
  getMock = async (dep_id, pos_id) => {
    const targetKeys = [];
    const mockData = [];
    axiosConfig
      .get("/api/list/permission/actions")
      .then((res) => {
        this.setState({
          dataPermission: res,
        });
      })
      .catch((er) => {
        console.log(err);
      });
    let dataRight = [];
    await axiosConfig
      .get(
        `/api/permission/departments/positions?dep_id=${dep_id}&pos_id=${pos_id}`
      )
      .then((res) => {
        dataRight = res;
      });
    // var arrAll = this.state.dataAction.map((obj) => ({
    //   key: obj.id + Math.random(),
    //   id: obj.id,
    //   title: obj.name,
    // }));
    var arrRight = dataRight.map((obj) => ({
      key: obj.id,
      id: obj.id,
      title: obj.actions.map((objChild) => ({
        title: objChild,
        key: obj.id,
        parentId: obj.id,
      })),
    }));
    let arrPermission = this.state.dataPermission;
    for (let i = 0; i < arrPermission.length; i++) {
      let arrAction = [];
      for (let itemAction of arrPermission[i].actions) {
        let obj = {
          title: itemAction.note,
          key: i.toString() + itemAction.id.toString(),
        };
        arrAction.push(obj);
      }
      const data = {
        key: `${this.state.dataPermission[i].id}`,
        title: `${this.state.dataPermission[i].name}`,
        id: `${this.state.dataPermission[i].id}`,
        children: arrAction,
      };
      // for (let j = 0; j < dataRight.length; j++) {
      //   if (dataRight[j].id == this.state.dataPermission[i].id) {
      //     let arrRightAction = [];
      //     for (const value of arrRight) {
      //       if (value.id === dataRight[j].id) {
      //         arrRightAction = lodash.intersectionBy(
      //           data.children,
      //           value.title,
      //           "title"
      //         );
      //       }
      //     }
      //     let dataClone = {
      //       key: `${this.state.dataPermission[i].id} clone`,
      //       title: `${this.state.dataPermission[i].name}`,
      //       id: `${this.state.dataPermission[i].id}`,
      //       children: arrRightAction,
      //     };
      //     targetKeys.push(dataClone.key);
      //     mockData.push(dataClone);
      //   }
      // }
      // format child Action left
      // for (let j = 0; j < dataRight.length; j++) {
      //   if (dataRight[j].id == this.state.dataPermission[i].id) {
      //     for (const value of arrRight) {
      //       if (value.id === dataRight[j].id) {
      //         const arrTemp = lodash.differenceBy(
      //           data.children,
      //           value.title,
      //           "title"
      //         );
      //         data.children = arrTemp;
      //       }
      //     }
      //   }
      // }
      mockData.push(data);
    }

    this.setState({ mockData, targetKeys });
  };
  onSelect = (selectedKeys, info) => {};

  onCheck = (checkedKeys, info) => {
    let arrCheckedById = [];
    for (let value of info.checkedNodes) {
      if (typeof value.id === "number") arrCheckedById.push(value.id);
    }
    this.setState({
      arrCheckedAction: arrCheckedById,
    });
  };
  renderItem = (item) => {
    let treeData = [];
    treeData.push(item);
    const customLabel = (
      <div>
        <span className="custom-item" onClick={this.handleStop}>
          <Tree
            className="tree-transfer"
            checkable
            onSelect={this.onSelect}
            onCheck={this.onCheck}
            treeData={treeData}
          />
        </span>
      </div>
    );

    return {
      label: customLabel, // for displayed item
      // value: item.title, // for title and filter matching
    };
  };
  handleStop = (e) => {
    e.stopPropagation();
  };
  hideModal = () => {
    this.props.hideModal();
  };
  showModal = (id) => {
    let role = this.state.data.data.filter((item) => {
      return item.id == id;
    });
    this.setState({
      id: role[0].id,
      name: role[0].name,
      status: role[0].status,
    });
    this.props.showModal();
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChange = async (targetKeys, direction, moveKeys) => {
    if (this.state.arrCheckedAction.length === 0) {
      alert("action không được để trống");
      return;
    }
    for (let item of moveKeys) {
      item.replace(" clone", "");
    }
    // let res =;
    console.log(moveKeys);
    // const params = {
    //     dep_id: this.state.dep_id,
    //     permissions: res,
    //     actions: this.state.arrCheckedAction,
    //   };
    // if (direction === "right") {
    //   const data = await axiosConfig.post(
    //     `/api/position/permission/${this.state.pos_id}`,
    //     params
    //   );
    //   if (data.message === "Success!. Stored") {
    //     message.success("Thêm quyền thành công");
    //     this.getMock(this.state.dep_id, this.state.pos_id);
    //   } else {
    //     message.error("Thêm quyền thất bại");
    //   }
    // } else {
    //   const data = await axiosConfig.post(
    //     `/api/position/permissiond/${this.state.pos_id}`,
    //     params
    //   );
    //   if (data.message === "Success!. Removed") {
    //     message.success("Xóa quyền thành công");
    //     this.getMock(this.state.dep_id, this.state.pos_id);
    //   } else {
    //     message.error("Xóa quyền thất bại");
    //   }
    // }
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  showModalAssign = async () => {
    axiosConfig
      .get(`/api/departments?per_page=100`)
      .then((res) => {
        this.setState({
          dataDepartment: res,
        });
      })
      .catch((error) => {
        console.log("False to load API", error);
      });
    let data = await getListPosition(1);
    this.setState({
      data,
    });
    // this.setState({
    //   modalAssign: true,
    //   idPosition: id,
    // });
    // this.getMock(id);
  };
  handleCancel = () => {
    this.props.hideModal();
  };
  onChangeCheckBoxAction = (checkedValues) => {
    this.setState({
      checkedValues: checkedValues,
    });
  };
  handlePagination = async (pagination) => {
    try {
      const data = await axiosConfig.get(`/api/role?page=${pagination}`);
      this.setState({
        data: data,
      });
    } catch (error) {
      console.log("False to load API", error);
    } finally {
    }
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
  handleChangeDepartment = (value) => {
    this.setState({
      dep_id: value,
    });
    if (value != null && this.state.pos_id != null) {
      this.getMock(value, this.state.pos_id);
    }
  };
  handleFocusDepartment = () => {
    this.setState({
      dep_id: null,
    });
  };
  showPosition = () => {
    if (this.state.data) {
      return this.state.data.data.map((element) => {
        return (
          <Option key={element.id} value={element.id}>
            {element.pos_name}
          </Option>
        );
      });
    }
  };
  handleChangePosition = (value) => {
    this.setState({
      pos_id: value,
    });
    if (this.state.dep_id != null && value != null) {
      this.getMock(this.state.dep_id, value);
    }
  };
  handleFocusPosition = () => {
    this.setState({
      pos_id: null,
    });
  };
  render() {
    let data = "";
    if (this.state.dataRoles) {
      data = this.state.dataRoles;
    }
    const columns = [
      {
        title: "Phòng ban",
        width: 200,
        dataIndex: "department_name",
        key: "department_name",
        fixed: "left",
      },
      {
        title: "Chức danh",
        width: 200,
        dataIndex: "position_name",
        key: "position_name",
        fixed: "left",
      },
      {
        title: "Hành động",
        key: "operation",
        dataIndex: "id",
        fixed: "right",
        render: (text, row) => (
          <Space size="middle">
            <Tag
              onClick={() => this.showModalAssign(text)}
              color="geekblue"
              className="table-action"
            >
              Update
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
                }}
              />
            </div>
          </div>
        </Content>
        <Modal
          width={800}
          title="assign permission to role"
          visible={this.props.showModalRoles}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="modal-transfer-grant-permission"
        >
          <div className="select-grant-role">
            <Select
              className="select-department-grant"
              showSearch
              value={this.state.dep_id}
              placeholder="Chọn phòng ban"
              onChange={this.handleChangeDepartment}
              onFocus={this.handleFocusDepartment}
            >
              {this.showDepartment()}
            </Select>
            <Select
              className="select-department-grant"
              showSearch
              value={this.state.pos_id}
              placeholder="Chọn chức vụ"
              onChange={this.handleChangePosition}
              onFocus={this.handleFocusPosition}
            >
              {this.showPosition()}
            </Select>
          </div>
          <Transfer
            dataSource={this.state.mockData}
            listStyle={{
              width: 400,
              height: 400,
            }}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={this.renderItem}
          />
        </Modal>
      </div>
    );
  }
}

export default connect(null, null)(TableRoles);
