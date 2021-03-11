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
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
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
      selected: ['luna'],
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
  showModalAssign = async () => {
   
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
    const options = [
        {
            label: 'Earth',
            options: [
                { value: 'luna', label: 'Moon' },
            ],
        },
        {
            label: 'Mars',
            options: [
                { value: 'phobos', label: 'Phobos' },
                { value: 'deimos', label: 'Deimos' },
            ],
        },
        {
            label: 'Jupiter',
            options: [
                { value: 'io', label: 'Io' },
                { value: 'europa', label: 'Europa' },
                { value: 'ganymede', label: 'Ganymede' },
                { value: 'callisto', label: 'Callisto' },
            ],
        },
    ];
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
