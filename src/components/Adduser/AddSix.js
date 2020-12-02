import React, { Component } from "react";
import { Input, DatePicker } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Radio, Button } from "antd";
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
            name: this.props.userSix && this.props.userSix.profiles ? this.props.userSix.profiles.name: null,
            pen_name: this.props.userSix? this.props.userSix.profiles.pen_name: null,
            birth_day: this.props.userSix? this.props.userSix.profiles.birth_day: null,
            gender: this.props.userSix? this.props.userSix.profiles.gender: 2,
            birth_place: this.props.userSix? this.props.userSix.profiles.birth_place: null,
            home_town: this.props.userSix? this.props.userSix.profiles.home_town: null,
            mobile_phone: this.props.userSix? this.props.userSix.profiles.mobile_phone: null,
            local_phone: this.props.userSix? this.props.userSix.profiles.local_phone: null,
            resident: this.props.userSix? this.props.userSix.profiles.resident: null,
            ethnic: this.props.userSix? this.props.userSix.profiles.ethnic: null,
            religion: this.props.userSix? this.props.userSix.profiles.religion: null,
            background_origin: this.props.userSix? this.props.userSix.profiles.background_origin: null,
            occupation: this.props.userSix? this.props.userSix.profiles.occupation: null,
            identity_card: this.props.userSix? this.props.userSix.profiles.identity_card: null,
            identity_card_when: this.props.userSix? this.props.userSix.profiles.identity_card_when: null,
            identity_card_where: this.props.userSix? this.props.userSix.profiles.identity_card_where: null,
            nameD: this.props.userSix && this.props.userSix.department ? this.props.userSix.department.name: null,
            position: this.props.userSix && this.props.userSix.department ? this.props.userSix.department.position: null,
            appointment_date: this.props.userSix && this.props.userSix.department ? this.props.userSix.department.appointment_date: null,
            work_place: this.props.userSix? this.props.userSix.personalHistory.work_place: null,
            work_from: this.props.userSix? this.props.userSix.personalHistory.work_from: null,
            work_to: this.props.userSix? this.props.userSix.personalHistory.work_to: null,
            working_process: this.props.userSix? this.props.userSix.personalHistory.working_process: null,
            note: this.props.userSix? this.props.userSix.personalHistory.note: null,
            type: this.props.userSix? this.props.userSix.degree.type: null,
            diploma: this.props.userSix? this.props.userSix.degree.diploma: null,
            majors: this.props.userSix? this.props.userSix.degree.majors: null,
            school_name: this.props.userSix? this.props.userSix.degree.school_name: null,
            start_study: this.props.userSix? this.props.userSix.degree.start_study: null,
            end_study: this.props.userSix? this.props.userSix.degree.end_study: null,
            graduation_time: this.props.userSix? this.props.userSix.degree.graduation_time: null,
            formality: this.props.userSix? this.props.userSix.workObject.formality: null,
            number_car: this.props.userSix && this.props.userSix.journalistCard ? this.props.userSix.journalistCard.number_car: null,
            number_car_day: this.props.userSix && this.props.userSix.journalistCard ? this.props.userSix.journalistCard.number_car_day: null,
            car_begin: this.props.userSix && this.props.userSix.journalistCard ? this.props.userSix.journalistCard.car_begin: null,
            car_end: this.props.userSix && this.props.userSix.journalistCard ? this.props.userSix.journalistCard.car_end: null,
            errors: {},
            valueSex: 1,
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
            profiles.name = this.state.name,
            profiles.pen_name = this.state.pen_name,
            profiles.birth_day = this.state.birth_day,
            profiles.gender = this.state.gender,
            profiles.birth_place = this.state.birth_place,
            profiles.home_town = this.state.home_town,
            profiles.mobile_phone = this.state.mobile_phone,
            profiles.local_phone = this.state.local_phone,
            profiles.resident = this.state.resident,
            profiles.religion = this.state.religion,
            profiles.background_origin = this.state.background_origin,
            profiles.occupation = this.state.occupation,
            profiles.identity_card = this.state.identity_card,
            profiles.identity_card_when = this.state.identity_card_when,
            profiles.identity_card_where = this.state.identity_card_where,
            departments.name = this.state.nameD,
            departments.position = this.state.position,
            departments.appointment_date = this.state.appointment_date,
            personal_histories.work_place = this.state.work_place,
            personal_histories.work_from = this.state.work_from,
            personal_histories.work_to = this.state.work_to,
            personal_histories.working_process = this.state.working_process,
            personal_histories.note = this.state.note,
            degrees.type = this.state.type,
            degrees.diploma = this.state.diploma,
            degrees.majors = this.state.majors,
            degrees.school_name = this.state.school_name,
            degrees.start_study = this.state.start_study,
            degrees.end_study = this.state.end_study,
            degrees.graduation_time = this.state.graduation_time,
            work_objects.formality = this.state.formality,
            journalist_cards.number_car = this.state.number_car,
            journalist_cards.number_car_day = this.state.number_car_day,
            journalist_cards.car_begin = this.state.car_begin,
            journalist_cards.car_end = this.state.car_end
            if(this.props.match.params.id){
                profiles.id = this.props.userSix.profiles.id
                departments.id = this.props.userSix.department.id
                departments.userId = this.props.userSix.department.userId
                personal_histories.id = this.props.userSix.personalHistory.id
                personal_histories.userId = this.props.userSix.personalHistory.userId
                degrees.id = this.props.userSix.degree.id
                degrees.userId = this.props.userSix.degree.userId
                work_objects.id = this.props.userSix.workObject.id
                work_objects.userId = this.props.userSix.workObject.userId
                journalist_cards.id = this.props.userSix.journalistCard.id
                journalist_cards.userId = this.props.userSix.journalistCard.userId
                const { userSixActionCreator } = this.props;
                const { editUserSix } = userSixActionCreator;
                const { history } = this.props;
                editUserSix(profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history);
            }
            else{
                profiles.id = departments.userId = personal_histories.userId = degrees.userId =
                work_objects.userId = journalist_cards.userId= Math.floor((Math.random() * 10000) + 1); ;
                const { userSixActionCreator } = this.props;
                const { addUserSix } = userSixActionCreator;
                const { history } = this.props;
                addUserSix(profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history);
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
    render() {
        console.log(this.props.userSix)
        return (
            <div>
                <div className="add-user-title-position">Nhân sự</div>
                <div className="add-user-title-user-base">Thông tin nhân viên cơ bản</div>
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
                                            <span className="tabs-user-infor-top">Họ và tên khai sinh:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    defaultValue={ this.state.name }
                                                    name="name"
                                                    onChange={this.onChange}
                                                    placeholder="Nhập họ và tên khai sinh nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tên thường gọi:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="pen_name"
                                                    defaultValue={ this.state.pen_name }
                                                    onChange={this.onChange}
                                                    placeholder="Nhập tên thường gọi của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày tháng năm sinh:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.birth_day == null ? null: moment(this.state.birth_day, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"birth_day")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Giới tính:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Radio.Group
                                                    onChange={this.onChangeSex}
                                                    value={this.state.gender}
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
                                                    name="birth_place"
                                                    defaultValue={ this.state.birth_place }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi sinh của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Quê nhà:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="home_town"
                                                    defaultValue={ this.state.home_town }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi sinh của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Số điện thoại:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="mobile_phone"
                                                    defaultValue={ this.state.mobile_phone }
                                                    onChange={this.onChange}
                                                    placeholder="Quê quán của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Số điện thoại người thân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="local_phone"
                                                    defaultValue={ this.state.local_phone }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi ở hiện nay của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Cư dân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="resident"
                                                    defaultValue={ this.state.resident }
                                                    onChange={this.onChange}
                                                    placeholder="Cư dân của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Dân tộc:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="resident"
                                                    defaultValue={ this.state.resident }
                                                    onChange={this.onChange}
                                                    placeholder="Dân tộc của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tôn giáo:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="religion"
                                                    defaultValue={ this.state.religion }
                                                    onChange={this.onChange}
                                                    placeholder="Tôn giáo của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thành phần xuất thân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="background_origin"
                                                    defaultValue={ this.state.background_origin }
                                                    onChange={this.onChange}
                                                    placeholder="Thành phần xuất thân của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Nghề nghiệp trước khi gia nhập:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="occupation"
                                                    defaultValue={ this.state.occupation }
                                                    onChange={this.onChange}
                                                    placeholder="Mã số thành phần xuất thân"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Số chứng minh nhân dân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="identity_card"
                                                    defaultValue={ this.state.identity_card }
                                                    onChange={this.onChange}
                                                    placeholder="Số chứng minh nhân dân"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày cấp chứng minh nhân dân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="identity_card_when"
                                                    defaultValue={ this.state.identity_card_when }
                                                    onChange={this.onChange}
                                                    placeholder="Ngày cấp chứng minh nhân dân"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Nơi cấp chứng minh nhân dân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="identity_card_where"
                                                    defaultValue={ this.state.identity_card_where }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi cấp chứng minh nhân dân"
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
                                            <span className="tabs-user-infor-top">Tên phòng ban:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="nameD"
                                                    defaultValue={ this.state.nameD }
                                                    onChange={this.onChange}
                                                    placeholder="Nhập Tên phòng ban"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Vị trí:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="position"
                                                    defaultValue={ this.state.position }
                                                    onChange={this.onChange}
                                                    placeholder="Vị trí phòng ban"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày tham gia :</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.appointment_date == null ? null: moment(this.state.appointment_date, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"appointment_date")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Nơi làm việc (lịch sử):</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="work_place"
                                                    defaultValue={ this.state.work_place }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi làm việc (lịch sử)"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày làm việc từ ngày (lịch sử):</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.work_from == null ? null: moment(this.state.work_from, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"work_from")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày làm việc đến ngày:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.work_to == null ? null: moment(this.state.work_to, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"work_to")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Quá trình làm việc:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="working_process"
                                                    defaultValue={ this.state.working_process }
                                                    onChange={this.onChange}
                                                    placeholder="Quá trình làm việc"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ghi chú làm việc:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="note"
                                                    defaultValue={ this.state.note }
                                                    onChange={this.onChange}
                                                    placeholder="Ghi chú làm việc"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Loại bằng cấp:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="type"
                                                    defaultValue={ this.state.type }
                                                    onChange={this.onChange}
                                                    placeholder="Loại bằng cấp"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tên bằng cấp:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="diploma"
                                                    defaultValue={ this.state.diploma }
                                                    onChange={this.onChange}
                                                    placeholder="Tên bằng cấp"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Chuyên nghành:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="majors"
                                                    defaultValue={ this.state.majors }
                                                    onChange={this.onChange}
                                                    placeholder="Chuyên nghành"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tên trường học:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="school_name"
                                                    defaultValue={ this.state.school_name }
                                                    onChange={this.onChange}
                                                    placeholder="Tên trường học"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian học từ ngày:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.start_study == null ? null: moment(this.state.start_study, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"start_study")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian kết thúc từ ngày:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.end_study == null ? null: moment(this.state.end_study, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"end_study")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian tốt nghiệp:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.graduation_time == null ? null: moment(this.state.graduation_time, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"graduation_time")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Hình thức làm việc:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="formality"
                                                    defaultValue={ this.state.formality }
                                                    onChange={this.onChange}
                                                    placeholder="Hình thức làm việc"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">number_car_day:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.number_car_day == null ? null: moment(this.state.number_car_day, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"number_car_day")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">car_begin:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.car_begin == null ? null: moment(this.state.car_begin, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"car_begin")}
                                                />
                                            </div>
                                        </li> <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">car_end:</span>
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
    userSix: state.userSixReducer.listUserSix.find(item => item.id == props.match.params.id) 
    // userSix: state.userSixReducer
})
const mapDispatchToProps = (dispatch) => ({
    userSixActionCreator: bindActionCreators(userSixActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AddSix)
