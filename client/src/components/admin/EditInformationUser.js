import React, { Component } from "react";
import { Input, DatePicker, Radio, Button, message } from "antd";
import { Link } from "react-router-dom";
import axiosConfig from "../../apis/axios";
import moment from "moment";

import Axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as uiActions from "../../actions/ui";
import { Steps } from "antd";
const { Step } = Steps;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
class NotifiDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      STATUS_PROFILE: -1,
      id: null,
      pro_name: null,
      pro_pen_name: null,
      pro_birth_day: null,
      pro_gender: 2,
      pro_birth_place: null,
      pro_home_town: null,
      pro_local_phone: null,
      pro_resident: null,
      pro_ethnic: null,
      pro_religion: null,
      pro_background_origin: null,
      pro_occupation: null,
      pro_identity_card: null,
      pro_identity_card_when: null,
      pro_identity_card_where: null,
      dep_name: null,
      dep_position: null,
      dep_appointment_date: null,
      deg_type: null,
      deg_diploma: null,
      deg_majors: null,
      deg_school_name: null,
      deg_begin_study: null,
      deg_end_study: null,
      work_formality: null,
      car_number: null,
      car_number_day: null,
      car_begin: null,
      car_end: null,
      idDepartment: null,
      idUserDegree: null,
      idWorkObject: null,
      idJou: null,
    };
  }
  componentDidMount = async () => {
    this.props.uiActionCreators.showLoading();
    await this.fetchData();
    setTimeout(() => {
      this.props.uiActionCreators.hideLoading();
    }, 1000);
  };
  onSubmit = async (e) => {
    e.preventDefault();
    this.props.uiActionCreators.showLoading();
    const tokenID = localStorage.getItem("tokenID");
    let from_item_id = 0;
    let to_item_id = 0;
    let arrLog = [];
    let messageErr = 0;
    await Axios.get(`/api/transfers`)
      .then((res) => {
        arrLog = res.data.data;
      })
      .catch((err) => {
        messageErr = 1;
        console.log(err);
      });
    for (let item of arrLog) {
      if (item.user_id === tokenID) {
        if (item.to_item_id > to_item_id) {
          to_item_id = item.to_item_id;
        }
      }
    }
    for (let item of arrLog) {
      if (item.to_item_id == to_item_id) {
        from_item_id = item.from_item_id;
      }
    }
    let params = {
      pro_name: this.state.pro_name,
      pro_pen_name: this.state.pro_pen_name,
      pro_birth_day: Date.parse(this.state.pro_birth_day) / 1000,
      pro_gender: this.state.pro_gender,
      pro_birth_place: this.state.pro_birth_place,
      pro_home_town: this.state.pro_home_town,
      pro_local_phone: this.state.pro_local_phone,
      pro_resident: this.state.pro_resident,
      pro_ethnic: this.state.pro_ethnic,
      pro_religion: this.state.pro_religion,
      pro_background_origin: this.state.pro_background_origin,
      pro_occupation: this.state.pro_occupation,
      pro_identity_card: this.state.pro_identity_card,
      pro_identity_card_when:
        Date.parse(this.state.pro_identity_card_when) / 1000,
      pro_identity_card_where: this.state.pro_identity_card_where,
      current_user_id: tokenID,
      user_id: this.props.match.params.id,
    };
    await axiosConfig
      .put(`/api/profiles/${this.state.id}`, params)
      .then((res) => {
        if (res.data.message == "Success!. Updated") {
        } else {
          messageErr = 2;
        }
      })
      .catch(() => {
        messageErr = 3;
      });
    await this.fetchData();
    console.log(messageErr);
    if (messageErr == 0) {
      message.success("Cập nhât thông tin thành công");
    } else {
      message.error("Cập nhật thất bại");
    }
  };
  handleClick = (id) => {
    this.setState({ activeLink: id });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeSex = (e) => {
    this.setState({
      pro_gender: e.target.value,
    });
  };
  onChangeBirthDay = (e, dateString, name) => {
    this.setState({
      [name]: dateString,
    });
  };
  onChangeRange = (e, dateString, name1, name2) => {
    this.setState({
      [name1]: dateString[0],
      [name2]: dateString[1],
    });
  };
  async fetchData() {
    let idUser = this.props.match.params.id;
    let dataUser = null;
    await axiosConfig
      .post(`/api/fe/profiles/user`, {
        id: idUser,
      })
      .then(async (res) => {
        dataUser = res.data;
        let pro_id = res.data.id;
        Axios.get(`/api/transfers/profiles/${pro_id}`).then((res) => {
          this.setState({
            STATUS_PROFILE: res.data.data.after_status,
          });
        });
        const data = dataUser;
        this.setState({
          id: data.id,
          pro_name: data.pro_name,
          pro_pen_name: data.pro_pen_name,
          pro_birth_day: data.pro_birth_day,
          pro_gender: data.pro_gender,
          pro_birth_place: data.pro_birth_place,
          pro_home_town: data.pro_home_town,
          pro_local_phone: data.pro_local_phone,
          pro_resident: data.pro_resident,
          pro_ethnic: data.pro_ethnic,
          pro_religion: data.pro_religion,
          pro_background_origin: data.pro_background_origin,
          pro_occupation: data.pro_occupation,
          pro_identity_card: data.pro_identity_card,
          pro_identity_card_when: data.pro_identity_card_when,
          pro_identity_card_where: data.pro_identity_card_where,
          dep_name: data.department.data.dep_name,
          dep_position: data.department.data.dep_position,
          dep_appointment_date: new Date(
            data.department.data.dep_appointment_date
          ),
          deg_type: data.userDegree.data.deg_type,
          deg_diploma: data.userDegree.data.deg_diploma,
          deg_majors: data.userDegree.data.deg_majors,
          deg_school_name: data.userDegree.data.deg_school_name,
          deg_begin_study: new Date(
            data.userDegree.data.deg_begin_study * 1000
          ),
          deg_end_study: new Date(data.userDegree.data.deg_end_study * 1000),
          work_formality: data.workObject.data.formality,
          car_number: data.journalistCard.data.car_number,
          car_number_day: new Date(data.journalistCard.data.car_number_day),
          car_begin: new Date(data.journalistCard.data.car_begin * 1000),
          car_end: new Date(data.journalistCard.data.car_end * 1000),
          idDepartment: data.department.data.id,
          idUserDegree: data.userDegree.data.id,
          idWorkObject: data.workObject.data.id,
          idJou: data.journalistCard.data.id,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  handleConfirm = async () => {
    let idUser = this.props.match.params.id;
    const tokenID = localStorage.getItem("tokenID");
    let pro_id = 0;
    await axiosConfig.post(`/api/fe/profiles/user`, {
      id: idUser,
    })
      .then(async (res) => {
        const data = res.data;
        pro_id = data.id;
      })
      .catch((err) => {
        console.log(err);
      });
    await axiosConfig.put(`/api/profiles/${pro_id}`, {
      current_user_id: tokenID,
      user_id: idUser,
      reject: 0,
    }).then((res) => {
      if (res.data.message) {
        message.success("Duyệt thông tin nhân sự thành công");
        window.location.reload();
      }
    });
  };
  handleReject = async () => {
    let idUser = this.props.match.params.id;
    const tokenID = localStorage.getItem("tokenID");
    let pro_id = 0;
    await axiosConfig.post(`/api/fe/profiles/user`, {
      id: idUser,
    })
      .then(async (res) => {
        const data = res.data;
        pro_id = data.id;
        console.log(pro_id)
      })
      .catch((err) => {
        console.log(err);
      });

    await axiosConfig.put(`/api/profiles/${pro_id}`, {
      current_user_id: tokenID,
      user_id: idUser,
      reject: 1,
    }).then((res) => {
      console.log(res)
      if (res.message) {
        message.success("Từ chối thông tin nhân sự thành công");
        window.location.reload();
      }
    });
  };
  render() {
    let value = 1;
    if (this.state.STATUS_PROFILE == 1) {
      value = 3;
    } else if (
      this.state.STATUS_PROFILE == 2 ||
      this.state.STATUS_PROFILE == 5
    ) {
      value = 1;
    } else if (this.state.STATUS_PROFILE == 3) {
      value = 2;
    } else {
      value = 0;
    }
    return (
      <div className="content-background2" style={{ width: "100%" }}>
        <Steps current={value} size="small" className="process-work-flow">
          <Step title="Nhân sự tạo nhân viên mới" />
          <Step title="Nhân viên vào chỉnh sửa thông tin của mình" />
          <Step title="Nhân sự duyệt" />
          <Step title="Hoàn tất" />
        </Steps>
        {value == 2 ? (
          <li className="tabs-main-left-li">
            <Button
              onClick={this.handleReject}
              className="btn-confirm"
              style={{ marginBottom: "10px", width: "140px" }}
            >
              Không duyệt
            </Button>
            <Button
              onClick={this.handleConfirm}
              htmlType="submit"
              className="btn-no-confirm"
              style={{ marginBottom: "10px", width: "140px" }}
            >
              Duyệt
            </Button>
          </li>
        ) : (
          ""
        )}
        <div style={{ minHeight: "70vh" }} className="edit-infor">
          <div className="edit-infor-tabs">
            <ul>
              {/* <Link to={`/crm/admin/edituser/${tokenID}`}> */}
              <li onClick={() => this.handleClick(1)}>
                <div className={this.state.activeLink === 1 ? "active" : ""}>
                  1
                </div>
                <span className={this.state.activeLink === 1 ? "active" : ""}>
                  Sơ yếu lý lịch
                </span>
              </li>
              {/* </Link> */}
              {/* <Link to="/crm/employee/edit-information/personal-history"> */}
              <li onClick={() => this.handleClick(2)}>
                <div className={this.state.activeLink === 2 ? "active" : ""}>
                  2
                </div>
                <span className={this.state.activeLink === 2 ? "active" : ""}>
                  Lịch sử bản thân
                </span>
              </li>
              {/* </Link> */}
              {/* <Link to="/crm/employee/edit-information/joinDCS"> */}
              <li onClick={() => this.handleClick(3)}>
                <div className={this.state.activeLink === 3 ? "active" : ""}>
                  3
                </div>
                <span className={this.state.activeLink === 3 ? "active" : ""}>
                  Gia nhập Đảng Cộng Sản Việt Nam
                </span>
              </li>
              {/* </Link>
              <Link to="/crm/employee/edit-information/join-TCTTXH"> */}
              <li onClick={() => this.handleClick(4)}>
                <div className={this.state.activeLink === 4 ? "active" : ""}>
                  4
                </div>
                <span className={this.state.activeLink === 4 ? "active" : ""}>
                  Tham gia các tổ chức chính trị, xã hội, các nghề nghiệp
                </span>
              </li>
              {/* </Link>
              <Link to="/crm/employee/edit-information/professional-compensation"> */}
              <li onClick={() => this.handleClick(5)}>
                <div className={this.state.activeLink === 5 ? "active" : ""}>
                  5
                </div>
                <span className={this.state.activeLink === 5 ? "active" : ""}>
                  Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính trị
                  ngoại ngữ
                </span>
              </li>
              {/* </Link>
              <Link to="/crm/employee/edit-information/bonus"> */}
              <li onClick={() => this.handleClick(6)}>
                <div className={this.state.activeLink === 6 ? "active" : ""}>
                  6
                </div>
                <span className={this.state.activeLink === 6 ? "active" : ""}>
                  Khen thưởng, kỷ luật
                </span>
              </li>
              {/* </Link>
              <Link to="/crm/employee/edit-information/family"> */}
              <li onClick={() => this.handleClick(7)}>
                <div className={this.state.activeLink === 7 ? "active" : ""}>
                  7
                </div>
                <span className={this.state.activeLink === 7 ? "active" : ""}>
                  Hoàn cảnh kinh tế, quan hệ gia đình
                </span>
              </li>
              {/* </Link>
              <Link to="/crm/employee/edit-information/kinship"> */}
              <li onClick={() => this.handleClick(8)}>
                <div className={this.state.activeLink === 8 ? "active" : ""}>
                  8
                </div>
                <span className={this.state.activeLink === 8 ? "active" : ""}>
                  Quan hệ gia đình, thân tộc
                </span>
              </li>
              {/* </Link>
              <Link to="/crm/employee/edit-information/social"> */}
              <li onClick={() => this.handleClick(9)}>
                <div className={this.state.activeLink === 9 ? "active" : ""}>
                  9
                </div>
                <span className={this.state.activeLink === 9 ? "active" : ""}>
                  Quan hệ xã hội
                </span>
              </li>
              {/* </Link> */}
            </ul>
            <div className="edit-infr-vertical-line"></div>
          </div>
          <div className="edit-infor-form">
            <fieldset disabled="disabled">
              <div className="tabs-main">
                <form
                  style={{ width: "100%" }}
                  className="tabs-main"
                  noValidate
                  onSubmit={this.onSubmit}
                  method="post"
                >
                  <div className="tabs-main-left">
                    <div className="tabs-main-left-content">
                      <div className="tabs-main-left">
                        <ul className="tabs-main-left-ul">
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Họ và tên khai sinh:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                value={this.state.pro_name}
                                name="pro_name"
                                onChange={this.onChange}
                                placeholder="Nhập họ và tên khai sinh"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Bút danh:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_pen_name"
                                value={this.state.pro_pen_name}
                                onChange={this.onChange}
                                placeholder="Nhập Bút danh"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Ngày sinh của user:
                            </span>
                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                              <DatePicker
                                placeholder="Chọn ngày"
                                style={{ width: 150 }}
                                value={
                                  this.state.pro_birth_day == null
                                    ? null
                                    : moment(
                                        this.state.pro_birth_day,
                                        dateFormat
                                      )
                                }
                                onChange={(date, dateString) =>
                                  this.onChangeBirthDay(
                                    date,
                                    dateString,
                                    "pro_birth_day"
                                  )
                                }
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Giới tính:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Radio.Group
                                onChange={this.onChangeSex}
                                value={this.state.pro_gender}
                              >
                                <Radio value={1}>Nam</Radio>
                                <Radio value={2}>Nữ</Radio>
                                <Radio value={3}>Khác</Radio>
                              </Radio.Group>
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Nơi sinh:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_birth_place"
                                value={this.state.pro_birth_place}
                                onChange={this.onChange}
                                placeholder="Nơi sinh của"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Quê quán hộ khẩu thường trú:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_home_town"
                                value={this.state.pro_home_town}
                                onChange={this.onChange}
                                placeholder="Nơi sinh của"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Số điện thoại nội bộ:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_local_phone"
                                value={this.state.pro_local_phone}
                                onChange={this.onChange}
                                placeholder="Số điện thoại nội bộ"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Nơi ở hiện tại:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_resident"
                                value={this.state.pro_resident}
                                onChange={this.onChange}
                                placeholder="Nơi ở hiện tại"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Dân tộc:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_ethnic"
                                value={this.state.pro_ethnic}
                                onChange={this.onChange}
                                placeholder="Dân tộc"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Tôn giáo:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_religion"
                                value={this.state.pro_religion}
                                onChange={this.onChange}
                                placeholder="Tôn giáo"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Thành phần xuất thân:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_background_origin"
                                value={this.state.pro_background_origin}
                                onChange={this.onChange}
                                placeholder="Thành phần xuất thân của"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Nghề nghiệp khi được tuyển dụng:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_occupation"
                                value={this.state.pro_occupation}
                                onChange={this.onChange}
                                placeholder="Nhập nghề nghiệp khi được tuyển dụng"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Số CMND/Thẻ CCCD:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_identity_card"
                                value={this.state.pro_identity_card}
                                onChange={this.onChange}
                                placeholder="Số CMND/Thẻ CCCD"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Ngày cấp CMND, CCCD :
                            </span>
                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                              <DatePicker
                                placeholder="Chọn ngày"
                                style={{ width: 150 }}
                                value={
                                  this.state.pro_identity_card_when == null
                                    ? null
                                    : moment(
                                        this.state.pro_identity_card_when,
                                        dateFormat
                                      )
                                }
                                onChange={(date, dateString) =>
                                  this.onChangeBirthDay(
                                    date,
                                    dateString,
                                    "pro_identity_card_when"
                                  )
                                }
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Nơi cấp CMND,CCCD:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="pro_identity_card_where"
                                value={this.state.pro_identity_card_where}
                                onChange={this.onChange}
                                placeholder="Nơi cấp CMND,CCCD"
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tabs-main-right">
                    <div className="tabs-main-left-content">
                      <div className="tabs-main-left">
                        <ul className="tabs-main-left-ul">
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Tên phòng ban:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="dep_name"
                                value={this.state.dep_name}
                                onChange={this.onChange}
                                placeholder="Nhập Tên phòng ban"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Chức vụ:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="dep_position"
                                value={this.state.dep_position}
                                onChange={this.onChange}
                                placeholder="Chức vụ phòng ban"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Ngày bổ nhiệm chức vụ :
                            </span>
                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                              <DatePicker
                                placeholder="Chọn ngày"
                                style={{ width: 150 }}
                                value={
                                  this.state.dep_appointment_date == null
                                    ? null
                                    : moment(
                                        this.state.dep_appointment_date,
                                        dateFormat
                                      )
                                }
                                onChange={(date, dateString) =>
                                  this.onChangeBirthDay(
                                    date,
                                    dateString,
                                    "dep_appointment_date"
                                  )
                                }
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Loại bằng cấp:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="deg_type"
                                value={this.state.deg_type}
                                onChange={this.onChange}
                                placeholder="Loại bằng cấp"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Bằng cấp:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="deg_diploma"
                                value={this.state.deg_diploma}
                                onChange={this.onChange}
                                placeholder="Bằng cấp"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Chuyên ngành học:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="deg_majors"
                                value={this.state.deg_majors}
                                onChange={this.onChange}
                                placeholder="Chuyên ngành học"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Tên trường đào tạo:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="deg_school_name"
                                value={this.state.deg_school_name}
                                onChange={this.onChange}
                                placeholder="Tên trường đào tạo"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Thời gian bắt đầu học:
                            </span>
                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                              <RangePicker
                                placeholder="Chọn ngày"
                                value={
                                  this.state.deg_begin_study == null
                                    ? null
                                    : [
                                        moment(
                                          this.state.deg_begin_study,
                                          dateFormat
                                        ),
                                        moment(
                                          this.state.deg_end_study,
                                          dateFormat
                                        ),
                                      ]
                                }
                                onChange={(date, dateString) =>
                                  this.onChangeRange(
                                    date,
                                    dateString,
                                    "deg_begin_study",
                                    "deg_end_study"
                                  )
                                }
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Hình thức lao động:
                            </span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="work_formality"
                                value={this.state.work_formality}
                                onChange={this.onChange}
                                placeholder="Hình thức lao động"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">Số thẻ:</span>
                            <div className="tabs-user-infor-bottom">
                              <Input
                                name="car_number"
                                value={this.state.car_number}
                                onChange={this.onChange}
                                placeholder="Số thẻ"
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Ngày cấp thẻ:
                            </span>
                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                              <DatePicker
                                placeholder="Chọn ngày"
                                style={{ width: 150 }}
                                placeholder="Chọn ngày"
                                value={
                                  this.state.car_number_day == null
                                    ? null
                                    : moment(
                                        this.state.car_number_day,
                                        dateFormat
                                      )
                                }
                                onChange={(date, dateString) =>
                                  this.onChangeBirthDay(
                                    date,
                                    dateString,
                                    "car_number_day"
                                  )
                                }
                              />
                            </div>
                          </li>
                          <li className="tabs-main-left-li">
                            <span className="tabs-user-infor-top">
                              Thời gian thẻ có hiệu lực:
                            </span>
                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                              <RangePicker
                                placeholder="Chọn ngày"
                                value={
                                  this.state.car_begin == null
                                    ? null
                                    : [
                                        moment(
                                          this.state.car_begin,
                                          dateFormat
                                        ),
                                        moment(this.state.car_end, dateFormat),
                                      ]
                                }
                                onChange={(date, dateString) =>
                                  this.onChangeRange(
                                    date,
                                    dateString,
                                    "car_begin",
                                    "car_end"
                                  )
                                }
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  uiActionCreators: bindActionCreators(uiActions, dispatch),
});
export default connect(null, mapDispatchToProps)(NotifiDepartment);
