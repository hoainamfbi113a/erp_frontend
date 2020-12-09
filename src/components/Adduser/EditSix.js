import React, { Component } from "react";
import { Input, DatePicker } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Radio, Button } from "antd";
import axios from "axios";
import moment from 'moment';
import "./Adduser1.css";
import * as userSixActions from '../../actions/userSix';
import { isNull } from "lodash";
const dateFormat = 'YYYY/MM/DD';
class AddSix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            // pro_name: this.props.userEditGet && this.props.userEditGet.profiles ? this.props.userEditGet.profiles.pro_name: null,
            // pro_pen_name: this.props.userEditGet && this.props.userEditGet.profiles ? this.props.userEditGet.profiles.pro_pen_name: null,
            // pro_birth_day: this.props.userEditGet && this.props.userEditGet.profiles ? this.props.userEditGet.profiles.pro_birth_day: null,
            // pro_gender: this.props.userEditGet? this.props.userEditGet.profiles.pro_gender: 2,
            // pro_birth_place: this.props.userEditGet? this.props.userEditGet.profiles.pro_birth_place: null,
            // pro_home_town: this.props.userEditGet? this.props.userEditGet.profiles.pro_home_town: null,
            // pro_mobile_phone: this.props.userEditGet? this.props.userEditGet.profiles.pro_mobile_phone: null,
            // pro_resident: this.props.userEditGet? this.props.userEditGet.profiles.pro_resident: null,
            // pro_ethnic: this.props.userEditGet? this.props.userEditGet.profiles.pro_ethnic: null,
            // pro_religion: this.props.userEditGet? this.props.userEditGet.profiles.pro_religion: null,
            // pro_background_origin: this.props.userEditGet? this.props.userEditGet.profiles.pro_background_origin: null,
            // pro_occupation: this.props.userEditGet? this.props.userEditGet.profiles.pro_occupation: null,
            // pro_identity_card: this.props.userEditGet? this.props.userEditGet.profiles.pro_identity_card: null,
            // pro_identity_card_when: this.props.userEditGet? this.props.userEditGet.profiles.pro_identity_card_when: null,
            // pro_identity_card_where: this.props.userEditGet? this.props.userEditGet.profiles.pro_identity_card_where: null,
            // dep_name: this.props.userEditGet ? this.props.userEditGet.department.pro_name: null,
            // dep_position: this.props.userEditGet ? this.props.userEditGet.department.dep_position: null,
            // dep_appointment_date: this.props.userEditGet ? this.props.userEditGet.department.dep_appointment_date: null,
            // pro_work_place: this.props.userEditGet? this.props.userEditGet.personalHistory.pro_work_place: null,
            // pro_work_from: this.props.userEditGet? this.props.userEditGet.personalHistory.pro_work_from: null,
            // pro_work_to: this.props.userEditGet? this.props.userEditGet.personalHistory.pro_work_to: null,
            // pro_working_process: this.props.userEditGet? this.props.userEditGet.personalHistory.pro_working_process: null,
            // pro_note: this.props.userEditGet? this.props.userEditGet.personalHistory.pro_note: null,
            // deg_type: this.props.userEditGet? this.props.userEditGet.degree.deg_type: null,
            // deg_diploma: this.props.userEditGet? this.props.userEditGet.degree.deg_diploma: null,
            // deg_majors: this.props.userEditGet? this.props.userEditGet.degree.deg_majors: null,
            // deg_school_name: this.props.userEditGet? this.props.userEditGet.degree.deg_school_name: null,
            // deg_begin_study: this.props.userEditGet? this.props.userEditGet.degree.deg_begin_study: null,
            // deg_end_study: this.props.userEditGet? this.props.userEditGet.degree.deg_end_study: null,
            // pro_graduation_time: this.props.userEditGet? this.props.userEditGet.degree.pro_graduation_time: null,
            // work_formality: this.props.userEditGet? this.props.userEditGet.workObject.work_formality: null,
            // car_number: this.props.userEditGet ? this.props.userEditGet.journalistCard.car_number: null,
            // car_number_day: this.props.userEditGet ? this.props.userEditGet.journalistCard.car_number_day: null,
            // car_begin: this.props.userEditGet ? this.props.userEditGet.journalistCard.car_begin: null,
            // car_end: this.props.userEditGet ? this.props.userEditGet.journalistCard.car_end: null,
            pro_name: null,
            pro_pen_name: null,
            pro_birth_day: null,
            pro_gender: 2,
            pro_birth_place: null,
            pro_home_town: null,
            pro_mobile_phone: null,
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
            pro_work_place: null,
            pro_work_from: null,
            pro_work_to: null,
            pro_working_process: null,
            pro_note: null,
            deg_type: null,
            deg_diploma: null,
            deg_majors: null,
            deg_school_name: null,
            deg_begin_study: null,
            deg_end_study: null,
            pro_graduation_time: null,
            work_formality: null,
            car_number: null,
            car_number_day: null,
            car_begin:null,
            car_end: null,
            errors: {},
            pro_valueSex: 1,
            aaaa:"",
        };
    }
    onSubmit = (e) => {
        e.preventDefault();
        let formData = {}
        let profiles={}
        let departments ={}
        let personal_histories ={}
        let degrees = {}
        let work_objects = {}
        let journalist_cards = {}
            profiles.pro_name = this.state.pro_name,
            profiles.pro_pen_name = this.state.pro_pen_name,
            profiles.pro_birth_day = this.state.pro_birth_day,
            profiles.pro_gender = this.state.pro_gender,
            profiles.pro_birth_place = this.state.pro_birth_place,
            profiles.pro_home_town = this.state.pro_home_town,
            profiles.pro_mobile_phone = this.state.pro_mobile_phone,
            profiles.pro_resident = this.state.pro_resident,
            profiles.pro_religion = this.state.pro_religion,
            profiles.pro_background_origin = this.state.pro_background_origin,
            profiles.pro_occupation = this.state.pro_occupation,
            profiles.pro_identity_card = this.state.pro_identity_card,
            profiles.pro_identity_card_when = this.state.pro_identity_card_when,
            profiles.pro_identity_card_where = this.state.pro_identity_card_where,
            departments.pro_name = this.state.dep_name,
            departments.dep_position = this.state.dep_position,
            departments.dep_appointment_date = this.state.dep_appointment_date,
            degrees.deg_type = this.state.deg_type,
            degrees.deg_diploma = this.state.deg_diploma,
            degrees.deg_majors = this.state.deg_majors,
            degrees.deg_school_name = this.state.deg_school_name,
            degrees.deg_begin_study = this.state.deg_begin_study,
            degrees.deg_end_study = this.state.deg_end_study,
            degrees.pro_graduation_time = this.state.pro_graduation_time,
            work_objects.work_formality = this.state.work_formality,
            journalist_cards.car_number = this.state.car_number,
            journalist_cards.car_number_day = this.state.car_number_day,
            journalist_cards.car_begin = this.state.car_begin,
            journalist_cards.car_end = this.state.car_end
            if(this.props.match.params.id){
                const { userSixActionCreator } = this.props;
                const { editUserSix } = userSixActionCreator;
                const { history } = this.props;
                editUserSix(profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history);
            }
            else{
               return;
            }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onChangeSex = (e) => {
        this.setState({
            gender: e.target.value,
        });
    };
    onChangeBirthDay = (e, dateString,name) =>{
        this.setState({
            [name]: dateString,
          });
    }
    async componentDidMount () {
        if(this.props.match.params.id) {
            let id = this.props.match.params.id;
            axios
            .get(`https://employee.tuoitre.vn/api/profiles/${id}`)
            .then(response => {
                const data = response.data
                this.setState({ 
                    pro_name: data.pro_name,
                    pro_pen_name: data.pro_pen_name,
                    pro_birth_day: data.pro_birth_day,
                    pro_gender: data.pro_gender,
                    pro_birth_place: data.pro_birth_day,
                    pro_home_town: data.pro_home_town,
                    pro_mobile_phone: data.pro_mobile_phone,
                    pro_resident: data.pro_resident,
                    pro_ethnic: data.pro_ethnic,
                    pro_religion: data.pro_resident,
                    pro_background_origin: data.pro_background_origin,
                    pro_occupation: data.pro_occupation,
                    pro_identity_card: data.pro_identity_card,
                    pro_identity_card_when: data.pro_identity_card_when,
                    pro_identity_card_where: data.pro_identity_card_where,
                 });
            })
            .catch(function(error) {
                console.log(error);
            });

            axios
            .get(`https://employee.tuoitre.vn/api/user-degrees/profiles/${id}`,)
            .then(response => {
                const data = response.data;
                this.setState({ 
                    deg_type: data.deg_type,
                    deg_diploma: data.deg_diploma,
                    deg_majors: data.deg_majors,
                    deg_school_name: data.deg_school_name,
                    deg_begin_study: data.deg_begin_study,
                    deg_end_study: data.deg_end_study,
                 });
            })
            .catch(function(error) {
                console.log(error);
            });

            axios
            .get(`https://employee.tuoitre.vn/api/departments/profiles/${id}`,)
            .then(response => {
               const data = response.data;
               this.setState({
                dep_name: data.dep_name,
                dep_position: data.dep_position,
                dep_appointment_date: data.dep_appointment_date,
               })
            })
            .catch(function(error) {
                console.log(error);
            });

            axios
            .get(`https://employee.tuoitre.vn/api/journalist-cards/profiles/${id}`,)
            .then(response => {
                const data = response.data;
                this.setState({
                    car_number: data.car_number,
                    car_number_day: data.car_number_day,
                    car_begin: data.car_begin,
                    car_end: data.car_end
                })
            })
            .catch(function(error) {
                console.log(error);
            });

            axios
            .get(`https://employee.tuoitre.vn/api/work-objects/profiles/${id}`)
            .then(response => {
                const data = response.data;
                this.setState({
                    work_formality: data.work_formality
                })
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }
    render() {
        return (
            <div>
                <div className="add-user-title-position">Nhân sự</div>
                <div className="add-user-title-user-base">Thông tin cơ bản</div>
                <div className="tabs-main">
                    <form style={{ width: "100%" }}
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
                                            <span className="tabs-user-infor-top">Tên của user :</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    defaultValue={ this.state.pro_name }
                                                    name="pro_name"
                                                    onChange={this.onChange}
                                                    placeholder="Nhập họ và tên khai sinh"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Bút danh của user:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pro_pen_name"
                                                    defaultValue={ this.state.pro_pen_name }
                                                    onChange={this.onChange}
                                                    placeholder="Nhập Bút danh của user"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày sinh của user:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.pro_birth_day == null ? null: moment(this.state.pro_birth_day, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"pro_birth_day")}
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
                                                    defaultValue={ this.state.pro_birth_place }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi sinh của"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Quê quán hộ khẩu thường trú:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pro_home_town"
                                                    defaultValue={ this.state.pro_home_town }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi sinh của"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Số điện thoại nội bộ:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pro_mobile_phone"
                                                    defaultValue={ this.state.pro_mobile_phone }
                                                    onChange={this.onChange}
                                                    placeholder="Quê quán của"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Nơi ở hiện tại:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pro_resident"
                                                    defaultValue={ this.state.pro_resident }
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
                                                    defaultValue={ this.state.pro_resident }
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
                                                    defaultValue={ this.state.pro_religion }
                                                    onChange={this.onChange}
                                                    placeholder="Tôn giáo"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thành phần xuất thân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pro_background_origin"
                                                    defaultValue={ this.state.pro_background_origin }
                                                    onChange={this.onChange}
                                                    placeholder="Thành phần xuất thân của"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Nghề nghiệp khi được tuyển dụng:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pro_occupation"
                                                    defaultValue={ this.state.pro_occupation }
                                                    onChange={this.onChange}
                                                    placeholder="Nhập nghề nghiệp khi được tuyển dụng"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Số CMND/Thẻ CCCD:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pro_identity_card"
                                                    defaultValue={ this.state.pro_identity_card }
                                                    onChange={this.onChange}
                                                    placeholder="Số CMND/Thẻ CCCD"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày cấp CMND, CCCD :</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.pro_identity_card_when == null ? null: moment(this.state.pro_identity_card_when, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"pro_identity_card_when")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Nơi cấp CMND,CCCD:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pro_identity_card_where"
                                                    defaultValue={ this.state.pro_identity_card_where }
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
                                         <h2>Phòng ban</h2>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tên phòng ban:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="dep_name"
                                                    defaultValue={ this.state.dep_name }
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
                                                    defaultValue={ this.state.dep_position }
                                                    onChange={this.onChange}
                                                    placeholder="Chức vụ phòng ban"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày bổ nhiệm chức vụ :</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.dep_appointment_date == null ? null: moment(this.state.dep_appointment_date, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"dep_appointment_date")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <h2 style={{marginTop:'20px'}}>Trình độ</h2>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Loại bằng cấp:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="deg_type"
                                                    defaultValue={ this.state.deg_type }
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
                                                    defaultValue={ this.state.deg_diploma }
                                                    onChange={this.onChange}
                                                    placeholder="Bằng cấp"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Chuyên ngành học:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="deg_majors"
                                                    defaultValue={ this.state.deg_majors }
                                                    onChange={this.onChange}
                                                    placeholder="Chuyên ngành học"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tên trường đào tạo:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="deg_school_name"
                                                    defaultValue={ this.state.deg_school_name }
                                                    onChange={this.onChange}
                                                    placeholder="Tên trường đào tạo"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian bắt đầu học:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.deg_begin_study == null ? null: moment(this.state.deg_begin_study, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"deg_begin_study")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian kết thúc học, thời gian tốt nghiệp:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.deg_end_study == null ? null: moment(this.state.deg_end_study, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"deg_end_study")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                           <h2 style={{marginTop:'23px'}}>Đối tượng lao động</h2>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Hình thức lao động:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="work_formality"
                                                    defaultValue={ this.state.work_formality }
                                                    onChange={this.onChange}
                                                    placeholder="Hình thức lao động"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                           <h2 style={{marginTop:'20px'}}>Thẻ nhà báo</h2>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Số thẻ:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="car_number"
                                                    defaultValue={ this.state.car_number }
                                                    onChange={this.onChange}
                                                    placeholder="Số thẻ"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày cấp thẻ:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.car_number_day == null ? null: moment(this.state.car_number_day, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"car_number_day")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian thẻ có hiệu lực:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.car_begin == null ? null: moment(this.state.car_begin, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"car_begin")}
                                                />
                                            </div>
                                        </li> <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian thẻ hết hiệu lực:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.car_end == null ? null: moment(this.state.car_end, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"car_end")}
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
        );
    }
}
const mapStateToProps = (state,props) =>({
    userEditGet: state.userSixReducer.userEditGet
    // userSix: state.userSixReducer
})
const mapDispatchToProps = (dispatch) => ({
    userSixActionCreator: bindActionCreators(userSixActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AddSix)
