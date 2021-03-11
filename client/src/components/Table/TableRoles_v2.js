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
  showModalAssign = async () => {};
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
    console.log(this.state.dataPermission)
    for(let item of this.state.dataPermission) {
        console.log(item)
        let arrAction = []
        for(let itemChild of item.actions) {
           let objChild = {
                label: itemChild.note,
                value: `${item.id}_${itemChild.id}`
            }
            arrAction.push(objChild)
        }
        let obj = {
            label: item.name,
            options: arrAction
        }
        arrOption.push(obj);
    }
    console.log(arrOption)
    this.setState({
        dataOptions:arrOption
    })
  };
  handleCancel = () => {
    this.props.hideModal();
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
  onChange = (selected) => {
    this.setState({ selected });
  };
  handleOk = () => {};
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
    const options = this.state.dataOptions
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
