import React, { useState } from "react";
import { Input, Select } from "antd";
import { Button, DatePicker } from "antd";
import moment from "moment";
import { formatDateNumber, validateOnlyNumber } from "../../../helpers/FuncHelper";
const { Option } = Select;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const JoinDCS = (props) => {
  let { par_admission_date,
    par_branch,
    par_committee,
    par_first_full_name,
    par_first_position,
    par_first_workplace,
    par_first_residence,
    par_second_full_name,
    par_second_position,
    par_second_workplace,
    par_second_residence,
    par_announcement_date,
    par_announcement_branch,
    par_announcement_committee,
    par_member_id,
    par_issue_date,
    par_issue_committee } = props.dataJoinDCS
  let date1 = formatDateNumber(par_admission_date, dateFormatList[0]);
  let date2 = formatDateNumber(par_announcement_date, dateFormatList[0]);
  let date3 = formatDateNumber(par_issue_date, dateFormatList[0]);
  console.log(props.idSelection)
  return (
    <div className="edit-infor-form edit-infor-form-DCS">
      <div className="tabs-main">
        <form
          style={{ width: "100%" }}
          className="tabs-main"
          noValidate
          method="post"
        >
          <div className="tabs-main-left">
            <div className="tabs-main-left-content">
              <div className="tabs-main-left">
                <ul className="tabs-main-left-ul">
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Thông tin :
                    </span>
                    <div className="tabs-user-infor-bottom">
                    <Select
                      onChange={props.handleChangeSelection}
                      className="modal-selection"
                      // style={{ width: 527 }}
                      defaultValue = "Gia nhập Đoàn"
                    >
                      <Option value="Gia nhập Đoàn">Gia nhập Đoàn</Option>
                      <Option value="Gia nhập Đảng">Gia nhập Đảng</Option>
                    </Select>
                    </div>
                  </li>
                  {props.idSelection === "Gia nhập Đảng" &&
                  <div>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Ngày kết nạp đảng cộng sản Việt Nam:
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <DatePicker
                        placeholder="Chọn ngày"
                        style={{ width: 150 }}
                        value={par_admission_date ? moment(date1, dateFormatList[0]) : null}
                        format={dateFormatList}
                        onChange={(date, dateString) =>
                          props.onChangeBirthDay(
                            date,
                            dateString,
                            "par_admission_date"
                          )
                        }
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Tại chi bộ:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="par_branch"
                        value={par_branch}
                        onChange={props.onChange}
                        placeholder="Tại chi bộ"

                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Thuộc đảng bộ:</span>
                    <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                      <Input
                        name="par_committee"
                        value={par_committee}
                        onChange={props.onChange}
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
                        value={par_first_full_name}
                        name="par_first_full_name"
                        onChange={props.onChange}
                        placeholder="Họ tên người giới thiệu thứ nhất"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-lever-2">
                    <li className="tabs-main-left-li tabs-main-left-li-row">
                      <span className="tabs-user-infor-top ">Chức vụ:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="par_first_position"
                          value={par_first_position}
                          onChange={props.onChange}
                          placeholder="Chức vụ người giới thiệu thứ nhất"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li tabs-main-left-li-row">
                      <span className="tabs-user-infor-top">Đơn vị:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="par_first_workplace"
                          value={par_first_workplace}
                          onChange={props.onChange}
                          placeholder="Đơn vị người giới thiệu thứ nhất"
                        />
                      </div>
                    </li>
                  </li>

                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Hiện nay ở đâu</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        value={par_first_residence}
                        name="par_first_residence"
                        onChange={props.onChange}
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
                        value={par_second_full_name}
                        name="par_second_full_name"
                        onChange={props.onChange}
                        placeholder="Họ tên người giới thiệu thứ hai"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-lever-2">
                    <li className="tabs-main-left-li tabs-main-left-li-row">
                      <span className="tabs-user-infor-top">Chức vụ :</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="par_second_position"
                          value={par_second_position}
                          onChange={props.onChange}
                          placeholder="Chức vụ "
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li tabs-main-left-li-row">
                      <span className="tabs-user-infor-top">Đơn vị :</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          value={par_second_workplace}
                          name="par_second_workplace"
                          onChange={props.onChange}
                          placeholder="Đơn vị "
                        />
                      </div>
                    </li>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Hiện nay ở đâu</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        value={par_second_residence}
                        name="par_second_residence"
                        onChange={props.onChange}
                        placeholder="Hiện nay ở đâu"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Ngày tuyên bố chính thức
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <DatePicker
                        placeholder="Chọn ngày"
                        style={{ width: 150 }}
                        value={par_announcement_date ? moment(date2, dateFormatList[0]) : null}
                        format={dateFormatList}
                        onChange={(date, dateString) =>
                          props.onChangeBirthDay(
                            date,
                            dateString,
                            "par_announcement_date"
                          )
                        }
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-lever-2">
                    <li className="tabs-main-left-li tabs-main-left-li-row">
                      <span className="tabs-user-infor-top">Tại chi bộ:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          value={par_announcement_branch}
                          name="par_announcement_branch"
                          onChange={props.onChange}
                          placeholder="Tại chi bộ"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li tabs-main-left-li-row  ">
                      <span className="tabs-user-infor-top">Thuộc đảng bộ:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          value={par_announcement_committee}
                          name="par_announcement_committee"
                          onChange={props.onChange}
                          placeholder="Thuộc đảng bộ"
                        />
                      </div>
                    </li>
                  </li>

                  <div className="join-DCS-three">
                    <li className="tabs-main-left-li tabs-main-left-li-lever-2">
                      <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
                        <span className="tabs-user-infor-top">Số Đảng viên:</span>
                        <div className="tabs-user-infor-bottom">
                          <Input
                            value={par_member_id}
                            name="par_member_id"
                            onChange={props.onChange}
                            placeholder="Số Đảng Viên"
                          />
                        </div>
                      </li>
                      <li className="tabs-main-left-li tabs-main-left-li-row-three">
                        <span className="tabs-user-infor-top">Ngày cấp:</span>
                        <div className="tabs-user-infor-bottom">
                          <DatePicker
                            placeholder="Chọn ngày"
                            style={{ width: 150 }}
                            value={par_issue_date ? moment(date3, dateFormatList[0]) : null}
                            format={dateFormatList}
                            onChange={(date, dateString) =>
                              props.onChangeBirthDay(
                                date,
                                dateString,
                                "par_issue_date"
                              )
                            }
                          />
                        </div>
                      </li>
                      <li className="tabs-main-left-li tabs-main-left-li-row-three">
                        <span className="tabs-user-infor-top">Tại Đảng bộ</span>
                        <div className="tabs-user-infor-bottom">
                          <Input
                            value={par_issue_committee}
                            name="par_issue_committee"
                            onChange={props.onChange}
                            placeholder="Cấp sổ Đảng viên ở Đảng bộ"
                          />
                        </div>
                      </li>
                    </li>
                  </div>
                  <li className="tabs-main-left-li btn-add-DCS">
                    <span
                      htmlType="submit"
                      onClick={() => {
                        props.handleOk()
                      }}
                      className="btn-add-user btn-add-user-DCS"
                    >
                      CẬP NHẬT
                    </span>
                  </li>
                  </div>
                  }

                  { props.idSelection === "Gia nhập Đoàn" &&
                      <li className="tabs-main-left-li tabs-main-left-li-lever-2">
                      <li className="tabs-main-left-li tabs-main-left-li-row">
                        <span className="tabs-user-infor-top">Chức vụ :</span>
                        <div className="tabs-user-infor-bottom">
                          <Input
                            name="par_second_position"
                            // value={par_second_position}
                            onChange={props.onChange}
                            placeholder="Chức vụ "
                          />
                        </div>
                      </li>
                      <li className="tabs-main-left-li tabs-main-left-li-row">
                        <span className="tabs-user-infor-top">Đơn vị :</span>
                        <div className="tabs-user-infor-bottom">
                          <Input
                            // value={par_second_workplace}
                            name="par_second_workplace"
                            onChange={props.onChange}
                            placeholder="Đơn vị "
                          />
                        </div>
                      </li>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default JoinDCS;
