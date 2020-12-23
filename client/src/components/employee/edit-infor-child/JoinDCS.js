import React, { Component } from 'react'
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Radio } from "antd";
export default class JoinDCS extends Component {
    render() {
        return (
            <div className="edit-infor-form edit-infor-form-DCS">
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
                           Ngày kết nạp đảng cộng sản Việt Nam :
                          </span>
                          <div className="tabs-user-infor-bottom">
                          <DatePicker
                          placeholder="Chọn ngày"
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
                          <span className="tabs-user-infor-top">Tại chi bộ:</span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_pen_name"
                              // defaultValue={ this.state.pro_pen_name }
                              onChange={this.onChange}
                              placeholder="Tại chi bộ"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-top">
                            Thuộc đảng bộ:
                          </span>
                          <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                            <Input
                                name="pro_pen_name"
                                // defaultValue={ this.state.pro_pen_name }
                                onChange={this.onChange}
                                placeholder="Thuộc đảng bộ"
                                />
                            
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-top">
                           Họ tên (Người giới thiệu thứ nhất)
                          </span>
                          <div className="tabs-user-infor-bottom">
                          <Input
                              name="pro_birth_place"
                              // defaultValue={ this.state.pro_birth_place }
                              onChange={this.onChange}
                              placeholder="Họ tên người giới thiệu thứ nhất"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li tabs-main-left-li-row">
                          <span className="tabs-user-infor-top ">Chức vụ:</span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_birth_place"
                              // defaultValue={ this.state.pro_birth_place }
                              onChange={this.onChange}
                              placeholder="Chức vụ người giới thiệu thứ nhất"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li tabs-main-left-li-row">
                          <span className="tabs-user-infor-top">Đơn vị:</span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_birth_place"
                              // defaultValue={ this.state.pro_birth_place }
                              onChange={this.onChange}
                              placeholder="Đơn vị người giới thiệu thứ nhất"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-top">
                           Hiện nay ở đâu
                          </span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_home_town"
                              // defaultValue={ this.state.pro_home_town }
                              onChange={this.onChange}
                              placeholder="Hiện nay ở đâu"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-top ">
                           Họ tên (Người giới thiệu thứ hai)
                          </span>
                          <div className="tabs-user-infor-bottom">
                          <Input
                              name="pro_birth_place"
                              // defaultValue={ this.state.pro_birth_place }
                              onChange={this.onChange}
                              placeholder="Họ tên người giới thiệu thứ hai"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li tabs-main-left-li-row">
                          <span className="tabs-user-infor-top">Chức vụ :</span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_birth_place"
                              // defaultValue={ this.state.pro_birth_place }
                              onChange={this.onChange}
                              placeholder="Chức vụ "
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li tabs-main-left-li-row">
                          <span className="tabs-user-infor-top">Đơn vị :</span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_birth_place"
                              // defaultValue={ this.state.pro_birth_place }
                              onChange={this.onChange}
                              placeholder="Đơn vị "
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-top">
                           Hiện nay ở đâu
                          </span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_home_town"
                              // defaultValue={ this.state.pro_home_town }
                              onChange={this.onChange}
                              placeholder="Hiện nay ở đâu"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li">
                          <span className="tabs-user-infor-top">
                           Ngày tuyên bố chính thức
                          </span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_mobile_phone"
                              // defaultValue={ this.state.pro_mobile_phone }
                              onChange={this.onChange}
                              placeholder="Ngày tuyên bố chính thức"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li tabs-main-left-li-row">
                          <span className="tabs-user-infor-top">
                            Tại chi bộ:
                          </span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_resident"
                              // defaultValue={ this.state.pro_resident }
                              onChange={this.onChange}
                              placeholder="Tại chi bộ"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li tabs-main-left-li-row  ">
                          <span className="tabs-user-infor-top">Thuộc đảng bộ:</span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_resident"
                              // defaultValue={ this.state.pro_resident }
                              onChange={this.onChange}
                              placeholder="Thuộc đảng bộ"
                            />
                          </div>
                        </li>
                        <div className="join-DCS-three">
                        <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
                          <span className="tabs-user-infor-top">Số Đảng viên:</span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_religion"
                              // defaultValue={ this.state.pro_religion }
                              onChange={this.onChange}
                              placeholder="Số Đảng Viên"
                            />
                          </div>
                        </li>
                        <li className="tabs-main-left-li tabs-main-left-li-row-three">
                          <span className="tabs-user-infor-top">
                            Ngày cấp:
                          </span>
                          <div className="tabs-user-infor-bottom">
                          <DatePicker
                          placeholder="Chọn ngày"
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
                        <li className="tabs-main-left-li tabs-main-left-li-row-three">
                          <span className="tabs-user-infor-top">
                           Tại Đảng bộ
                          </span>
                          <div className="tabs-user-infor-bottom">
                            <Input
                              name="pro_occupation"
                              // defaultValue={ this.state.pro_occupation }
                              onChange={this.onChange}
                              placeholder="Cấp sổ Đảng viên ở Đảng bộ"
                            />
                          </div>
                        </li>
                        </div>
                        <li className="tabs-main-left-li">
                          <Button htmlType="submit" className="btn-add-user btn-add-user-DCS">
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
