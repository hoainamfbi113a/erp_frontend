import React, { Component } from "react";
import { Input, message } from "antd";
import { Button, Pagination, DatePicker } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
const { RangePicker } = DatePicker;
import { Radio } from "antd";
import axiosConfig from "../../../apis/axios"
import Axios from "axios"
import * as uiActions from "../../../actions/ui";
const dateFormat = "YYYY/MM/DD";
import { Select } from "antd";
const { Option } = Select;
class CurriculumVitae extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:null,
      user_id:null,
      pro_id:null,
      pro_name: null,
      pro_pen_name: null,
      pro_birth_day: "",
      pro_gender: 2,
      pro_birth_place: "",
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
      pro_note:null,
      dep_name: null,
      dep_position: null,
      dep_appointment_date: "",
      dep_note:null,
      deg_type: null,
      deg_diploma: null,
      deg_majors: null,
      deg_school_name: null,
      deg_begin_study: "",
      deg_end_study: "",
      deg_note:null,
      work_formality: null,
      work_note:null,
      car_number: null,
      car_number_day: null,
      car_begin: null,
      car_end: null,
      car_note:null,
      idDepartment: null,
      idUserDegree: null,
      idWorkObject: null,
      idJou: null,
      dataDepartment: null,
      dataPosition: null,
      dataParts: null,
    };
  }
  onAddInforUser = (value)=>{
    this.handleEdit(value)
  }
  handleEdit = async (value) =>{
    let userId = this.state.user_id;
    this.props.uiActionCreators.showLoading();
    let messageErr = 0;
    let paramsUser = {
      full_name:this.state.pro_name,
      email:this.state.email,
      phone:this.state.phone,
    }
      axiosConfig.put(`/api/user/${userId}`,paramsUser)
      .then((res)=>{
        if(res.message === "Success!. Stored"){
          
        } else {
          messageErr:1
        }
      })
      .catch(err=>{
        console.log(err)
      })
    let params = {
      user_id:userId,
      button: value,
      action:"update",
      // notify_content:"gui cho ns",
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
      pro_note: this.state.pro_note,
    };
    // console.log(params)
    await axiosConfig
      .put(`/api/profiles/${this.state.pro_id}`, params)
      .then((res) => {
        if (res.message == "Success!. Updated") {
          console.log(res);
        } else {
          messageErr = 2;
        }
      })
      .catch(() => {
        messageErr = 3;
      });
    let paramsDepartment = {
        pro_id:this.state.pro_id,
        user_id:this.state.user_id,
        dep_id:this.state.dep_id,
        pos_id:this.state.pos_id,
        part_id:this.state.par_id,
        appointment_date:this.state.appointment_date
    };

    await axiosConfig
      .put(`/api/profiles/departments/${this.state.pro_id}`, paramsDepartment)
      .then((res) => {
        if (res.message == "Success!. Updated") {
        } else {
          messageErr = 4;
        }
      })
      .catch(() => {
        messageErr = 5;
      });
    let paramsUserDegrees = {
      user_id: this.state.user_id,
      pro_id: this.state.pro_id,
      deg_type: this.state.deg_type,
      deg_diploma: this.state.deg_diploma,
      deg_majors: this.state.deg_majors,
      deg_school_name: this.state.deg_school_name,
      deg_begin_study: Date.parse(this.state.deg_begin_study) / 1000,
      deg_end_study: Date.parse(this.state.deg_end_study) / 1000,
      deg_note: this.state.deg_note,
    };
    await axiosConfig
      .put(`/api/user-degrees/${this.state.idUserDegree}`, paramsUserDegrees)
      .then((res) => {
        if (res.message == "Success!. Updated") {
        } else {
          messageErr = 6;
        }
      })
      .catch(() => {
        messageErr = 7;
      });
    let paramsWorkObjects = {
      user_id: this.state.user_id,
      pro_id: this.state.pro_id,
      work_formality: this.state.work_formality,
      work_note: this.state.work_note,
    };

    await axiosConfig
      .put(`/api/work-objects/${this.state.idWorkObject}`, paramsWorkObjects)
      .then((res) => {
        if (res.message == "Success!. Updated") {
          message;
        } else {
          messageErr = 8;
        }
      })
      .catch(() => {
        messageErr = 9;
      });
    let paramsJournalistCards = {
      user_id: this.state.user_id,
      pro_id: this.state.pro_id,
      car_number: this.state.car_number,
      car_number_day: Date.parse(this.state.car_number_day),
      car_begin: Date.parse(this.state.car_begin) / 1000,
      car_end: Date.parse(this.state.car_end) / 1000,
      car_note: this.state.car_note,
    };
    await axiosConfig
      .put(`/api/journalist-cards/${this.state.idJou}`, paramsJournalistCards)
      .then((res) => {
        if (res.message == "Success!. Updated") {
        } else {
          messageErr = 10;
        }
      })
      .catch(() => {
        messageErr = 11;
      });
    await this.fetchData();
    console.log(messageErr);
    if (messageErr == 0) {
      message.success("Cập nhât thông tin thành công");
      window.location.href = "http://localhost:3001/crm/employee/personal-page"
    } else {
      message.error("Cập nhật thất bại");
    }
    this.props.uiActionCreators.hideLoading();
  }
  handleSave = () => {
    this.onAddInforUser("save");
  };
  handleSend = () => {
    this.onAddInforUser("send");
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
  componentDidMount = async () => {
    this.fetchData();
  };
  fetchData = () => {
    this.fetchDataUser();
    this.fetchDepartment();
    this.fetchPosition();
    this.fetchParts();
  };
  fetchPosition = () => {
    axiosConfig
      .get("/api/positions")
      .then((res) => {
        this.setState({
          dataPosition: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fetchParts = () => {
    axiosConfig
      .get("/api/parts")
      .then((res) => {
        this.setState({
          dataParts: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fetchDepartment = () => {
    axiosConfig
      .get("/api/departments")
      .then((res) => {
        this.setState({
          dataDepartment: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  fetchDataUser = async () => {
      let idUser = localStorage.getItem("tokenID")
      this.setState({
        user_id:localStorage.getItem("tokenID")
      })
      let dataUser = null;
      let pro_id = 0;
      await axiosConfig
        .get(`/api/user/${idUser}`)
        .then((res) => {
          this.setState({
            full_name: res.data.full_name,
            phone: res.data.phone,
            email: res.data.email,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      await axiosConfig
        .post(`/api/fe/profiles/user`, {
          id: idUser,
        })
        .then(async (res) => {
          dataUser = res.data;
          pro_id = res.data.id;
          const data = dataUser;
          this.setState({
            pro_id: data.id,
            user_id:data.user_id,
            pro_name:data.pro_name,
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
            dep_id: data.department.data.dep_id,
            pos_id: data.department.data.pos_id,
            par_id: data.department.data.part_id,
            dep_appointment_date: new Date(
              data.department.data.dep_appointment_date * 1000
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
          console.log(err);
        });
      // Axios.get(`/api/transfers/profiles/${pro_id}`).then((res) => {
      //   this.setState({
      //     STATUS_PROFILE: res.data.data.after_status,
      //   });
      // });
  };
  renderDepartment = () => {
    if (this.state.dataDepartment !== null) {
      return this.state.dataDepartment.map((item) => {
        return (
          <Option key={item.id} value={item.id}>
            {item.dep_name}
          </Option>
        );
      });
    } else return "";
  };
  handleChangeDepartment = (value) => {
    this.setState({
      dep_id: value,
    });
  };
  renderPosition = () => {
    if (this.state.dataPosition !== null) {
      return this.state.dataPosition.map((item) => {
        return (
          <Option key={item.id} value={item.id}>
            {item.pos_name}
          </Option>
        );
      });
    } else return "";
  };
  handleChangePosition = (value) => {
    this.setState({
      pos_id: value,
    });
  };
  renderParts = () => {
    if (this.state.dataParts !== null) {
      return this.state.dataParts.map((item) => {
        return (
          <Option key={item.id} value={item.id}>
            {item.part_name}
          </Option>
        );
      });
    } else return "";
  };
  handleChangeParts = (value) => {
    this.setState({
      par_id: value,
    });
  };
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
                      Email cá nhân
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        value={this.state.email}
                        name="email"
                        onChange={this.onChange}
                        placeholder="Nhập email cá nhân"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Mật khẩu đăng nhập
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input.Password
                        value={this.state.password}
                        name="password"
                        onChange={this.onChange}
                        placeholder="Mật khẩu đăng nhập"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Số điện thoại
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        value={this.state.phone}
                        name="phone"
                        onChange={this.onChange}
                        placeholder="Số điện thoại"
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
                      Ngày sinh của user:
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
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Ghi chú thông tin căn bản
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="pro_note"
                        value={this.state.pro_note}
                        onChange={this.onChange}
                        placeholder="Ghi chú thông tin căn bản"
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
                      Chọn phòng ban:
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Select
                        value={this.state.dep_id}
                        // value=406
                        style={{ width: 450 }}
                        onChange={this.handleChangeDepartment}
                      >
                        {this.renderDepartment()}
                      </Select>
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Tổ làm việc
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Select
                        value={this.state.par_id}
                        // value=406
                        style={{ width: 450 }}
                        onChange={this.handleChangeParts}
                      >
                        {this.renderParts()}
                      </Select>
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">Chức vụ:</span>
                    <div className="tabs-user-infor-bottom">
                      <Select
                        value={this.state.pos_id}
                        // value=406
                        style={{ width: 450 }}
                        onChange={this.handleChangePosition}
                      >
                        {this.renderPosition()}
                      </Select>
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
                      Ghi chú về trình độ:
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="deg_note"
                        value={this.state.deg_note}
                        onChange={this.onChange}
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
                        onChange={this.onChange}
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
                        onChange={this.onChange}
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
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top">
                      Ghi chú số thẻ:
                    </span>
                    <div className="tabs-user-infor-bottom">
                      <Input
                        name="car_note"
                        value={this.state.car_note}
                        onChange={this.onChange}
                        placeholder="Ghi chú số thẻ"
                      />
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-submit">
                    <Button
                      className="btn-add-user"
                      onClick={this.handleSave}
                    >
                      Lưu
                    </Button>
                    <Button
                      className="btn-add-user"
                      onClick={this.handleSend}
                    >
                      Xác nhận
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  uiActionCreators: bindActionCreators(uiActions, dispatch),
});
export default connect(null, mapDispatchToProps)(CurriculumVitae);
