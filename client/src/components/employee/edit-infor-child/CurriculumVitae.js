import React, { Component } from "react";
import docCookies from "doc-cookies";
import { Input, message } from "antd";
import { DatePicker } from "antd";
import { connect } from "react-redux";
import moment from "moment";
const { RangePicker } = DatePicker;
import { Radio } from "antd";
import {
  getListDepartment,
  searchDepartment,
  updateDepartmentProfile,
} from "apis/departmentApi";
import { getListPosition, searchPosition } from "apis/positionApi";
import { searchParts, getListParts } from "apis/partsApi";
import { getProfile, updateProfile } from "apis/profileApi";
import { updateUser, getUser } from "apis/authenticationApi";
import { updateUserDegree } from "apis/userDegreesApi";
import { updateWorkObject } from "apis/workObjectsApi";
import { updateJournalistCards } from "apis/journalistCardsApi";
import { validateInputFormUser } from "helpers/FuncHelper";
import { Select } from "antd";
const { Option } = Select;
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { bindActionCreators } from "redux";
import {sleep} from "helpers/FuncHelper";
import { getUserProfile } from "reduxToolkit/features/userProfileSlice";
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
class CurriculumVitae extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      user_id: null,
      pro_id: null,
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
      pro_note: null,
      dep_name: null,
      dep_position: null,
      dep_appointment_date: "",
      dep_note: null,
      deg_type: null,
      deg_diploma: null,
      deg_majors: null,
      deg_school_name: null,
      deg_begin_study: "",
      deg_end_study: "",
      deg_note: null,
      work_formality: null,
      work_note: null,
      car_number: null,
      car_number_day: null,
      car_begin: null,
      car_end: null,
      car_note: null,
      idDepartment: null,
      idUserDegree: null,
      idWorkObject: null,
      idJou: null,
      dataDepartment: null,
      dataPosition: null,
      dataDep_name:"",
      dataPos_name:"",
      dataPart_name:"",
      dataParts: null,
      valid_pro_name: {
        isValid: true,
        errorMessage: "",
      },
      valid_email: {
        isValid: true,
        errorMessage: "",
      },

      valid_phone: {
        isValid: true,
        errorMessage: "",
      },
      valid_department: {
        isValid: true,
        errorMessage: "",
      },
      valid_part: {
        isValid: true,
        errorMessage: "",
      },
      valid_position: {
        isValid: true,
        errorMessage: "",
      },
      searchDepartment: "",
      searchPosition: "",
      searchPart: "",
    };
    this.typingRef = React.createRef(null);
    this.handleSearchDepartment = this.handleSearchDepartment.bind(this);
    this.handleSearchPosition = this.handleSearchPosition.bind(this);
    this.handleSearchPart = this.handleSearchPart.bind(this);
  }
  functionSearch = async (prevProps, prevState) => {
    if (prevState.searchDepartment !== this.state.searchDepartment) {
      const value = this.state.searchDepartment;
      let resSearchDepartment = await searchDepartment(value);
      if (!resSearchDepartment.err) {
        this.setState({
          dataDepartment: resSearchDepartment.data,
        });
      } else {
        message.error("search failed");
      }
    }

    if (prevState.searchPosition !== this.state.searchPosition) {
      const value = this.state.searchPosition;
      let resSearchPosition = await searchPosition(value);
      if (!resSearchPosition.err) {
        this.setState({
          dataPosition: resSearchPositiones.data,
        });
      } else {
        message.error("search position failed");
      }
    }
    if (prevState.dep_id !== this.state.dep_id) {
      this.setState({
        dataParts: [],
      });
    }
    if (prevState.searchPart !== this.state.searchPart) {
      const value = this.state.searchPart;
      const { dep_id } = this.state;
      let resSearchParts = await searchParts(dep_id, value);
      if (!resSearchParts.err) {
        this.setState({
          dataParts: resSearchParts.data,
        });
      } else {
        message.error("search part failed");
      }
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    this.functionSearch(prevProps, prevState);
  };
  onAddInforUser = (value) => {
    this.handleEdit(value);
  };
  handleEdit = async (value) => {
    let userId = this.state.user_id;
    let messageErr = 0;
    await this.handleInputValid("pro_name", this.state.pro_name);
    // await this.handleInputValid("phone", this.state.phone);
    // await this.handleInputValid("part", this.state.par_id);
    await this.handleInputValid("department", this.state.dep_id);
    await this.handleInputValid("position", this.state.pos_id);
    if (
      !this.state.valid_pro_name.isValid &&
      !this.state.valid_phone.isValid &&
      // !this.state.valid_part.isValid &&
      !this.state.valid_department.isValid &&
      !this.state.valid_position.isValid
    ) {
      this.props.uiActionCreatorsS();
      let paramsUser = {
        full_name: this.state.pro_name,
        email: this.state.email,
        phone: this.state.phone,
      };
      let resUpdateUser = await updateUser(userId, paramsUser);
      if (resUpdateUser.message === "Success!. Stored") {
      } else {
        messageErr: 1;
      }
      let params = {
        user_id: userId,
        button: value,
        action: "update",
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
      let resUpdateProfile = await updateProfile(this.state.pro_id, params);
      if (resUpdateProfile.message == "Success!. Updated") {
      } else {
        messageErr = 2;
      }
      let paramsDepartment = {
        pro_id: this.state.pro_id,
        user_id: this.state.user_id,
        dep_id: this.state.dep_id,
        pos_id: this.state.pos_id,
        part_id: this.state.par_id,
        appointment_date: Date.parse(this.state.appointment_date) / 1000,
      };
      let resUpdateDepartmentProfile = await updateDepartmentProfile(
        this.state.pro_id,
        paramsDepartment
      );
      if (resUpdateDepartmentProfile.message == "Success!. Updated") {
      } else {
        messageErr = 4;
      }
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
        deg_permanent_residence: this.state.deg_permanent_residence,
        deg_education: this.state.deg_education,
        deg_politic: this.state.deg_politic,
        deg_foreign_language: this.state.deg_foreign_language,
      };
      let resUpdateUserDegree = await updateUserDegree(
        this.state.idUserDegree,
        paramsUserDegrees
      );
      if (resUpdateUserDegree.message == "Success!. Updated") {
      } else {
        messageErr = 6;
      }
      let paramsWorkObjects = {
        user_id: this.state.user_id,
        pro_id: this.state.pro_id,
        work_formality: this.state.work_formality,
        work_note: this.state.work_note,
      };
      let resUpdateWorkObject = await updateWorkObject(
        this.state.idWorkObject,
        paramsWorkObjects
      );
      if (resUpdateWorkObject.message == "Success!. Updated") {
        // message;
      } else {
        messageErr = 8;
      }
      let paramsJournalistCards = {
        user_id: this.state.user_id,
        pro_id: this.state.pro_id,
        car_number: this.state.car_number,
        car_number_day: Date.parse(this.state.car_number_day),
        car_begin: Date.parse(this.state.car_begin) / 1000,
        car_end: Date.parse(this.state.car_end) / 1000,
        car_note: this.state.car_note,
      };
      let resUpdateJournalistCards = await updateJournalistCards(
        this.state.idJou,
        paramsJournalistCards
      );
      if (resUpdateJournalistCards.message == "Success!. Updated") {
      } else {
        messageErr = 10;
      }
      await this.fetchData();
      this.props.uiActionCreatorsH();
      if (messageErr == 0) {
        await this.props.getUserProfileActionCreatorsH(this.state.user_id)
        message.success("Cập nhât thông tin thành công");
        window.location.reload();
        // this.props.handleReloadComponent();
      } else {
        message.error("Cập nhật thất bại");
      }
    }
  };
  handleSave = () => {
    this.onAddInforUser("save");
  };
  handleSend = () => {
    this.onAddInforUser("send");
  };
  onChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value }, () => {
      this.handleInputValid(name, value);
    });
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
    this.fetchData()
  };
  fetchData = async () => {
    this.props.uiActionCreatorsS();
    await this.fetchDataUser();
    this.props.uiActionCreatorsH();
  };
  fetchDataUser = async () => {
    let idUser = docCookies.getItem("user_id");
    this.setState({
      user_id: idUser,
    });
    const user = this.props.userState;
    this.setState({
      full_name: user.full_name,
      phone: user.phone,
      email: user.email,
    });
    const data = this.props.userProfileState;
    this.setState({
      pro_id: data.id,
      user_id: data.user_id,
      pro_name: data.pro_name,
      pro_pen_name: data.pro_pen_name,
      pro_birth_day:
        data.pro_birth_day.indexOf("1970-01-01") == 0
          ? null
          : data.pro_birth_day,
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
      pro_identity_card_when:
        data.pro_identity_card_when.indexOf("1970-01-01") == 0
          ? null
          : data.pro_identity_card_when,
      pro_identity_card_where: data.pro_identity_card_where,
      pro_note: data.pro_note,
      dep_id: data.department.data.dep_id,
      pos_id: data.department.data.pos_id,
      par_id: data.department.data.part_id,
      dataDep_name: data.department.data.dep_name,
      dataPos_name: data.department.data.pos_name,
      dataPart_name: data.department.data.part_name,
      appointment_date:
        data.department &&
        data.department.data.appointment_date.indexOf("1970-01-01") != 0
          ? data.department.data.appointment_date
          : null,
      deg_type: data.userDegree ? data.userDegree.data.deg_type : "",
      deg_diploma: data.userDegree ? data.userDegree.data.deg_diploma : "",
      deg_majors: data.userDegree ? data.userDegree.data.deg_majors : "",
      deg_school_name: data.userDegree
        ? data.userDegree.data.deg_school_name
        : "",
      deg_begin_study:
        data.userDegree && data.userDegree.data.deg_begin_study != null
          ? new Date(data.userDegree.data.deg_begin_study * 1000)
          : null,
      deg_end_study:
        data.userDegree && data.userDegree.data.deg_end_study != null
          ? new Date(data.userDegree.data.deg_end_study * 1000)
          : null,
      deg_permanent_residence: data.userDegree ? data.userDegree.data.deg_permanent_residence : "",
      deg_education: data.userDegree ? data.userDegree.data.deg_education : "",
      deg_politic: data.userDegree ? data.userDegree.data.deg_politic : "",
      deg_foreign_language: data.userDegree ? data.userDegree.data.deg_foreign_language : "",
      deg_note: data.userDegree ? data.userDegree.data.deg_note : "",
      work_formality: data.workObject ? data.workObject.data.formality : "",
      work_note: data.workObject ? data.workObject.data.work_note : "",
      car_number: data.journalistCard
        ? data.journalistCard.data.car_number
        : "",
      car_number_day:
        data.journalistCard && data.journalistCard.data.car_number_day != null
          ? new Date(data.journalistCard.data.car_number_day)
          : null,
      car_begin:
        data.journalistCard && data.journalistCard.data.car_begin != null
          ? new Date(data.journalistCard.data.car_begin * 1000)
          : null,
      car_end:
        data.journalistCard && data.journalistCard.data.car_end != null
          ? new Date(data.journalistCard.data.car_end * 1000)
          : null,
      car_note: data.journalistCard ? data.journalistCard.data.car_note : "",
      idDepartment: data.department ? data.department.data.id : "",
      idUserDegree: data.userDegree ? data.userDegree.data.id : "",
      idWorkObject: data.workObject ? data.workObject.data.id : "",
      idJou: data.journalistCard ? data.journalistCard.data.id : "",
    });
  };
  handleSearchDepartment(value) {
    if (this.typingRef.current) {
      clearTimeout(this.typingRef.current);
    }
    this.typingRef.current = setTimeout(() => {
      this.setState({
        searchDepartment: value,
      });
    }, 500);
  }
  handleSearchPosition(value) {
    if (this.typingRef.current) {
      clearTimeout(this.typingRef.current);
    }
    this.typingRef.current = setTimeout(() => {
      this.setState({
        searchPosition: value,
      });
    }, 500);
  }
  handleSearchPart(value) {
    if (this.typingRef.current) {
      clearTimeout(this.typingRef.current);
    }
    this.typingRef.current = setTimeout(() => {
      this.setState({
        searchPart: value,
      });
    }, 500);
  }
  handFocusDepartment = () => {
    this.setState({
      dep_id: null,
      par_id: null,
    });
  };
  handFocusPart = () => {
    this.setState({
      par_id: null,
    });
  };
  handFocusPosition = () => {
    this.setState({
      pos_id: null,
    });
  };
  handleInputValid = (name, value) => {
    const { isValid, errorMessage } = validateInputFormUser(name, value);
    this.setState({
      [`valid_${name}`]: {
        isValid: isValid,
        errorMessage: errorMessage,
      },
    });
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
  handleChangeDepartment = (value) => {
    this.setState(
      {
        dep_id: value,
      },
      async () => {
        await this.handleInputValid("department", value);
      }
    );
  };

  handleChangePosition = (value) => {
    this.setState(
      {
        pos_id: value,
      },
      async () => {
        await this.handleInputValid("position", value);
      }
    );
  };

  handleChangeParts = (value) => {
    this.setState(
      {
        par_id: value,
      },
      async () => {
        await this.handleInputValid("part", value);
      }
    );
  };
  renderButton = (value) => {
    if (value === 0) {
      return <p className="text-feedback-user">Hồ sơ chưa mở</p>;
    } else if (value === 1) {
      return (
        <p className="text-feedback-user"> Nhân sự đang tạo hồ sơ cho bạn! </p>
      );
    } else if (value === 2) {
      return (
        <li className="tabs-main-left-li tabs-main-left-li-submit">
          <span className="btn-add-user" onClick={this.handleSave}>
            Lưu
          </span>
          <span className="btn-add-user" onClick={this.handleSend}>
            Xác nhận
          </span>
        </li>
      );
    } else if (value === 3) {
      return <p className="text-feedback-user">Hồ sơ đang chờ duyệt</p>;
    } else {
      return <p className="text-feedback-user">Hồ sơ đã sẵn sàng</p>;
    }
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
                          onChange={this.onChange}
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
                          disabled={true}
                          value={this.state.email}
                          name="email"
                          onChange={this.onChange}
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
                      <span className="tabs-user-infor-top">Số điện thoại</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          value={this.state.phone}
                          name="phone"
                          onChange={this.onChange}
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
                      <span className="tabs-user-infor-top">Ngày sinh</span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                      <DatePicker
                          format={dateFormatList}
                          placeholder="Chọn ngày"
                          value={
                            this.state.pro_birth_day == null || moment(this.state.pro_birth_day,dateFormatList[0]) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(this.state.pro_birth_day, dateFormatList[0])
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
                      <span className="tabs-user-infor-top">Giới tính:</span>
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
                        Quê quán:
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
                        Hộ khẩu thường trú:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="deg_permanent_residence"
                          value={this.state.deg_permanent_residence}
                          onChange={this.onChange}
                          placeholder="Hộ khẩu thường trú"
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
                        format={dateFormatList}
                          placeholder="Chọn ngày"
                          value={
                            this.state.pro_identity_card_when == null || moment(this.state.pro_identity_card_when,dateFormatList[0]) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(
                                  this.state.pro_identity_card_when,
                                  dateFormatList[0]
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
            <div className="tabs-main-right" style={{ width: "41%" }}>
              <div className="tabs-main-left-content">
                <div className="tabs-main-left">
                  <ul className="tabs-main-left-ul">
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Chọn phòng ban:
                      </span>
                      <div className="tabs-user-infor-bottom">
                      <Input
                          name="pro_note"
                          value={this.state.dataDep_name}
                          placeholder="Ghi chú thông tin căn bản"
                        />
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
                      <span className="tabs-user-infor-top">Tổ: </span>
                      <div className="tabs-user-infor-bottom">
                      <Input
                          name="pro_note"
                          value={this.state.dataPart_name}
                          placeholder="Ghi chú thông tin căn bản"
                        />
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
                      <Input
                          name="pro_note"
                          value={this.state.dataPos_name}
                          placeholder="Ghi chú thông tin căn bản"
                        />
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
                        format={dateFormatList}
                          placeholder="Chọn ngày"
                          style={{ width: "100%" }}
                          value={
                            this.state.appointment_date == null || moment(this.state.appointment_date,dateFormatList[0]) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(this.state.appointment_date, dateFormatList[0])
                          }
                          onChange={(date, dateString) =>
                            this.onChangeBirthDay(
                              date,
                              dateString,
                              "appointment_date"
                            )
                          }
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Học vấn:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="deg_education"
                          value={this.state.deg_education}
                          onChange={this.onChange}
                          placeholder="Học vấn"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Chính trị:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="deg_politic"
                          value={this.state.deg_politic}
                          onChange={this.onChange}
                          placeholder="Chính trị"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Ngoại ngữ:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="deg_foreign_language"
                          value={this.state.deg_foreign_language}
                          onChange={this.onChange}
                          placeholder="Ngoại ngữ"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Trình độ:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="deg_diploma"
                          value={this.state.deg_diploma}
                          onChange={this.onChange}
                          placeholder="Trình độ"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Chuyên ngành:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="deg_majors"
                          value={this.state.deg_majors}
                          onChange={this.onChange}
                          placeholder="Chuyên ngành"
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
                        Hình thức đào tạo:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="deg_type"
                          value={this.state.deg_type}
                          onChange={this.onChange}
                          placeholder="Hình thức đào tạo"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Thời gian bắt đầu học:
                      </span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                      <RangePicker
                        placeholder = {["Từ ngày", "Đến ngày"]}
                         value={
                          this.state.deg_begin_study == null
                            ? null
                            : [
                                this.state.deg_begin_study == null ||
                                moment(this.state.deg_begin_study,dateFormatList[0]) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
                                      this.state.deg_begin_study,
                                      dateFormatList[0]
                                    ),
                                this.state.deg_end_study == null ||
                                moment(this.state.deg_end_study,dateFormatList[0]) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
                                      this.state.deg_end_study,
                                      dateFormatList[0]
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
                          format={dateFormatList}
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
                      <span className="tabs-user-infor-top">Ngày cấp thẻ:</span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                      <DatePicker
                        format={dateFormatList}
                          placeholder="Chọn ngày"
                          style={{ width: "100%" }}
                          value={
                            this.state.car_number_day == null || moment(this.state.car_number_day,dateFormatList[0]) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(this.state.car_number_day, dateFormatList[0])
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
                        placeholder = {["Từ ngày", "Đến ngày"]}
                         value={
                          this.state.car_begin == null
                            ? null
                            : [
                                this.state.car_begin == null ||
                                moment(this.state.car_begin,dateFormatList[0]) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
                                      this.state.car_begin,
                                      dateFormatList[0]
                                    ),
                                this.state.car_end == null ||
                                moment(this.state.car_end,dateFormatList[0]) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
                                      this.state.car_end,
                                      dateFormatList[0]
                                    ),
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
                          format={dateFormatList}
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
                    {this.renderButton(this.props.statusProfile)}
                    {/* {this.props.statusProfile == 2 ? (
                      <li className="tabs-main-left-li tabs-main-left-li-submit">
                        <span
                          className="btn-add-user"
                          onClick={this.handleSave}
                        >
                          Lưu
                        </span>
                        <span
                          className="btn-add-user"
                          onClick={this.handleSend}
                        >
                          Xác nhận
                        </span>
                      </li>
                    ) : (
                      "Bạn chỉ được xem hãy liên hệ nhân sự để được chỉnh sửa"
                    )} */}
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
const mapStateToProps = (state) => {
  return {
    userState: state.user,
    userProfileState: state.userProfile
  }
}

const mapDispatchToProps =  (dispatch) => ({
  uiActionCreatorsS: bindActionCreators(showLoading, dispatch),
  uiActionCreatorsH: bindActionCreators(hideLoading, dispatch),
  getUserProfileActionCreatorsH: bindActionCreators(getUserProfile, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CurriculumVitae);
