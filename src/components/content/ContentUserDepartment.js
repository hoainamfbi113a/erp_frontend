import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Select } from "antd";
import { Button, Modal, DatePicker } from "antd";
import axios from "axios";
import * as userDepartmentActions from "../../actions/userDepartmentAction";
import * as userBaseActions from "../../actions/userBaseAction";
import TableUserDepartment from "../Table/TableUserDepartment";
import "./Content.css";
const { Search } = Input;
const { Option } = Select;
class ContentUserDepartment extends Component {
  state = {
    visible: false,
    id: "",
    name: "",
    position: "",
    appointment_date: "",
    data: [],
    dataUser: [],
    value: undefined,
    errors: {},
  };
  componentDidMount() {
    const { userBaseActionCreators } = this.props;
    const { fetchListUserBase } = userBaseActionCreators;
    const { userDepartmentActionCreators } = this.props;
    const { fetchListUserDepartment } = userDepartmentActionCreators;
    fetchListUserBase();
    fetchListUserDepartment();
  }
  handleSearch = (value) => {
    if (value) {
      this.setState({
        data: this.state.dataUser.filter((item) => {
          return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        }),
      });
    } else {
      this.setState({ data: [] });
    }
  };
  handleChange = (value) => {
    this.setState({ value });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeAppointmentDate = (date, dateString) => {
    this.setState({
      appointment_date: dateString,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { _id, name, position, appointment_date } = this.state;
    let formData = {};
    formData.name = name;
    formData.position = position;
    formData.appointment_date = appointment_date;
    for (var value of this.state.dataUser) {
      if (value.name === name) {
        formData.id = value.id;
        break;
      }
    }
    axios.post("http://localhost:3000/departments", formData);
  };
  showModal = () => {
    this.setState({
      visible: true,
    //   dataUser,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {9
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    if(this.props.userBase.listUserBase.length !==0){
        this.state.dataUser = this.props.userBase.listUserBase;
    }
    const options = this.state.data.map((d) => (
      <Option key={d.id}>{d.name}</Option>
    ));
    return (
      <div>
        <div className="content-top">
          <div className="content-top-left">
            <div className="content-top-left-sum-item">600 nhân viên</div>
            <Search
              placeholder="Tìm kiếm"
              allowClear
              onSearch={this.onSearch}
              style={{ width: 200 }}
              className="table-btn-search"
            />
          </div>
          <div className="content-top-right">
            <Button onClick={this.showModal} className="btn-add-user">
              Thêm phòng ban cho nhân viên
            </Button>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className="tabs-main-right">
                <form
                  className="form-horizontal"
                  noValidate
                  onSubmit={this.onSubmit}
                  method="post"
                >
                  <div className="tabs-main-left-content">
                    <div className="tabs-main-left">
                      <ul className="tabs-main-left-ul">
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-left">
                            Tên nhân viên:
                          </span>
                          <div className="tabs-user-infor-right">
                            {/* <Input placeholder="Basic usage" /> */}
                            <Select
                              style={{ width: 350 }}
                              showSearch
                              value={this.state.value}
                              placeholder={this.props.placeholder}
                              style={this.props.style}
                              defaultActiveFirstOption={false}
                              showArrow={false}
                              filterOption={false}
                              onSearch={this.handleSearch}
                              onChange={this.handleChange}
                              notFoundContent={null}
                            >
                              {options}
                            </Select>
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-left">
                            Tên phòng ban:
                          </span>
                          <div className="tabs-user-infor-right">
                            {/* <Input placeholder="Basic usage" /> */}
                            <Input
                              name="name"
                              onChange={this.onChange}
                              placeholder="Tên phòng ban của nhân viên"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-left">
                            Chức vụ của nhân viên:
                          </span>
                          <div className="tabs-user-infor-right">
                            <Input
                              name="position"
                              onChange={this.onChange}
                              placeholder="Chức vụ của nhân viên"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-left">
                            Ngày gia nhập phòng ban:
                          </span>
                          <div className="tabs-user-infor-right tabs-user-infor-right-date">
                            <DatePicker
                            placeholder="Chọn ngày"
                              style={{ width: 350 }}
                              onChange={this.onChangeAppointmentDate}
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <Button htmlType="submit" className="btn-add-user">
                            Gửi thông tin
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
        <TableUserDepartment userDepartments = {this.props.userDepartment.listUserDepartment} />
      </div>
      // <div>aaaa</div>
    );
  }
}
const mapStateToProps = (state) => ({
  userBase: state.userBaseReducer,
  userDepartment: state.userDepartmentReducer
});
const mapDispatchToProps = (dispatch) => ({
  userBaseActionCreators: bindActionCreators(userBaseActions, dispatch),
  userDepartmentActionCreators: bindActionCreators(userDepartmentActions,dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentUserDepartment);
