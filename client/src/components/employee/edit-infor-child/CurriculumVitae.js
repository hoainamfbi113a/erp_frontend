import React, { Component } from "react";
import docCookies from "doc-cookies";
import { Input, message } from "antd";
import { DatePicker } from "antd";
import { connect } from "react-redux";
import moment from "moment";
const { RangePicker } = DatePicker;
import { Radio } from "antd";
import axios from "axios";
import {
  getListDepartment,
  searchDepartment,
  updateDepartmentProfile,
} from "apis/departmentApi";
import { searchPosition } from "apis/positionApi";
import { searchParts, getListParts } from "apis/partsApi";
import { updateProfile } from "apis/profileApi";
import { updateUser } from "apis/authenticationApi";
import { updateUserDegree } from "apis/userDegreesApi";
import { updateWorkObject } from "apis/workObjectsApi";
import { updateJournalistCards } from "apis/journalistCardsApi";
import { validateInputFormUser } from "helpers/FuncHelper";
import { onChangeCoverFunc } from "helpers/changeHelper.js";
import { Select } from "antd";
const { Option } = Select;
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { bindActionCreators } from "redux";
import { getUserProfile } from "reduxToolkit/features/userProfileSlice";
import { formatDateNumber } from "../../../helpers/FuncHelper";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const id_user = docCookies.getItem("user_id");
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
      appointment_date: "",
      expire_date: "",
      position_association: "",
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
      dataDep_name: "",
      dataPos_name: "",
      dataPart_name: "",
      dataParts: null,
      avatar3x4: null,
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
      visibleInput: false,
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
  formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1],
      day = datePart[2];
    return day + "/" + month + "/" + year;
  }
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
    await this.handleInputValid("department", this.state.dep_id);
    await this.handleInputValid("position", this.state.pos_id);
    if (
      !this.state.valid_pro_name.isValid &&
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
        pro_birth_day: this.formatDateNumberAdd(this.state.pro_birth_day),
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
        pro_identity_card_when: this.formatDateNumberAdd(this.state.pro_identity_card_when),
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
        position_association: this.state.position_association,
        appointment_date:
          Date.parse(moment(this.state.appointment_date, "DD-MM-YYYY")) / 1000,
        expire_date:
          Date.parse(moment(this.state.expire_date, "DD-MM-YYYY")) / 1000,
      };
      console.log(paramsDepartment)
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
        deg_begin_study:
          Date.parse(moment(this.state.deg_begin_study, "DD-MM-YYYY")) / 1000,
        deg_end_study:
          Date.parse(moment(this.state.deg_end_study, "DD-MM-YYYY")) / 1000,
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
        car_number_day:
          Date.parse(moment(this.state.car_number_day, "DD-MM-YYYY")) / 1000,
        car_begin:
          Date.parse(moment(this.state.car_begin, "DD-MM-YYYY")) / 1000,
        car_end: Date.parse(moment(this.state.car_end, "DD-MM-YYYY")) / 1000,
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
        await this.props.getUserProfileActionCreatorsH(this.state.user_id);
        message.success("C???p nh??t th??ng tin th??nh c??ng");
        window.location.reload();
      } else {
        message.error("C???p nh???t th???t b???i");
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
    this.fetchData();
    this.fetChImg();
  };
  fetchData = async () => {
    this.props.uiActionCreatorsS();
    await this.fetchDataUser();
    this.props.uiActionCreatorsH();
  };
  fetchDataUser = async () => {
    this.setState({
      user_id: id_user,
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
      pro_note: data.pro_note,
      dep_id: data.department.data.dep_id,
      pos_id: data.department.data.pos_id,
      par_id: data.department.data.part_id,
      position_association: data.department.data.position_association,
      dataDep_name: data.department.data.dep_name,
      dataPos_name: data.department.data.pos_name,
      dataPart_name: data.department.data.part_name,
      appointment_date: data.department.data.appointment_date,
      expire_date:
        // data.department &&
        // data.department.data.expire_date.indexOf("1970-01-01") != 0
        //   ? data.department.data.expire_date
        //   : 
        null,
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
      deg_permanent_residence: data.userDegree
        ? data.userDegree.data.deg_permanent_residence
        : "",
      deg_education: data.userDegree ? data.userDegree.data.deg_education : "",
      deg_politic: data.userDegree ? data.userDegree.data.deg_politic : "",
      deg_foreign_language: data.userDegree
        ? data.userDegree.data.deg_foreign_language
        : "",
      deg_note: data.userDegree ? data.userDegree.data.deg_note : "",
      work_formality: data.workObject ? data.workObject.data.formality : "",
      work_note: data.workObject ? data.workObject.data.work_note : "",
      car_number: data.journalistCard
        ? data.journalistCard.data.car_number
        : "",
      car_number_day:
        data.journalistCard && data.journalistCard.data.car_number_day != null
          ? new Date(data.journalistCard.data.car_number_day * 1000)
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
  handleChangeEducation = (value) => {
    this.setState({
      deg_education: value,
    })
  }
  handleChangePolitic = (value) => {
    this.setState({
      deg_politic: value,
    })
  }
  handleChangeDiploma = (value) => {
    this.setState({
      deg_diploma: value,
    })
  }
  handleChangeLanguage = (value) => {
    this.setState({
      deg_foreign_language: value,
    })
  }
  handleChangeFormality = (value) => {
    this.setState({
      work_formality: value,
    })
  }
  onChangeCover = (e) => {
    onChangeCoverFunc(e, this.fetChImg, id_user);
  };
  fetChImg = () => {
    axios
      .get(`/api/user/resources/${id_user}`)
      .then((res) => {
        let resImg = res.data;
        let i = -1;
        for (let item of resImg) {
          i++;
          if (item.resource_type === "3x4") {
            let arrImg = res.data[i].resource_content;
            this.setState({
              avatar3x4: arrImg.content,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  renderButton = (value) => {
    console.log(value)
    if (value === 0) {
      return <p className="text-feedback-user">H??? s?? ch??a m???</p>;
    } else if (value === 1) {
      return (
        <p className="text-feedback-user"> Nh??n s??? ??ang t???o h??? s?? cho b???n! </p>
      );
    } else if (value === 2) {
      return (
        <li className="tabs-main-left-li tabs-main-left-li-submit">
          <span className="btn-add-user" onClick={this.handleSave}>
            L??u
          </span>
          <span className="btn-add-user" onClick={this.handleSend}>
            X??c nh???n
          </span>
        </li>
      );
    } else if (value === 3) {
      return <p className="text-feedback-user">H??? s?? ??ang ch??? duy???t</p>;
    } else {
      return <p className="text-feedback-user">H??? s?? ???? s???n s??ng</p>;
    }
  };
  formatDateNumberFunc = (value) => {
    return value == null ? null :
      moment(value.toString().includes("/")
        ? value
        : formatDateNumber(value, dateFormatList[0]),
        dateFormatList[0])
  }
  formatDateNumberAdd = (value) => {
    return value == null ? null : value.toString().includes("/") ?
      Date.parse(moment(value, "DD-MM-YYYY")) / 1000
      : value;
  }
  render() {
    return (
      <div className="edit-infor-form">
        {console.log(this.state.visibleInput)}
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
                    <div className="file-input btn-img34">
                      <div className="thumb_1 div-img-cover div-img-3x4">
                        <img
                          className="img-cover"
                          src={`data:image/jpeg;base64,${this.state.avatar3x4}`}
                          alt=""
                        />
                      </div>
                      <input
                        type="file"
                        name="selectedFile"
                        onChange={this.onChangeCover}
                        id="file-input"
                        className="file-input__input"
                      />
                      <label className="file-input__label" for="file-input">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          className="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Ch???nh s???a ???nh 3x4</span>
                      </label>
                    </div>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        H??? v?? t??n khai sinh:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          value={this.state.pro_name}
                          disabled={this.props.statusProfile === 4 ? true : false}
                          // this.props.statusProfile
                          name="pro_name"
                          onChange={this.onChange}
                          placeholder="Nh???p h??? v?? t??n khai sinh"
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
                      <span className="tabs-user-infor-top">Email c?? nh??n</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={true}
                          value={this.state.email}
                          name="email"
                          onChange={this.onChange}
                          placeholder="Nh???p email c?? nh??n"
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
                      <span className="tabs-user-infor-top">S??? ??i???n tho???i</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={true}
                          value={this.state.phone}
                          name="phone"
                          onChange={this.onChange}
                          placeholder="S??? ??i???n tho???i"
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
                        S??? ??i???n tho???i n???i b???:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_local_phone"
                          value={this.state.pro_local_phone}
                          onChange={this.onChange}
                          placeholder="S??? ??i???n tho???i n???i b???"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">B??t danh:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_pen_name"
                          value={this.state.pro_pen_name}
                          onChange={this.onChange}
                          placeholder="Nh???p B??t danh"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Ng??y sinh</span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                        <DatePicker
                          disabled={this.props.statusProfile === 4 ? true : false}
                          format={dateFormatList}
                          placeholder="Ch???n ng??y"
                          value={
                            this.formatDateNumberFunc(this.state.pro_birth_day)
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
                      <span className="tabs-user-infor-top">Gi???i t??nh:</span>
                      <div className="tabs-user-infor-bottom">
                        <Radio.Group
                          disabled={this.props.statusProfile === 4 ? true : false}
                          onChange={this.onChangeSex}
                          value={this.state.pro_gender}
                        >
                          <Radio value={1}>Nam</Radio>
                          <Radio value={2}>N???</Radio>
                          <Radio value={3}>Kh??c</Radio>
                        </Radio.Group>
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">N??i sinh:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_birth_place"
                          value={this.state.pro_birth_place}
                          onChange={this.onChange}
                          placeholder="N??i sinh c???a"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Qu?? qu??n:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_home_town"
                          value={this.state.pro_home_town}
                          onChange={this.onChange}
                          placeholder="N??i sinh c???a"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        H??? kh???u th?????ng tr??:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="deg_permanent_residence"
                          value={this.state.deg_permanent_residence}
                          onChange={this.onChange}
                          placeholder="H??? kh???u th?????ng tr??"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        N??i ??? hi???n t???i:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_resident"
                          value={this.state.pro_resident}
                          onChange={this.onChange}
                          placeholder="N??i ??? hi???n t???i"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">D??n t???c:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_ethnic"
                          value={this.state.pro_ethnic}
                          onChange={this.onChange}
                          placeholder="D??n t???c"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">T??n gi??o:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_religion"
                          value={this.state.pro_religion}
                          onChange={this.onChange}
                          placeholder="T??n gi??o"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Th??nh ph???n xu???t th??n:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_background_origin"
                          value={this.state.pro_background_origin}
                          onChange={this.onChange}
                          placeholder="Th??nh ph???n xu???t th??n c???a"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Ngh??? nghi???p khi ???????c tuy???n d???ng:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_occupation"
                          value={this.state.pro_occupation}
                          onChange={this.onChange}
                          placeholder="Nh???p ngh??? nghi???p khi ???????c tuy???n d???ng"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        S??? CCCD:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_identity_card"
                          value={this.state.pro_identity_card}
                          onChange={this.onChange}
                          placeholder="S??? CCCD"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Ng??y c???p CMND, CCCD :
                      </span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                        <DatePicker
                          disabled={this.props.statusProfile === 4 ? true : false}
                          format={dateFormatList}
                          placeholder="Ch???n ng??y"
                          value={
                            this.formatDateNumberFunc(this.state.pro_identity_card_when)
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
                        N??i c???p CCCD:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          name="pro_identity_card_where"
                          value={this.state.pro_identity_card_where}
                          disabled={this.props.statusProfile === 4 ? true : false}
                          onChange={this.onChange}
                          placeholder="N??i c???p CCCD"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Ghi ch?? th??ng tin c??n b???n
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_note"
                          value={this.state.pro_note}
                          onChange={this.onChange}
                          placeholder="Ghi ch?? th??ng tin c??n b???n"
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
                        Ch???n ph??ng ban:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_note"
                          value={this.state.dataDep_name}
                          placeholder="Ghi ch?? th??ng tin c??n b???n"
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
                      <span className="tabs-user-infor-top">T???: </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_note"
                          value={this.state.dataPart_name}
                          placeholder="Ghi ch?? th??ng tin c??n b???n"
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
                      <span className="tabs-user-infor-top">Ch???c v???:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="pro_note"
                          value={this.state.dataPos_name}
                          placeholder="Ghi ch?? th??ng tin c??n b???n"
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
                        Ng??y b??? nhi???m ch???c v??? :
                      </span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                        <DatePicker
                          disabled={this.props.statusProfile === 4 ? true : false}
                          format={dateFormatList}
                          placeholder="Ch???n ng??y"
                          style={{ width: "100%" }}
                          value={
                            this.state.appointment_date == null ||
                              moment(
                                this.state.appointment_date,
                                dateFormatList[0]
                              ) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(
                                this.state.appointment_date,
                                dateFormatList[0]
                              )
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
                      <span className="tabs-user-infor-top">
                        Ng??y h???t h???n b??? nhi???m ch???c v??? :
                      </span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                        <DatePicker
                          disabled={this.props.statusProfile === 4 ? true : false}
                          format={dateFormatList}
                          placeholder="Ch???n ng??y"
                          style={{ width: "100%" }}
                          value={
                            this.state.expire_date == null ||
                              moment(
                                this.state.expire_date,
                                dateFormatList[0]
                              ) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(
                                this.state.expire_date,
                                dateFormatList[0]
                              )
                          }
                          onChange={(date, dateString) =>
                            this.onChangeBirthDay(
                              date,
                              dateString,
                              "expire_date"
                            )
                          }
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Ch???c v??? ??o??n th???:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="position_association"
                          value={this.state.position_association}
                          onChange={this.onChange}
                          placeholder="Ch???c v??? ??o??n th???"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">H???c v???n:</span>
                      <div className="tabs-user-infor-bottom">
                        <Select
                          disabled={this.props.statusProfile === 4 ? true : false}
                          onChange={this.handleChangeEducation}
                          name="deg_education"
                          value={this.state.deg_education}
                        >
                          <Option value="Trung c???p">Trung c???p</Option>
                          <Option value="Cao ?????ng">Cao ?????ng</Option>
                          <Option value="?????i h???c (??ang ch??? l???y b???ng)">?????i h???c (??ang ch??? l???y b???ng) </Option>
                          <Option value="?????i h???c">?????i h???c</Option>
                          <Option value="Th???c s??">Th???c s??</Option>
                          <Option value="Kh??c">Kh??c</Option>
                        </Select>
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Ch??nh tr???:</span>
                      <div className="tabs-user-infor-bottom">
                        <Select
                          disabled={this.props.statusProfile === 4 ? true : false}
                          onChange={this.handleChangePolitic}
                          name="deg_politic"
                          value={this.state.deg_politic}
                        >
                          <Option value="S?? c???p">S?? c???p</Option>
                          <Option value="Trung c???p t????ng ??????ng">Trung c???p t????ng ??????ng</Option>
                          <Option value="Trung c???p ch??nh quy">Trung c???p ch??nh quy </Option>
                          <Option value="Cao c???p">Cao c???p</Option>
                          <Option value="C??? nh??n">C??? nh??n</Option>
                          <Option value="Kh??c">Kh??c</Option>
                        </Select>
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Ngo???i ng???::</span>
                      <div className="tabs-user-infor-bottom">
                        <Select
                          disabled={this.props.statusProfile === 4 ? true : false}
                          onChange={this.handleChangeLanguage}
                          name="deg_foreign_language"
                          value={this.state.deg_foreign_language}
                        >
                          <Option value="Ng??n ng??? Anh">Ng??n ng??? Anh</Option>
                          <Option value="Ng??n ng??? Trung ">Ng??n ng??? Trung </Option>
                          <Option value="Ng??n ng??? H??n">Ng??n ng??? H??n </Option>
                          <Option value="Ng??n ng??? Nh???t">Ng??n ng??? Nh???t</Option>
                          <Option value="Ng??n ng??? Ph??p">Ng??n ng??? Ph??p</Option>
                          <Option value="Ng??n ng??? T??y Ban Nha">Ng??n ng??? T??y Ban Nha</Option>
                          <Option value="Ng??n ng??? B??? ????? Nha">Ng??n ng??? B??? ????? Nha</Option>
                          <Option value="Ng??n ng??? Nga">Ng??n ng??? Nga</Option>
                          <Option value="Kh??c">Kh??c</Option>
                        </Select>
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Tr??nh ????? chuy??n m??n:</span>
                      <div className="tabs-user-infor-bottom">
                        <Select
                          disabled={this.props.statusProfile === 4 ? true : false}
                          onChange={this.handleChangeDiploma}
                          name="deg_diploma"
                          value={this.state.deg_diploma}
                        >
                          <Option value="B??o ch??">B??o ch??</Option>
                          <Option value="Ch??nh tr??? h???c">Ch??nh tr??? h???c</Option>
                          <Option value="C??ng ngh??? th??ng tin">C??ng ngh??? th??ng tin</Option>
                          <Option value="C?? kh??">C?? kh??</Option>
                          <Option value="Lu???t">Lu???t</Option>
                          <Option value="Kinh t???">Kinh t???</Option>
                          <Option value="K??? to??n">K??? to??n</Option>
                          <Option value="K?? thu???t in">K?? thu???t in</Option>
                          <Option value="M??? thu???t">M??? thu???t</Option>
                          <Option value="Ngo???i ng???">Ngo???i ng???</Option>
                          <Option value="Qu???c t??? h???c">Qu???c t??? h???c</Option>
                          <Option value="Qu???n tr??? kinh doanh">Qu???n tr??? kinh doanh</Option>
                          <Option value="Quan h??? qu???c t???">Quan h??? qu???c t???</Option>
                          <Option value="Th?? vi???n, qu???n tr??? v??n ph??ng">Th?? vi???n, qu???n tr??? v??n ph??ng</Option>
                          <Option value="S?? ph???m">S?? ph???m</Option>
                          <Option value="X?? h???i h???c">X?? h???i h???c</Option>
                          <Option value="V??n h???c">V??n h???c</Option>
                          <Option value="Kh??c">Kh??c</Option>
                          <Option value="Kh??c">Kh??c</Option>
                        </Select>
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Chuy??n ng??nh:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="deg_majors"
                          value={this.state.deg_majors}
                          onChange={this.onChange}
                          placeholder="Chuy??n ng??nh"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        ?????i t?????ng lao ?????ng:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        {/* <Input
                          name="work_formality"
                          value={this.state.work_formality}
                          onChange={this.onChange}
                          placeholder="?????i t?????ng lao ?????ng"
                        /> */}
                        <Select
                          disabled={this.props.statusProfile === 4 ? true : false}
                          onChange={this.handleChangeFormality}
                          name="work_formality"
                          value={this.state.work_formality}
                        >
                          <Option value="Th???c t???p sinh">Th???c t???p sinh</Option>
                          <Option value="Kho??n vi???c">Kho??n vi???c</Option>
                          <Option value="Nh??n vi??n th???i v???">Nh??n vi??n th???i v???</Option>
                          <Option value="Nh??n vi??n ch??nh th???c">Nh??n vi??n ch??nh th???c</Option>
                          <Option value="Kh??c">Kh??c</Option>
                        </Select>
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Ghi ch?? ?????i t?????ng lao ?????ng:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="work_note"
                          value={this.state.work_note}
                          onChange={this.onChange}
                          placeholder="Ghi ch?? ?????i t?????ng lao ?????ng"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">S??? th??? nh?? b??o:</span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="car_number"
                          value={this.state.car_number}
                          onChange={this.onChange}
                          placeholder="S??? th???"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Ng??y c???p th??? nh?? b??o:</span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                        <DatePicker
                          disabled={this.props.statusProfile === 4 ? true : false}
                          format={dateFormatList}
                          placeholder="Ch???n ng??y"
                          style={{ width: "100%" }}
                          value={
                            this.state.car_number_day == null ||
                              moment(
                                this.state.car_number_day,
                                dateFormatList[0]
                              ) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(
                                this.state.car_number_day,
                                dateFormatList[0]
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
                        Th???i gian th??? nh?? b??o hi???u l???c:
                      </span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                        <RangePicker
                          disabled={this.props.statusProfile === 4 ? true : false}
                          placeholder={["T??? ng??y", "?????n ng??y"]}
                          value={
                            this.state.car_begin == null
                              ? null
                              : [
                                this.state.car_begin == null ||
                                  moment(
                                    this.state.car_begin,
                                    dateFormatList[0]
                                  ) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
                                    this.state.car_begin,
                                    dateFormatList[0]
                                  ),
                                this.state.car_end == null ||
                                  moment(
                                    this.state.car_end,
                                    dateFormatList[0]
                                  ) == "Thu Jan 01 1970 08:00:00 GMT+0800"
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
                        Ghi ch?? s??? th??? nh?? b??o:
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.statusProfile === 4 ? true : false}
                          name="car_note"
                          value={this.state.car_note}
                          onChange={this.onChange}
                          placeholder="Ghi ch?? s??? th???"
                        />
                      </div>
                    </li>
                    {this.renderButton(this.props.statusProfile)}
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
    userProfileState: state.userProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  uiActionCreatorsS: bindActionCreators(showLoading, dispatch),
  uiActionCreatorsH: bindActionCreators(hideLoading, dispatch),
  getUserProfileActionCreatorsH: bindActionCreators(getUserProfile, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CurriculumVitae);
