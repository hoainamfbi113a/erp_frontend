import { Layout, message, Modal, Select, Space, Table, Tag } from "antd";
import axiosConfig from "apis/axios";
import { getListAllPosition } from "apis/positionApi";
import { getListAllDepartment } from "apis/departmentApi";
import { getListRole } from "apis/roleApi";
import { allPermission } from "apis/permissionApi";
import lodash from "lodash";
import React, { Component } from "react";
import "../../App/App.css";
import "./Table.css";
const { Option } = Select;
const { Content } = Layout;
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  RightOutlined,
  LeftOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { AllPermissionGroup } from "../../helpers/DataHelper";
export default class TableRoles_v2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDepartment: null,
      dataRoles: null,
      dep_id: null,
      pos_id: null,
      dep_idUpdate: null,
      pos_idUpdate: null,
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
  };
  fetchData = async () => {
    let data = await getListAllPosition();
    let dataRoles = await getListRole();
    let dataDepartment = await getListAllDepartment();
    this.setState({
      data,
      dataDepartment,
      dataRoles,
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
    let dataRight;
    console.log(this.state.dataRoles);
    await axiosConfig
      .get(
        `/api/permission/departments/positions?dep_id=${dep_id}&pos_id=${pos_id}`
      )
      .then((res) => {
        dataRight = res;
      });
    let ArrSelected = [];
    for (const property in dataRight) {
      for (const item of dataRight[property].groups) {
        for (const itemChild of item.permissions) {
          ArrSelected.push(itemChild.id);
        }
      }
    }
    this.setState({
      selected: ArrSelected,
      selectedBegin: ArrSelected,
    });
    
  };
  handleChangePosition = (value) => {
    this.setState({
      pos_id: value,
    });
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
  };
  handleFocusDepartment = () => {
    this.setState({
      dep_id: null,
    });
  };
  getMock = async (dep_id, pos_id) => {
    this.setState({
      disabledSelected: false,
    });
    let data = await allPermission();
    console.log(data);
    if (!data.err) {
      this.setState({
        dataOptions: AllPermissionGroup(data),
      });
    }
  };
  handleCancel = () => {
    this.props.hideModal();
    this.setState({
      dep_id: "",
      pos_id: "",
      dep_idUpdate: null,
      pos_idUpdate: null,
      selected: [],
      selectedBegin: [],
      disabledSelected: false,
    });
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
    arrPermission = lodash.uniqBy(arrPermission, "id");
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
    console.log(this.state.pos_idUpdate);
    if (this.state.dep_idUpdate !== null && this.state.pos_idUpdate !== null) {
      let arr1 = this.state.selectedBegin;
      let arr2 = this.state.selected;
      let differenceDelete = arr1.filter((x) => !arr2.includes(x));

      let differenceAdd = arr2.filter((x) => !arr1.includes(x));
      console.log(this.state.pos_idUpdate);

      if (differenceAdd.length !== 0) {
        const params = {
          dep_id: this.state.dep_idUpdate,
          permissions: differenceAdd,
        };
        axiosConfig
          .post(`/api/position/permission/${this.state.pos_idUpdate}`, params)
          .then((res) => {
            // if (res.message === "Success!. Stored") {
            message.success("Chỉnh sửa quyền chức vụ thành công");
            this.handleCancel();
            // }
          })
          .catch((err) => {
            message.error("Gán quyền cho chức vụ thất bại");
            this.handleCancel();
            console.log(err);
          });
      }

      if (differenceDelete.length !== 0) {
        const params = {
          dep_id: this.state.dep_idUpdate,
          permissions: differenceDelete,
        };
        axiosConfig
          .post(`/api/position/permissiond/${this.state.pos_idUpdate}`, params)
          .then((res) => {
            if (res.message == "Success!. Removed") {
              message.success("Xoá quyền chức vụ thành công");
              this.handleCancel();
            }
          })
          .catch((err) => {
            message.error("Xoá cho chức vụ thất bại");
            this.handleCancel();
            console.log(err);
          });
      }
    } else {

      const params = {
        dep_id: this.state.dep_id,
        permissions: this.state.selected,
      };
      axiosConfig
        .post(`/api/position/permission/${this.state.pos_id}`, params)
        .then((res) => {
          if (res.message === "Success!. Stored") {
            message.success("Gán quyền cho chức vụ thành công");
            this.fetchData();
            this.handleCancel();
          }
        })
        .catch((err) => {
          message.error("Gán quyền cho chức vụ thất bại");
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
        // width: 200,
        dataIndex: "department_name",
        key: "department_name",
        fixed: "left",
      },
      {
        title: "Chức danh",
        // width: 200,
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
            icons={{
              moveLeft: <LeftOutlined />,
              moveAllLeft: [
                <DoubleLeftOutlined />,
                <span key={1} className="fa fa-chevron-left" />,
              ],
              moveRight: <RightOutlined />,
              moveAllRight: [
                <DoubleRightOutlined />,
                <span key={1} className="fa fa-chevron-right" />,
              ],
            }}
          />
        </Modal>
      </div>
    );
  }
}
