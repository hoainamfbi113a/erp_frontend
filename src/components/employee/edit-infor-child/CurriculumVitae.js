import React, { Component } from 'react'
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Radio } from "antd";
export default class CurriculumVitae extends Component {
    render() {
        return (
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
                            Họ và tên khai sinh: :
                          </span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              // defaultValue={ this.state.pro_name }
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
                              // defaultValue={ this.state.pro_pen_name }
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
                              style={{ width: 150 }}
                              // defaultValue={this.state.pro_birth_day == null ? null: moment(this.state.pro_birth_day, dateFormat)}
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
                              // value={this.state.pro_gender}
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
                              // defaultValue={ this.state.pro_birth_place }
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
                              // defaultValue={ this.state.pro_home_town }
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
                              name="pro_mobile_phone"
                              // defaultValue={ this.state.pro_mobile_phone }
                              onChange={this.onChange}
                              placeholder="Quê quán của"
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
                              // defaultValue={ this.state.pro_resident }
                              onChange={this.onChange}
                              placeholder="Nơi ở hiện tại"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-top">Dân tộc:</span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_resident"
                              // defaultValue={ this.state.pro_resident }
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
                              // defaultValue={ this.state.pro_religion }
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
                              // defaultValue={ this.state.pro_background_origin }
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
                              // defaultValue={ this.state.pro_occupation }
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
                              // defaultValue={ this.state.pro_identity_card }
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
                              style={{ width: 150 }}
                              // defaultValue={this.state.pro_identity_card_when == null ? null: moment(this.state.pro_identity_card_when, dateFormat)}
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
                              // defaultValue={ this.state.pro_identity_card_where }
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
                              // defaultValue={ this.state.dep_name }
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
                              // defaultValue={ this.state.dep_position }
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
                              style={{ width: 150 }}
                              // defaultValue={this.state.dep_appointment_date == null ? null: moment(this.state.dep_appointment_date, dateFormat)}
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
                              // defaultValue={ this.state.deg_type }
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
                              // defaultValue={ this.state.deg_diploma }
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
                              // defaultValue={ this.state.deg_majors }
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
                              // defaultValue={ this.state.deg_school_name }
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
                              // defaultValue={this.state.deg_begin_study == null ? null: moment(this.state.deg_begin_study, dateFormat)}
                              onChange={(date, dateString) =>
                                this.onChangeBirthDay(
                                  date,
                                  dateString,
                                  "deg_begin_study"
                                )
                              }
                            />
                          </div>
                        </li>
                        {/* <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian kết thúc học, thời gian tốt nghiệp:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 150 }}
                                                    // defaultValue={this.state.deg_end_study == null ? null: moment(this.state.deg_end_study, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"deg_end_study")}
                                                />
                                            </div>
                                        </li> */}
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-top">
                            Hình thức lao động:
                          </span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="work_formality"
                              // defaultValue={ this.state.work_formality }
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
                              // defaultValue={ this.state.car_number }
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
                              style={{ width: 150 }}
                              // defaultValue={this.state.car_number_day == null ? null: moment(this.state.car_number_day, dateFormat)}
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
                              // defaultValue={this.state.car_begin == null ? null: moment(this.state.car_begin, dateFormat)}
                              onChange={(date, dateString) =>
                                this.onChangeBirthDay(
                                  date,
                                  dateString,
                                  "car_begin"
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
        )
    }
}
