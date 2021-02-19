import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import docCookies from "doc-cookies";
import { Input, message } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
import { Radio } from "antd";
import {
  getListDepartment,
  searchDepartment,
  updateDepartmentProfile,
} from "apis/departmentApi";
import { getListPosition, searchPosition } from "apis/positionApi";
import { searchParts } from "apis/partsApi";
import { getProfile, updateProfile } from "apis/profileApi";
// import { updateUser, getUser } from "apis/authenticationApi";
import { getUser } from "reduxToolkit/features/userSlice";
import { updateUserDegree } from "apis/userDegreesApi";
import { updateWorkObject } from "apis/workObjectsApi";
import { updateJournalistCards } from "apis/journalistCardsApi";
import { Select } from "antd";
const { Option } = Select;
const dateFormat = "YYYY/MM/DD";

const CurriculumVitaes = (props) => {
  const dispatch = useDispatch();
  let idUser = docCookies.getItem("user_id");
  const [user, setUser] = useState({});
  useEffect(() => {
    dispatch(getUser(idUser));
  }, [dispatch]);
  const userInfor = useSelector(state => state.user)
  console.log(userInfor)
  const onSubmit = () => {};
  const onChange = () => {};
  const handleChangeDepartment = () => {};
  const handleSearchDepartment = () => {};
  const handFocusDepartment = () => {};
  const renderDepartment = () => {};
  const handleChangeParts = () => {};
  const handleSearchPart = () => {};
  const handFocusPart = () => {};
  const renderParts = () => {};
  const handleChangePosition = () => {};
  const handleSearchPosition = () => {};
  const handFocusPosition = () => {};
  const renderPosition = () => {};
  const handleSave = () => {};
  const handleSend = () => {};
  return (
    <div className="edit-infor-form">
      {/* <div className="tabs-main">
        <form
          style={{ width: "100%" }}
          className="tabs-main"
          noValidate
          onSubmit={onSubmit}
          method="post"
        >
          <div className="tabs-main-left" style={{ width: "41%" }}>
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
                        onChange={onChange}
                        placeholder="Nhập họ và tên khai sinh"
                      />
                    </div>
                    {this.state.valid_pro_name.isValid ? (
                      <span
                        style={{
                          color: "red",
                          fontStyle: "italic",
                        }}
                      >
                        {this.state.valid_pro_name.errorMessage}
                      </span>
                    ) : null}
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Email cá nhân</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        value={this.state.email}
                        name="email"
                        onChange={onChange}
                        placeholder="Nhập email cá nhân"
                      />
                    </div>
                    {this.state.valid_email.isValid ? (
                      <span
                        style={{
                          color: "red",
                          fontStyle: "italic",
                        }}
                      >
                        {this.state.valid_email.errorMessage}
                      </span>
                    ) : null}
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Mật khẩu đăng nhập
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input.Password
                        value={this.state.password}
                        name="password"
                        onChange={onChange}
                        placeholder="Mật khẩu đăng nhập"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Số điện thoại</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        value={this.state.phone}
                        name="phone"
                        onChange={onChange}
                        placeholder="Số điện thoại"
                      />
                    </div>
                    {this.state.valid_phone.isValid ? (
                      <span
                        style={{
                          color: "red",
                          fontStyle: "italic",
                        }}
                      >
                        {this.state.valid_phone.errorMessage}
                      </span>
                    ) : null}
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Số điện thoại nội bộ:
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_local_phone"
                        value={this.state.pro_local_phone}
                        onChange={onChange}
                        placeholder="Số điện thoại nội bộ"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Bút danh:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_pen_name"
                        value={this.state.pro_pen_name}
                        onChange={onChange}
                        placeholder="Nhập Bút danh"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Ngày sinh</span>
                    <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                      <DatePicker
                        placeholder="Chọn ngày"
                        value={
                          this.state.pro_birth_day == null
                            ? null
                            : moment(this.state.pro_birth_day, dateFormat)
                        }
                        onChange={(date, dateString) =>
                          onChangeBirthDay(
                            date,
                            dateString,
                            "pro_birth_day"
                          )
                        }
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Giới tính:</span>
                    <div className="tabs-user-infor-bottom">
                      <Radio.Group
                        onChange={onChangeSex}
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
                        onChange={onChange}
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
                        onChange={onChange}
                        placeholder="Nơi sinh của"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Nơi ở hiện tại:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_resident"
                        value={this.state.pro_resident}
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        value={
                          this.state.pro_identity_card_when == null
                            ? null
                            : moment(
                                this.state.pro_identity_card_when,
                                dateFormat
                              )
                        }
                        onChange={(date, dateString) =>
                          onChangeBirthDay(
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
                        onChange={onChange}
                        placeholder="Nơi cấp CMND,CCCD"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Ghi chú thông tin căn bản
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_note"
                        value={this.state.pro_note}
                        onChange={onChange}
                        placeholder="Ghi chú thông tin căn bản"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tabs-main-right" style={{ width: "41%" }}>
            <div className="tabs-main-left-content">
              <div className="tabs-main-left">
                <ul className="tabs-main-left-ul">
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Chọn phòng ban:</span>
                    <div className="tabs-user-infor-bottom">
                      <Select
                        // defaultValue={0}
                        showSearch
                        // optionFilterProp="children"
                        value={this.state.dep_id}
                        name="depart"
                        style={{ width: "100%" }}
                        onChange={handleChangeDepartment}
                        onSearch={handleSearchDepartment}
                        onFocus={handFocusDepartment}
                        filterOption={(input, option) =>
                          option.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {renderDepartment}
                      </Select>
                    </div>
                    {this.state.valid_department.isValid ? (
                      <span
                        style={{
                          color: "red",
                          fontStyle: "italic",
                        }}
                      >
                        {this.state.valid_department.errorMessage}
                      </span>
                    ) : null}
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Tổ làm việc</span>
                    <div className="tabs-user-infor-bottom">
                      <Select
                        showSearch
                        value={this.state.par_id}
                        onChange={handleChangeParts}
                        onSearch={handleSearchPart}
                        onFocus={handFocusPart}
                        filterOption={(input, option) =>
                          option.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {renderParts()}
                      </Select>
                    </div>
                    {this.state.valid_part.isValid ? (
                      <span
                        style={{
                          color: "red",
                          fontStyle: "italic",
                        }}
                      >
                        {this.state.valid_part.errorMessage}
                      </span>
                    ) : null}
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Chức vụ:</span>
                    <div className="tabs-user-infor-bottom">
                      <Select
                        showSearch
                        value={this.state.pos_id}
                        onChange={handleChangePosition}
                        onSearch={handleSearchPosition}
                        onFocus={handFocusPosition}
                        filterOption={(input, option) =>
                          option.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {renderPosition()}
                      </Select>
                    </div>
                    {this.state.valid_position.isValid ? (
                      <span
                        style={{
                          color: "red",
                          fontStyle: "italic",
                        }}
                      >
                        {this.state.valid_position.errorMessage}
                      </span>
                    ) : null}
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Ngày bổ nhiệm chức vụ :
                    </span>
                    <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                      <DatePicker
                        placeholder="Chọn ngày"
                        value={
                          this.state.appointment_date == null
                            ? null
                            : moment(this.state.appointment_date, dateFormat)
                        }
                        onChange={(date, dateString) =>
                          onChangeBirthDay(
                            date,
                            dateString,
                            "appointment_date"
                          )
                        }
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Loại bằng cấp:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="deg_type"
                        value={this.state.deg_type}
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        // placeholder="Chọn ngày"
                        value={
                          this.state.deg_begin_study == null
                            ? null
                            : [
                                moment(this.state.deg_begin_study, dateFormat),
                                moment(this.state.deg_end_study, dateFormat),
                              ]
                        }
                        onChange={(date, dateString) =>
                          onChangeRange(
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
                      Ghi chú về trình độ:
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="deg_note"
                        value={this.state.deg_note}
                        onChange={onChange}
                        placeholder="Ghi chú về trình độ"
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
                        onChange={onChange}
                        placeholder="Hình thức lao động"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Ghi chú hình thức lao động:
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="work_note"
                        value={this.state.work_note}
                        onChange={onChange}
                        placeholder="Ghi chú hình thức lao động"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Số thẻ:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="car_number"
                        value={this.state.car_number}
                        onChange={onChange}
                        placeholder="Số thẻ"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Ngày cấp thẻ:</span>
                    <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                      <DatePicker
                        placeholder="Chọn ngày"
                        placeholder="Chọn ngày"
                        value={
                          this.state.car_number_day == null
                            ? null
                            : moment(this.state.car_number_day, dateFormat)
                        }
                        onChange={(date, dateString) =>
                          onChangeBirthDay(
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
                        // placeholder="Chọn ngày"
                        value={
                          this.state.car_begin == null
                            ? null
                            : [
                                moment(this.state.car_begin, dateFormat),
                                moment(this.state.car_end, dateFormat),
                              ]
                        }
                        onChange={(date, dateString) =>
                          onChangeRange(
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
                    <span className="tabs-user-infor-top">Ghi chú số thẻ:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="car_note"
                        value={this.state.car_note}
                        onChange={onChange}
                        placeholder="Ghi chú số thẻ"
                      />
                    </div>
                  </li>
                  {props.statusProfile == 2 ? (
                    <li className="tabs-main-left-li tabs-main-left-li-submit">
                      <span className="btn-add-user" onClick={handleSave}>
                        Lưu
                      </span>
                      <span className="btn-add-user" onClick={handleSend}>
                        Xác nhận
                      </span>
                    </li>
                  ) : (
                    "Bạn chỉ được xem hãy liên hệ nhân sự để được chỉnh sửa"
                  )}
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default CurriculumVitaes;
