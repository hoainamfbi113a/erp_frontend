import {
  DatePicker,
  Input,
  message,
  Popconfirm,
  Radio,
  Select,
  Steps,
} from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { getUser, register, updateUser } from "apis/authenticationApi";
import {
  addDepartmentProfile,
  getListDepartment,
  searchDepartment,
  updateDepartmentProfile,
} from "apis/departmentApi";
import {
  addJournalistCards,
  updateJournalistCards,
} from "apis/journalistCardsApi";
import { searchParts, getListParts } from "apis/partsApi";
import { getListPosition, searchPosition } from "apis/positionApi";
import { addProfile, getProfile, updateProfile } from "apis/profileApi";
import { transfersProfile } from "apis/transfersApi";
import { addUserDegrees, updateUserDegree } from "apis/userDegreesApi";
import { workflowProfile } from "apis/workflowApi";
import { addWorkObject, updateWorkObject } from "apis/workObjectsApi";
import { listUser } from "apis/authenticationApi";
import { validateInputFormUser } from "helpers/FuncHelper";
import { showLoading, hideLoading} from "reduxToolkit/features/uiLoadingSlice"
const { Option } = Select;
const { Step } = Steps;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
class addInformationUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser:[],
      pro_id_saved: null,
      idSaved: null,
      dataUser: {},
      STATUS_PROFILE: -1,
      step_id: -1,
      dataDepartment: null,
      dataPosition: null,
      dataWorkflowProfile: null,
      dataParts: null,
      dataPartsInit:null,
      user_id: null,
      pro_id: null,
      pro_name: null,
      email: null,
      phone: null,
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
      dep_id: null,
      pos_id: null,
      par_id: null,
      dep_name: null,
      dep_position: null,
      appointment_date: null,
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
      modalNotify: false,
      reasonDeny: null,
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
  componentDidMount = async () => {
    this.fetchData();
  };
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
        message.error("search position faile");
      }
    }
    if (prevState.dep_id !== this.state.dep_id) {
      let arrParts = this.state.dataPartsInit;
      let idDep = this.state.dep_id
      let arrPartOfDep = []
      for(let item of arrParts) {
        if(idDep === item.dep_id){
          arrPartOfDep.push(item)
        }
      }
      this.setState({
        dataParts: arrPartOfDep,
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

  fetchData = async () => {
    this.props.uiActionCreatorsS();
    this.fetchDataUser();
    let dataDepartment = await getListDepartment();
    let dataPosition = await getListPosition();
    let dataParts = await getListParts();
    let dataWorkflowProfile = await workflowProfile();
    let resListUser = await listUser(100);
    this.setState({
      dataDepartment: dataDepartment.data,
      dataPosition: dataPosition.data,
      dataWorkflowProfile,
      dataParts: dataParts.data,
      dataPartsInit:dataParts.data,
      listUser:resListUser.data
    });
    this.props.uiActionCreatorsH();
  };

  fetchDataUser = async () => {
    
    if (this.props.idUser) {
      let idUser = this.props.idUser;
      let dataUser = null;
      let pro_id = 0;
      let resGetUser = await getUser(idUser);
      this.setState({
        full_name: resGetUser.data.full_name,
        phone: resGetUser.data.phone,
        email: resGetUser.data.email,
      });
      dataUser = await getProfile(idUser);
      pro_id = dataUser.data.id;
      const data = dataUser.data;
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
        dep_id: data.department ? data.department.data.dep_id : "",
        pos_id: data.department ? data.department.data.pos_id : "",
        par_id: data.department ? data.department.data.part_id : "",
        appointment_date:
          // new Date(
          data.department ? data.department.data.appointment_date : "",
        // * 1000)
        deg_type: data.userDegree ? data.userDegree.data.deg_type : "",
        deg_diploma: data.userDegree ? data.userDegree.data.deg_diploma : "",
        deg_majors: data.userDegree ? data.userDegree.data.deg_majors : "",
        deg_school_name: data.userDegree
          ? data.userDegree.data.deg_school_name
          : "",
        deg_begin_study: data.userDegree
          ? new Date(data.userDegree.data.deg_begin_study * 1000)
          : null,
        deg_end_study: data.userDegree
          ? new Date(data.userDegree.data.deg_end_study * 1000)
          : null,
        deg_note: data.userDegree ? data.userDegree.data.deg_note : "",
        work_formality: data.workObject ? data.workObject.data.formality : "",
        work_note: data.workObject ? data.workObject.data.work_note : "",
        car_number: data.journalistCard
          ? data.journalistCard.data.car_number
          : "",
        car_number_day: data.journalistCard
          ? new Date(data.journalistCard.data.car_number_day)
          : null,
        car_begin: data.journalistCard
          ? new Date(data.journalistCard.data.car_begin * 1000)
          : null,
        car_end: data.journalistCard
          ? new Date(data.journalistCard.data.car_end * 1000)
          : null,
        car_note: data.journalistCard ? data.journalistCard.data.car_note : "",
        idDepartment: data.department ? data.department.data.id : "",
        idUserDegree: data.userDegree ? data.userDegree.data.id : "",
        idWorkObject: data.workObject ? data.workObject.data.id : "",
        idJou: data.journalistCard ? data.journalistCard.data.id : "",
      });
      let dataTransfersProfile = await transfersProfile(pro_id);
      this.setState({
        STATUS_PROFILE: dataTransfersProfile.data.after_status,
        step_id: dataTransfersProfile.data.next_step_id,
      });
    }
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
  handleConfirm = async () => {
    let idUser = this.props.idUser;
    let params = {
      user_id: idUser,
      reject: 0,
      action: "confirm",
      notify_content: "xac nhan ho so hoan tat",
    };
    let resUpdateProfile = await updateProfile(this.state.pro_id, params);
    if (resUpdateProfile.message) {
      message.success("Duyệt thông tin nhân sự thành công");
      window.location.reload();
    } else {
      message.error("Duyệt hồ sơ thất bại");
    }
  };
  // nhân sự từ chối
  handleReject = async () => {
    this.setState({
      modalNotify: true,
    });
  };
  valueReasonDeny = (value) => {
    this.setState({
      reasonDeny: value,
    });
  };
  renderDepartment = () => {
    if (this.state.dataDepartment) {
      return this.state.dataDepartment.map((item) => {
        return (
          <Option key={item.id} value={item.id}>
            {item.dep_name}
          </Option>
        );
      });
    } else {
      return "";
    }
  };
  handleChangeDepartment = (value) => {
    this.setState(
      {
        dep_id: value,
      },
      () => {
        this.handleInputValid("department", value);
      }
    );
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
    this.setState(
      {
        pos_id: value,
      },
      () => {
        this.handleInputValid("position", value);
      }
    );
  };
  renderParts = () => {
    // console.log(this.state.dataParts)
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
    this.setState(
      {
        par_id: value,
      },
      () => {
        this.handleInputValid("part", value);
      }
    );
  };
  onAddInforUser = (value) => {
    if (this.props.idUser) {
      this.handleEdit(value);
    } else {
      this.handleAdd(value);
    }
  };
  handleAdd = async (value) => {
    this.props.uiActionCreatorsS();
    let messageErr = 0;
    let userId = 0;
    let proId = 0;
    await this.handleInputValid("pro_name", this.state.pro_name);
    await this.handleInputValid("email", this.state.email);
    await this.handleInputValid("phone", this.state.phone);
    await this.handleInputValid("part", this.state.par_id);
    await this.handleInputValid("department", this.state.dep_id);
    await this.handleInputValid("position", this.state.pos_id);
    if (
      !this.state.valid_pro_name.isValid &&
      !this.state.valid_email.isValid &&
      !this.state.valid_phone.isValid &&
      !this.state.valid_part.isValid &&
      !this.state.valid_department.isValid &&
      !this.state.valid_position.isValid
    ) {
      let paramUser = {
        app_id: 99,
        email: this.state.email,
        phone: this.state.phone,
        full_name: this.state.pro_name,
        service_management_id: "1",
      };
      let resRegister = await register(paramUser);
      if (resRegister.message === "Đăng ký thành công!") {
        userId = resRegister.detail.id;
      }
      if (userId !== 0) {
        let params = {
          user_id: userId,
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
          button: value,
          action: "create",
        };
        let resAddProfile = await addProfile(params);
        if (resAddProfile.message == "Success!. Stored") {
          proId = resAddProfile.id;
        } else {
          messageErr = 2;
        }
        if (value === "send") {
          let resUpdateProfile = await updateProfile(proId, params);
          if (resUpdateProfile.message == "Success!. Updated") {
          } else {
            messageErr = 2;
          }
        }
      }
      if (userId !== 0 && proId !== 0) {
        let paramsDepartment = {
          pro_id: proId,
          user_id: userId,
          dep_id: this.state.dep_id,
          pos_id: this.state.pos_id,
          part_id: this.state.par_id,
          appointment_date: Date.parse(this.state.appointment_date) / 1000,
        };
        let resAddDepartmentProfile = await addDepartmentProfile(
          paramsDepartment
        );
        if (resAddDepartmentProfile.message == "Success!. Stored") {
        } else {
          messageErr = 4;
        }
        let paramsUserDegrees = {
          pro_id: proId,
          user_id: userId,
          deg_type: this.state.deg_type,
          deg_diploma: this.state.deg_diploma,
          deg_majors: this.state.deg_majors,
          deg_school_name: this.state.deg_school_name,
          deg_begin_study: Date.parse(this.state.deg_begin_study) / 1000,
          deg_end_study: Date.parse(this.state.deg_end_study) / 1000,
          deg_note: this.state.deg_note,
        };
        let resAddUserDegrees = await addUserDegrees(paramsUserDegrees);
        if (resAddUserDegrees.message === "Success!. Stored") {
        } else {
          messageErr = 6;
        }
        let paramsWorkObjects = {
          pro_id: proId,
          user_id: userId,
          work_formality: this.state.work_formality,
          work_note: this.state.work_note,
        };
        let resAddWorkObject = await addWorkObject(paramsWorkObjects);
        if (resAddWorkObject.message == "Success!. Stored") {
          // message;
        } else {
          messageErr = 8;
        }
        let paramsJournalistCards = {
          pro_id: proId,
          user_id: userId,
          car_number: this.state.car_number,
          car_number_day: Date.parse(this.state.car_number_day) / 1000,
          car_begin: Date.parse(this.state.car_begin) / 1000,
          car_end: Date.parse(this.state.car_end) / 1000,
          car_note: this.state.car_note,
        };
        let resAddJournalistCards = await addJournalistCards(
          paramsJournalistCards
        );
        if (resAddJournalistCards.message == "Success!. Stored") {
        } else {
          messageErr = 10;
        }
      }
      console.log("messageErr: ", messageErr);
      if (messageErr == 0) {
        message.success("Thêm thông tin nhân sự thành công");
        this.props.uiActionCreatorsH();
        this.setState({
          idSaved: userId,
          pro_id_saved: proId,
        });
        // await this.fetchData();
        this.props.history.push(`/edituser/${userId}`);
        this.props.handleReloadComponent();
      } else {
        message.error("Thêm thông tin nhân sự thất bại");
      }
    }
    this.props.uiActionCreatorsH();
  };
  handleEdit = async (value) => {
    await this.handleInputValid("pro_name", this.state.pro_name);
    await this.handleInputValid("phone", this.state.phone);
    await this.handleInputValid("part", this.state.par_id);
    await this.handleInputValid("department", this.state.dep_id);
    await this.handleInputValid("position", this.state.pos_id);
    if (
      !this.state.valid_pro_name.isValid &&
      !this.state.valid_phone.isValid &&
      !this.state.valid_part.isValid &&
      !this.state.valid_department.isValid &&
      !this.state.valid_position.isValid
    ) {
      this.props.uiActionCreatorsS();
      let userId = this.props.idUser || this.state.idSaved;
      let pro_id = null;
      if (this.state.pro_id_saved == null) {
        pro_id = this.state.pro_id;
      } else {
        pro_id = this.state.pro_id_saved;
      }
      let messageErr = 0;
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
        button: value,
        action: "create",
      };
      // console.log(params)
      let resUpdateProfile = await updateProfile(pro_id, params);
      if (resUpdateProfile && resUpdateProfile.message == "Success!. Updated") {
      } else {
        messageErr = 2;
      }
      let paramsDepartment = {
        pro_id: pro_id,
        user_id: userId,
        dep_id: this.state.dep_id,
        pos_id: this.state.pos_id,
        part_id: this.state.par_id,
        appointment_date: Date.parse(this.state.appointment_date) / 1000,
      };
      let resUpdateDepartmentProfile = await updateDepartmentProfile(
        pro_id,
        paramsDepartment
      );
      if (resUpdateDepartmentProfile.message == "Success!. Updated") {
      } else {
        messageErr = 4;
      }
      let paramsUserDegrees = {
        user_id: userId,
        pro_id: pro_id,
        deg_type: this.state.deg_type,
        deg_diploma: this.state.deg_diploma,
        deg_majors: this.state.deg_majors,
        deg_school_name: this.state.deg_school_name,
        deg_begin_study: Date.parse(this.state.deg_begin_study) / 1000,
        deg_end_study: Date.parse(this.state.deg_end_study) / 1000,
        deg_note: this.state.deg_note,
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
        user_id: userId,
        pro_id: pro_id,
        work_formality: this.state.work_formality,
        work_note: this.state.work_note,
      };
      let resUpdateWorkObject = await updateWorkObject(
        this.state.idWorkObject,
        paramsWorkObjects
      );
      if (resUpdateWorkObject.message == "Success!. Updated") {
        message;
      } else {
        messageErr = 8;
      }
      let paramsJournalistCards = {
        user_id: userId,
        pro_id: pro_id,
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
      console.log(messageErr);
      this.props.uiActionCreatorsH();
      if (messageErr == 0) {
        message.success("Cập nhât thông tin thành công");
        this.props.handleReloadComponent();
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
  renderWorkflow = () => {
    if (!!this.state.dataWorkflowProfile === true) {
      const workflowProfile = this.state.dataWorkflowProfile;
      return workflowProfile.steps.map((item) => {
        return <Step key={item.id} title={item.description} />;
      });
    }
    // return ""
  };
  confirm = () => {
    this.handleSend();
  };
  // Modal Notify
  handleInputValid = (name, value) => {
    const { isValid, errorMessage } = validateInputFormUser(name, value, this.state.listUser);
    this.setState({
      [`valid_${name}`]: {
        isValid: isValid,
        errorMessage: errorMessage,
      },
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
  handleReloadComponent = () => {
    this.componentDidMount();
  };
  renderButton = (value) => {
    if(value === 0) {
      return (
        <li className="tabs-main-left-li tabs-main-left-li-submit">
        <span
          className="btn-add-user"
          onClick={this.handleSave}
        >
          Lưu
        </span>
        <Popconfirm
          title="Bạn có chắc chắn xác nhận hồ sơ"
          onConfirm={() => this.confirm()}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"
        >
          <span
            className="btn-add-user"
            // onClick={this.handleSend}
          >
            Xác nhận
          </span>
        </Popconfirm>
      </li>
      )
    } else if (value === 1) {
      return (
      <p className ="text-feedback-user">  Bạn chỉ có thể xem (nhân viên đang chỉnh hồ sơ của mình) </p>
      )
    } else if (value === 2) {
      return (
        <p className ="text-feedback-user">Bạn hãy duyệt hồ sơ</p>
      )
    } else if (value ===3) {
      return (
        <p className ="text-feedback-user">Hồ sơ đã đống</p>
      )
    } else {
      return 
    }
  }
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
                        <span>*</span>
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
                      <span className="tabs-user-infor-top">Email cá nhân:
                      <span>*</span>
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input
                          disabled={this.props.idUser ? true : false}
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
                      <span className="tabs-user-infor-top">
                        Mật khẩu đăng nhập:
                        <span>*</span>
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Input.Password
                          disabled={this.props.idUser ? true : false}
                          value={this.state.password}
                          name="password"
                          onChange={this.onChange}
                          placeholder="Mật khẩu đăng nhập"
                        />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">Số điện thoại:
                      <span>*</span></span>
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
                      <span className="tabs-user-infor-top">Ngày sinh:</span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                        <DatePicker
                          placeholder="Chọn ngày"
                          value={
                            this.state.pro_birth_day == null || moment(this.state.pro_birth_day,dateFormat) == "Thu Jan 01 1970 08:00:00 GMT+0800"
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
                          value={
                            this.state.pro_identity_card_when == null || moment(this.state.pro_identity_card_when,dateFormat) == "Thu Jan 01 1970 08:00:00 GMT+0800"
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
            <div className="tabs-main-right" style={{ width: "41%" }}>
              <div className="tabs-main-left-content">
                <div className="tabs-main-left">
                  <ul className="tabs-main-left-ul">
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-top">
                        Chọn phòng ban:
                        <span>*</span>
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Select
                          defaultValue={0}
                          showSearch
                          // optionFilterProp="children"
                          value={this.state.dep_id}
                          name="depart"
                          style={{ width: "100%" }}
                          onChange={this.handleChangeDepartment}
                          onSearch={this.handleSearchDepartment}
                          onFocus={this.handFocusDepartment}
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          ref={this.typingRef}
                        >
                          {this.renderDepartment()}
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
                      <span className="tabs-user-infor-top">Tổ làm việc:
                      <span>*</span>
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Select
                          defaultValue={0}
                          showSearch
                          value={this.state.par_id}
                          onChange={this.handleChangeParts}
                          onSearch={this.handleSearchPart}
                          onFocus={this.handFocusPart}
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          ref={this.typingRef}
                        >
                          {this.renderParts()}
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
                      <span className="tabs-user-infor-top">Chức vụ:
                      <span>*</span>
                      </span>
                      <div className="tabs-user-infor-bottom">
                        <Select
                          defaultValue={0}
                          showSearch
                          value={this.state.pos_id}
                          onChange={this.handleChangePosition}
                          onSearch={this.handleSearchPosition}
                          onFocus={this.handFocusPosition}
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          ref={this.typingRef}
                        >
                          {this.renderPosition()}
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
                          style={{ width: "100%" }}
                          value={
                            this.state.appointment_date == null || moment(this.state.appointment_date,dateFormat) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(this.state.appointment_date, dateFormat)
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
                        {/* {console.log(this.state.deg_begin_study)} */}
                        <RangePicker
                         value={
                          this.state.deg_begin_study == null
                            ? null
                            : [
                                this.state.deg_begin_study == null ||
                                moment(this.state.deg_begin_study,dateFormat) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
                                      this.state.deg_begin_study,
                                      dateFormat
                                    ),
                                this.state.deg_end_study == null ||
                                moment(this.state.deg_end_study,dateFormat) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
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
                      <span className="tabs-user-infor-top">Ngày cấp thẻ:</span>
                      <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                        <DatePicker
                          placeholder="Chọn ngày"
                          style={{ width: "100%" }}
                          value={
                            this.state.car_number_day == null || moment(this.state.car_number_day,dateFormat) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                              ? null
                              : moment(this.state.car_number_day, dateFormat)
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
                         value={
                          this.state.car_begin == null
                            ? null
                            : [
                                this.state.car_begin == null ||
                                moment(this.state.car_begin,dateFormat) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
                                      this.state.car_begin,
                                      dateFormat
                                    ),
                                this.state.car_end == null ||
                                moment(this.state.car_end,dateFormat) == "Thu Jan 01 1970 08:00:00 GMT+0800"
                                  ? null
                                  : moment(
                                      this.state.car_end,
                                      dateFormat
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
                    {this.renderButton(this.props.value)}
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
  uiActionCreatorsS: bindActionCreators(showLoading, dispatch),
  uiActionCreatorsH: bindActionCreators(hideLoading, dispatch),
});
const ShowTheLocationWithRouter = withRouter(addInformationUser);
export default connect(null, mapDispatchToProps)(ShowTheLocationWithRouter);
