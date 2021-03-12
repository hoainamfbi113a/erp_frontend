import React, { useState } from "react";
import { Input } from "antd";
import { Button, DatePicker } from "antd";
const JoinDCS = () => {
  const onChange = () => {};
  const onChangeBirthDay = () => {};
  const onSubmit = () => {};
  return (
    <div className="edit-infor-form edit-infor-form-DCS">
      <div className="tabs-main">
        <form
          style={{ width: "100%" }}
          className="tabs-main"
          noValidate
          // onSubmit={onSubmit}
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
                        // defaultValue={state.pro_identity_card_when == null ? null: moment(state.pro_identity_card_when, dateFormat)}
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
                    <span className="tabs-user-infor-top">Tại chi bộ:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_pen_name"
                        // defaultValue={ state.pro_pen_name }
                        onChange={onChange}
                        placeholder="Tại chi bộ"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Thuộc đảng bộ:</span>
                    <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                      <Input
                        name="pro_pen_name"
                        // defaultValue={ state.pro_pen_name }
                        onChange={onChange}
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
                        // defaultValue={ state.pro_birth_place }
                        onChange={onChange}
                        placeholder="Họ tên người giới thiệu thứ nhất"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-lever-2">
                    <li className="tabs-main-left-li tabs-main-left-li-row">
                      <span className="tabs-user-infor-top ">Chức vụ:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="pro_birth_place"
                          // defaultValue={ state.pro_birth_place }
                          onChange={onChange}
                          placeholder="Chức vụ người giới thiệu thứ nhất"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li tabs-main-left-li-row">
                      <span className="tabs-user-infor-top">Đơn vị:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="pro_birth_place"
                          // defaultValue={ state.pro_birth_place }
                          onChange={onChange}
                          placeholder="Đơn vị người giới thiệu thứ nhất"
                        />
                      </div>
                    </li>
                  </li>

                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Hiện nay ở đâu</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_home_town"
                        // defaultValue={ state.pro_home_town }
                        onChange={onChange}
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
                        // defaultValue={ state.pro_birth_place }
                        onChange={onChange}
                        placeholder="Họ tên người giới thiệu thứ hai"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-lever-2">
                  <li className="tabs-main-left-li tabs-main-left-li-row">
                    <span className="tabs-user-infor-top">Chức vụ :</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_birth_place"
                        // defaultValue={ state.pro_birth_place }
                        onChange={onChange}
                        placeholder="Chức vụ "
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-row">
                    <span className="tabs-user-infor-top">Đơn vị :</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_birth_place"
                        // defaultValue={ state.pro_birth_place }
                        onChange={onChange}
                        placeholder="Đơn vị "
                      />
                    </div>
                  </li>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Hiện nay ở đâu</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_home_town"
                        // defaultValue={ state.pro_home_town }
                        onChange={onChange}
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
                        // defaultValue={ state.pro_mobile_phone }
                        onChange={onChange}
                        placeholder="Ngày tuyên bố chính thức"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-lever-2">
                  <li className="tabs-main-left-li tabs-main-left-li-row">
                    <span className="tabs-user-infor-top">Tại chi bộ:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_resident"
                        // defaultValue={ state.pro_resident }
                        onChange={onChange}
                        placeholder="Tại chi bộ"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-row  ">
                    <span className="tabs-user-infor-top">Thuộc đảng bộ:</span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_resident"
                        // defaultValue={ state.pro_resident }
                        onChange={onChange}
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
                          name="pro_religion"
                          // defaultValue={ state.pro_religion }
                          onChange={onChange}
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
                          // defaultValue={state.pro_identity_card_when == null ? null: moment(state.pro_identity_card_when, dateFormat)}
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
                    <li className="tabs-main-left-li tabs-main-left-li-row-three">
                      <span className="tabs-user-infor-top">Tại Đảng bộ</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="pro_occupation"
                          // defaultValue={ state.pro_occupation }
                          onChange={onChange}
                          placeholder="Cấp sổ Đảng viên ở Đảng bộ"
                        />
                      </div>
                    </li>
                    </li>
                  </div>
                  <li className="tabs-main-left-li btn-add-DCS">
                    <span
                      htmlType="submit"
                      className="btn-add-user btn-add-user-DCS"
                    >
                      XÁC NHẬN
                    </span>
                  </li>
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
