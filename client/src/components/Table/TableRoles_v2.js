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
  Button,
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
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
export default class TableRoles_v2 extends Component {
  constructor(props) {
    super(props);
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
      selected: [],
      dataOptions: [],
    };
  }
  componentDidMount = () => {
    this.fetchData();
    // this.props.setClick(this.showModalAssign);
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
  };
  showModalAssign = async (dep_id, pos_id) => {
    this.props.showModal();
    let dataRight = [];
    await axiosConfig
      .get(
        `/api/permission/departments/positions?dep_id=${dep_id}&pos_id=${pos_id}`
      )
      .then((res) => {
        dataRight = res;
      });
    console.log(dataRight)
    // arrSelected 
    let ArrSelected = [];
    for (let item of dataRight) {
      for (let itemChild of item.actions) {
        console.log(itemChild)
        ArrSelected.push(`${item.id}_${itemChild.id}`);
      }
    }
    // console.log(ArrSelected)

    await axiosConfig
      .get("/api/list/permission/actions")
      .then((res) => {
        this.setState({
          dataPermission: res,
        });
      })
      .catch((er) => {
        console.log(err);
      });

    
    let arrOption = [];
    for (let item of this.state.dataPermission) {
      let arrAction = [];
      for (let itemChild of item.actions) {
        let objChild = {
          label: itemChild.note,
          value: `${item.id}_${itemChild.id}`,
        };
        arrAction.push(objChild);
      }
      let obj = {
        label: item.name,
        options: arrAction,
      };
      arrOption.push(obj);
    }
    this.setState({
      dataOptions: arrOption,
    });
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
  getMock = async (dep_id, pos_id) => {
    await axiosConfig
      .get("/api/list/permission/actions")
      .then((res) => {
        this.setState({
          dataPermission: res,
        });
      })
      .catch((er) => {
        console.log(err);
      });
    let arrOption = [];
    for (let item of this.state.dataPermission) {
      let arrAction = [];
      for (let itemChild of item.actions) {
        let objChild = {
          label: itemChild.note,
          value: `${item.id}_${itemChild.id}`,
        };
        arrAction.push(objChild);
      }
      let obj = {
        label: item.name,
        options: arrAction,
      };
      arrOption.push(obj);
    }
    this.setState({
      dataOptions: arrOption,
    });
  };
  handleCancel = () => {
    this.props.hideModal();
  };
  showDepartment = () => {
    let pos_id = this.state.pos_id;
    let arrayPosExist = [];
    if (this.state.dataRoles !== null && this.state.dataDepartment !== null) {
      for (let item of this.state.dataRoles) {
        if (pos_id === item.pos_id) {
          arrayPosExist.push(item.dep_id);
        }
      }
      let difference = this.state.dataDepartment.data.filter(
        (x) => !arrayPosExist.includes(x.id)
      );
      return difference.map((element) => {
        return (
          <Option key={element.id} value={element.id}>
            {element.dep_name}
          </Option>
        );
      });
    }
  };
  showPosition = () => {
    let dep_id = this.state.dep_id;
    let arrayPosExist = [];
    if (this.state.dataRoles !== null && this.state.data !== null) {
      for (let item of this.state.dataRoles) {
        if (dep_id === item.dep_id) {
          arrayPosExist.push(item.pos_id);
        }
      }
      let difference = this.state.data.data.filter(
        (x) => !arrayPosExist.includes(x.id)
      );
      return difference.map((element) => {
        return (
          <Option key={element.id} value={element.id}>
            {element.pos_name}
          </Option>
        );
      });
    }
  };
  onChange = (selected) => {
    this.setState({ selected });
  };
  handleOk = () => {
    let data = this.state.selected;
    let arrPermission = [];
    for (let item of data) {
      for (let itemChild of arrPermission) {
        if (itemChild.id && itemChild.id === item.split("_")[0]) {
          break;
        } else {
          let obj = {
            id: item.split("_")[0],
          };
          arrPermission.push(obj);
        }
      }
      if (arrPermission.length === 0) {
        let obj = {
          id: item.split("_")[0],
        };
        arrPermission.push(obj);
      }
    }
    // console.log(arrPermission)
    let arrayPerAction = [];
    for (let itemPer of arrPermission) {
      let arrAction = [];
      for (let item of data) {
        if (item.split("_")[0] === itemPer.id) {
          arrAction.push(item.split("_")[1]);
        }
      }
      let obj = {
        id: itemPer.id,
        actions: arrAction,
      };
      arrayPerAction.push(obj);
    }
    const params = {
      dep_id: this.state.dep_id,
      permissions: arrayPerAction,
    };
    axiosConfig
      .post(`/api/position/permission/${this.state.pos_id}`, params)
      .then((res) => {
        console.log(res);
        if (res.message === "Success!. Stored") {
          alert("gán quyền cho chức vụ thành công");
          this.handleCancel();
        }
      })
      .catch((err) => {
        alert("Gán quyền cho chức vụ thất bại");
        this.handleCancel();
        console.log(err);
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
        dataIndex: "dep_id",
        fixed: "right",
        render: (text, row) => (
          <Space size="middle">
            <Tag
              onClick={() =>
                this.showModalAssign(
                  text,
                  row.pos_id,
                  row.department_name,
                  row.position_name
                )
              }
              color="geekblue"
              className="table-action"
            >
              Update
            </Tag>
          </Space>
        ),
      },
    ];
    const options = this.state.dataOptions;
    const { selected } = this.state;
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
          //   className="modal-transfer-grant-permission"
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
          <DualListBox
            options={options}
            selected={selected}
            onChange={this.onChange}
          />
        </Modal>
      </div>
    );
  }
}
