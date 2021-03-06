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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
class TableRoles_v2 extends Component {
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
      optSize: 10,
      pagination: {},
    };
  }

  componentDidMount = () => {
    this.fetchRoles(1, this.state.optSize);
    this.fetchData();
    this.getMock();
  };

  fetchData = async () => {
    let data = await getListAllPosition();
    console.log(data);
    let dataDepartment = await getListAllDepartment();
    console.log(dataDepartment);
    this.setState({
      data,
      dataDepartment,
    });
  };

  fetchRoles = async (page, per_page) => {
    let dataRoles = await getListRole(page, per_page);
    this.setState({
      dataRoles: dataRoles.data,
      pagination: dataRoles.pagination,
    });
    this.props.total(dataRoles.pagination.total);
  };

  showModalAssign = async (dep_id, pos_id, dep_name, pos_name) => {
    this.props.uiActionCreatorsS();

    this.setState({
      dep_id: dep_name,
      pos_id: pos_name,
      dep_idUpdate: dep_id,
      pos_idUpdate: pos_id,
      disabledSelected: true,
    });
    let dataRight;
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
    this.props.showModal();
    this.props.uiActionCreatorsH();
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
            message.success("Ch???nh s???a quy???n ch???c v??? th??nh c??ng");
            this.handleCancel();
            // }
          })
          .catch((err) => {
            message.error("G??n quy???n cho ch???c v??? th???t b???i");
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
              message.success("Xo?? quy???n ch???c v??? th??nh c??ng");
              this.handleCancel();
            }
          })
          .catch((err) => {
            message.error("Xo?? cho ch???c v??? th???t b???i");
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
            message.success("G??n quy???n cho ch???c v??? th??nh c??ng");
            this.fetchData();
            this.handleCancel();
          }
        })
        .catch((err) => {
          message.error("G??n quy???n cho ch???c v??? th???t b???i");
          this.handleCancel();
          console.log(err);
        });
    }
  };

  handlePagination = (page, pageSize) => {
    this.setState({ optSize: pageSize });
    this.fetchRoles(page, pageSize);
  };

  render() {
    let data;
    let pagi;
    if (this.state.dataRoles && this.state.pagination) {
      data = this.state.dataRoles;
      pagi = this.state.pagination;
    }
    //const data = this.state.dataRoles;
    const columns = [
      {
        title: "Ph??ng ban",
        // width: 200,
        dataIndex: "department_name",
        key: "department_name",
        fixed: "left",
      },
      {
        title: "Ch???c danh",
        // width: 200,
        dataIndex: "position_name",
        key: "position_name",
        fixed: "left",
      },
      {
        title: "H??nh ?????ng",
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
                  current: pagi ? pagi.currentPage : 1,
                  total: pagi ? pagi.total : 0,
                  showSizeChanger: true,
                }}
              />
            </div>
          </div>
        </Content>
        <Modal
          destroyOnClose={true}
          width={800}
          title="G??n quy???n cho ch???c v??? ph??ng ban"
          visible={this.props.showModalData}
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
              placeholder="Ch???n ph??ng ban"
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
              placeholder="Ch???n ch???c v???"
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

const mapDispatchToProps = (dispatch) => ({
  uiActionCreatorsS: bindActionCreators(showLoading, dispatch),
  uiActionCreatorsH: bindActionCreators(hideLoading, dispatch),
});

export default connect(null, mapDispatchToProps)(TableRoles_v2);
