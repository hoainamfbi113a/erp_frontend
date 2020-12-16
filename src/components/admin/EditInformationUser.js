import React, { Component } from "react";
import { Input, DatePicker, Radio, Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;
import Axios from "axios";
// import * as uiActions from "../../../actions/ui";
const dateFormat = "YYYY/MM/DD";
export default class NotifiDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: 1,
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
    };
  }
  onSubmit = async (e) => {
    e.preventDefault();
    alert(this.props.match.params.id)
    // this.props.uiActionCreators.showLoading();
    // const from_item_id = 165;
    // let to_item_id = 0;
    // let arrLog = [];
    // let messageErr = 0;
    // await Axios.get(`${process.env.apiEmployee}/api/transfers`)
    //   .then((res) => {
    //     arrLog = res.data.data;
    //   })
    //   .catch((err) => {
    //     messageErr = 1;
    //     console.log(err);
    //   });
    // for (const item of arrLog) {
    //   if (item.from_item_id == from_item_id) {
    //     if (item.to_item_id > to_item_id) {
    //       to_item_id = item.to_item_id;
    //     }
    //   }
    // }
    // let params = {
    //   pro_name: this.state.pro_name,
    //   pro_pen_name: this.state.pro_pen_name,
    //   pro_birth_day: Date.parse(this.state.pro_birth_day) / 1000,
    //   pro_gender: this.state.pro_gender,
    //   pro_birth_place: this.state.pro_birth_place,
    //   pro_home_town: this.state.pro_home_town,
    //   pro_local_phone: this.state.pro_local_phone,
    //   pro_resident: this.state.pro_resident,
    //   pro_ethnic: this.state.pro_ethnic,
    //   pro_religion: this.state.pro_religion,
    //   pro_background_origin: this.state.pro_background_origin,
    //   pro_occupation: this.state.pro_occupation,
    //   pro_identity_card: this.state.pro_identity_card,
    //   pro_identity_card_when:
    //     Date.parse(this.state.pro_identity_card_when) / 1000,
    //   pro_identity_card_where: this.state.pro_identity_card_where,
    //   current_user_id: "3",
    //   user_id: "4",
    // };
    // await Axios.put(
    //   `${process.env.apiEmployee}/api/profiles/165?current_user_id=3`,
    //   params
    // )
    //   .then((res) => {
    //     if (res.data.message == "Success!. Updated") {
    //     } else {
    //       messageErr = 2;
    //     }
    //   })
    //   .catch(() => {
    //     messageErr = 3;
    //   });
    // let paramsDepartment = {
    //   dep_name: this.state.dep_name,
    //   dep_position: this.state.dep_position,
    //   dep_appointment_date: Date.parse(this.state.dep_appointment_date),
    //   user_id: "4",
    //   pro_id: "178",
    //   dep_note: "asd",
    // };
    // await Axios.put(
    //   `${process.env.apiEmployee}/api/departments/130?current_user_id=4`,
    //   paramsDepartment
    // )
    //   .then((res) => {
    //     if (res.data.message == "Success!. Updated") {
    //     } else {
    //       messageErr = 4;
    //     }
    //   })
    //   .catch(() => {
    //     messageErr = 5;
    //   });
    // let paramsUserDegrees = {
    //   user_id: "4",
    //   pro_id: "178",
    //   deg_type: this.state.deg_type,
    //   deg_diploma: this.state.deg_diploma,
    //   deg_majors: this.state.deg_majors,
    //   deg_school_name: this.state.deg_school_name,
    //   deg_begin_study: Date.parse(this.state.deg_begin_study) / 1000,
    //   deg_end_study: Date.parse(this.state.deg_end_study) / 1000,
    // };
    // await Axios.put(
    //   `${process.env.apiEmployee}/api/user-degrees/110?current_user_id=4`,
    //   paramsUserDegrees
    // )
    //   .then((res) => {
    //     if (res.data.message == "Success!. Updated") {
    //     } else {
    //       messageErr = 6;
    //     }
    //   })
    //   .catch(() => {
    //     messageErr = 7;
    //   });
    // let paramsWorkObjects = {
    //   user_id: "4",
    //   pro_id: "178",
    //   work_formality: this.state.work_formality,
    //   work_note: "asd",
    // };
    // await Axios.put(
    //   `${process.env.apiEmployee}/api/work-objects/116?current_user_id=4`,
    //   paramsWorkObjects
    // )
    //   .then((res) => {
    //     if (res.data.message == "Success!. Updated") {
    //       message;
    //     } else {
    //       messageErr = 8;
    //     }
    //   })
    //   .catch(() => {
    //     messageErr = 9;
    //   });
    // let paramsJournalistCards = {
    //   user_id: "4",
    //   pro_id: "178",
    //   car_number: this.state.car_number,
    //   car_number_day: Date.parse(this.state.car_number_day),
    //   car_begin: Date.parse(this.state.car_begin) / 1000,
    //   car_end: Date.parse(this.state.car_end) / 1000,
    //   car_note: "123",
    // };
    // await Axios.put(
    //   `${process.env.apiEmployee}/api/journalist-cards/110?current_user_id=4`,
    //   paramsJournalistCards
    // )
    //   .then((res) => {
    //     if (res.data.message == "Success!. Updated") {
    //     } else {
    //       messageErr = 10;
    //     }
    //   })
    //   .catch(() => {
    //     messageErr = 11;
    //   });
    // await this.fetchData();
    // console.log(messageErr);
    // if (messageErr == 0) {
    //   message.success("Cập nhât thông tin thành công");
    // } else {
    //   message.error("Cập nhật thất bại");
    // }
    // this.props.uiActionCreators.hideLoading();
  };
  handleClick = (id) => {
    this.setState({ activeLink: id });
  };
  render() {
    return (
      <div className="content-background2" style={{ width: "100%" }}>
        <div style={{ minHeight: "70vh" }} className="edit-infor">
          <div className="edit-infor-tabs">
            <ul>
              <Link to="/crm/employee/edit-information">
                <li onClick={() => this.handleClick(1)}>
                  <div className={this.state.activeLink === 1 ? "active" : ""}>
                    1
                  </div>
                  <span className={this.state.activeLink === 1 ? "active" : ""}>
                    Sơ yếu lý lịch
                  </span>
                </li>
              </Link>
              <Link to="/crm/employee/edit-information/personal-history">
                <li onClick={() => this.handleClick(2)}>
                  <div className={this.state.activeLink === 2 ? "active" : ""}>
                    2
                  </div>
                  <span className={this.state.activeLink === 2 ? "active" : ""}>
                    Lịch sử bản thân
                  </span>
                </li>
              </Link>
              <Link to="/crm/employee/edit-information/joinDCS">
                <li onClick={() => this.handleClick(3)}>
                  <div className={this.state.activeLink === 3 ? "active" : ""}>
                    3
                  </div>
                  <span className={this.state.activeLink === 3 ? "active" : ""}>
                    Gia nhập Đảng Cộng Sản Việt Nam
                  </span>
                </li>
              </Link>
              <Link to="/crm/employee/edit-information/join-TCTTXH">
                <li onClick={() => this.handleClick(4)}>
                  <div className={this.state.activeLink === 4 ? "active" : ""}>
                    4
                  </div>
                  <span className={this.state.activeLink === 4 ? "active" : ""}>
                    Tham gia các tổ chức chính trị, xã hội, các nghề nghiệp
                  </span>
                </li>
              </Link>
              <Link to="/crm/employee/edit-information/professional-compensation">
                <li onClick={() => this.handleClick(5)}>
                  <div className={this.state.activeLink === 5 ? "active" : ""}>
                    5
                  </div>
                  <span className={this.state.activeLink === 5 ? "active" : ""}>
                    Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính
                    trị ngoại ngữ
                  </span>
                </li>
              </Link>
              <Link to="/crm/employee/edit-information/bonus">
                <li onClick={() => this.handleClick(6)}>
                  <div className={this.state.activeLink === 6 ? "active" : ""}>
                    6
                  </div>
                  <span className={this.state.activeLink === 6 ? "active" : ""}>
                    Khen thưởng, kỷ luật
                  </span>
                </li>
              </Link>
              <Link to="/crm/employee/edit-information/family">
                <li onClick={() => this.handleClick(7)}>
                  <div className={this.state.activeLink === 7 ? "active" : ""}>
                    7
                  </div>
                  <span className={this.state.activeLink === 7 ? "active" : ""}>
                    Hoàn cảnh kinh tế, quan hệ gia đình
                  </span>
                </li>
              </Link>
              <Link to="/crm/employee/edit-information/kinship">
                <li onClick={() => this.handleClick(8)}>
                  <div className={this.state.activeLink === 8 ? "active" : ""}>
                    8
                  </div>
                  <span className={this.state.activeLink === 8 ? "active" : ""}>
                    Quan hệ gia đình, thân tộc
                  </span>
                </li>
              </Link>
              <Link to="/crm/employee/edit-information/social">
                <li onClick={() => this.handleClick(9)}>
                  <div className={this.state.activeLink === 9 ? "active" : ""}>
                    9
                  </div>
                  <span className={this.state.activeLink === 9 ? "active" : ""}>
                    Quan hệ xã hội
                  </span>
                </li>
              </Link>
            </ul>
            <div className="edit-infr-vertical-line"></div>
          </div>
          <div className="edit-infor-form">
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
                          <span className="tabs-user-infor-top">Bút danh:</span>
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
                            Ngày sinh của nhân viên:
                          </span>
                          <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                            <DatePicker
                              placeholder="Chọn ngày"
                              style={{ width: 150 }}
                              value={
                                this.state.pro_birth_day == null
                                  ? null
                                  : moment(this.state.pro_birth_day, dateFormat)
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
                          <span className="tabs-user-infor-top">Nơi sinh:</span>
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
                          <span className="tabs-user-infor-top">Dân tộc:</span>
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
                          <span className="tabs-user-infor-top">Tôn giáo:</span>
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
                          <span className="tabs-user-infor-top">Chức vụ:</span>
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
                          <span className="tabs-user-infor-top">Bằng cấp:</span>
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
                                this.onChangeBirthDay(
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
                                      moment(this.state.car_begin, dateFormat),
                                      moment(this.state.car_end, dateFormat),
                                    ]
                              }
                              onChange={(date, dateString) =>
                                this.onChangeBirthDay(
                                  date,
                                  dateString,
                                  "car_begin",
                                  "car_end"
                                )
                              }
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
