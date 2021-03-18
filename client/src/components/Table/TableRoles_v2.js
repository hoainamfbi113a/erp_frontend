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
      dep_idUpdate: null,
      dos_idUpdate: null,
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
      disabledSelected: false,
      selectedBegin: [],
    };
  }
  componentDidMount = () => {
    this.fetchData();
    this.getMock();
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
  showModalAssign = async (dep_id, pos_id, dep_name, pos_name) => {
    this.props.showModal();
    this.setState({
      dep_id: dep_name,
      pos_id: pos_name,
      dep_idUpdate: dep_id,
      pos_idUpdate: pos_id,
      disabledSelected: true,
    });
    let dataRight = [];
    await axiosConfig
      .get(
        `/api/permission/departments/positions?dep_id=${dep_id}&pos_id=${pos_id}`
      )
      .then((res) => {
        dataRight = res;
      });
    let ArrSelected = [];
    for (let item of dataRight) {
      for (let itemChild of item.actions) {
        ArrSelected.push(`${item.id}_${itemChild.id}`);
      }
    }
    this.setState({
      selectedBegin: ArrSelected,
      selected: ArrSelected,
    });

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
    // if (this.state.dep_id != null && value != null) {
    //   this.getMock(this.state.dep_id, value);
    // }
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
    // if (value != null && this.state.pos_id != null) {
    //   this.getMock(value, this.state.pos_id);
    // }
  };
  handleFocusDepartment = () => {
    this.setState({
      dep_id: null,
    });
  };
  getMock = async (dep_id, pos_id) => {
    this.setState({
      disabledSelected: false
    });
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
    this.setState({
      dep_id:"",
      pos_id:"",
      dep_idUpdate:null,
      pos_idUpdate:null,
      selected:[],
      selectedBegin:[],
      disabledSelected:false,
      // dataPermission: null,
      // data:null,
    })
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
  customSelected = (dataSelected) => {
    let data = dataSelected;
    let arrPermission = [];
    for (let item of data) {
      let obj = {
        id: item.split("_")[0],
      };
      arrPermission.push(obj);
    }
    arrPermission = lodash.uniqBy(arrPermission, 'id');
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
    return arrayPerAction;
  };
  handleOk = () => {
    if (this.state.dep_idUpdate !== null && this.state.pos_idUpdate !== null) {
      let arr1 = this.state.selectedBegin;
      let arr2 = this.state.selected;
      let differenceDelete = arr1.filter((x) => !arr2.includes(x));

      let differenceAdd = arr2.filter((x) => !arr1.includes(x));
      let arrPerActionAdd = this.customSelected(differenceAdd);
      let arrPerActionDelete = this.customSelected(differenceDelete);
      if (arrPerActionAdd.length !== 0) {
        const params = {
          dep_id: this.state.dep_idUpdate,
          permissions: arrPerActionAdd,
        };
        axiosConfig
          .post(`/api/position/permission/${this.state.pos_idUpdate}`, params)
          .then((res) => {
            // if (res.message === "Success!. Stored") {
              alert("Chỉnh sửa quyền chức vụ thành công");
              this.handleCancel();
            // }
          })
          .catch((err) => {
            alert("Gán quyền cho chức vụ thất bại");
            this.handleCancel();
            console.log(err);
          });
      }

      if (arrPerActionDelete.length !== 0) {
        const params = {
          dep_id: this.state.dep_idUpdate,
          permissions: arrPerActionDelete,
        };
        axiosConfig
          .post(`/api/position/permissiond/${this.state.pos_idUpdate}`, params)
          .then((res) => {
          })
          .catch((err) => {
            alert("Xoá cho chức vụ thất bại");
            this.handleCancel();
            console.log(err);
          });
      }
    } else {
      let data = this.state.selected;
      let arrPerAction = this.customSelected(data);
      
      const params = {
        dep_id: this.state.dep_id,
        permissions: arrPerAction,
      };
      axiosConfig
        .post(`/api/position/permission/${this.state.pos_id}`, params)
        .then((res) => {
          if (res.message === "Success!. Stored") {
            alert("gán quyền cho chức vụ thành công");
            this.fetchData();
            this.handleCancel();
          }
        })
        .catch((err) => {
          alert("Gán quyền cho chức vụ thất bại");
          this.handleCancel();
          console.log(err);
        });
    }
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
          destroyOnClose={true}
          width={800}
          title="Gán quyền cho chức vụ phòng ban"
          visible={this.props.showModalRoles}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          //   className="modal-transfer-grant-permission"
        >
          <div className="select-grant-role">
            <Select
            
              disabled={this.state.disabledSelected}
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
              disabled={this.state.disabledSelected}
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
