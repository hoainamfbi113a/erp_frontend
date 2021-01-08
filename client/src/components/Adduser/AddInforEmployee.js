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
class AddInforEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            pro_name: this.props.userSix && this.props.userSix.profiles ? this.props.userSix.profiles.pro_name: null,
            pro_pen_name: this.props.userSix? this.props.userSix.profiles.pro_pen_name: null,
            pro_birth_day: this.props.userSix? this.props.userSix.profiles.pro_birth_day: null,
            pro_gender: this.props.userSix? this.props.userSix.profiles.pro_gender: 2,
            pro_birth_place: this.props.userSix? this.props.userSix.profiles.pro_birth_place: null,
            pro_home_town: this.props.userSix? this.props.userSix.profiles.pro_home_town: null,
            pro_mobile_phone: this.props.userSix? this.props.userSix.profiles.pro_mobile_phone: null,
            pro_resident: this.props.userSix? this.props.userSix.profiles.pro_resident: null,
            pro_ethnic: this.props.userSix? this.props.userSix.profiles.pro_ethnic: null,
            pro_religion: this.props.userSix? this.props.userSix.profiles.pro_religion: null,
            pro_background_origin: this.props.userSix? this.props.userSix.profiles.pro_background_origin: null,
            pro_occupation: this.props.userSix? this.props.userSix.profiles.pro_occupation: null,
            pro_identity_card: this.props.userSix? this.props.userSix.profiles.pro_identity_card: null,
            pro_identity_card_when: this.props.userSix? this.props.userSix.profiles.pro_identity_card_when: null,
            pro_identity_card_where: this.props.userSix? this.props.userSix.profiles.pro_identity_card_where: null,
            dep_name: this.props.userSix && this.props.userSix.department ? this.props.userSix.department.pro_name: null,
            dep_position: this.props.userSix && this.props.userSix.department ? this.props.userSix.department.dep_position: null,
            dep_appointment_date: this.props.userSix && this.props.userSix.department ? this.props.userSix.department.dep_appointment_date: null,
            pro_work_place: this.props.userSix? this.props.userSix.personalHistory.pro_work_place: null,
            pro_work_from: this.props.userSix? this.props.userSix.personalHistory.pro_work_from: null,
            pro_work_to: this.props.userSix? this.props.userSix.personalHistory.pro_work_to: null,
            pro_working_process: this.props.userSix? this.props.userSix.personalHistory.pro_working_process: null,
            pro_note: this.props.userSix? this.props.userSix.personalHistory.pro_note: null,
            deg_type: this.props.userSix? this.props.userSix.degree.deg_type: null,
            deg_diploma: this.props.userSix? this.props.userSix.degree.deg_diploma: null,
            deg_majors: this.props.userSix? this.props.userSix.degree.deg_majors: null,
            deg_school_name: this.props.userSix? this.props.userSix.degree.deg_school_name: null,
            deg_begin_study: this.props.userSix? this.props.userSix.degree.deg_begin_study: null,
            deg_end_study: this.props.userSix? this.props.userSix.degree.deg_end_study: null,
            pro_graduation_time: this.props.userSix? this.props.userSix.degree.pro_graduation_time: null,
            work_formality: this.props.userSix? this.props.userSix.workObject.work_formality: null,
            car_number: this.props.userSix && this.props.userSix.journalistCard ? this.props.userSix.journalistCard.car_number: null,
            car_number_day: this.props.userSix && this.props.userSix.journalistCard ? this.props.userSix.journalistCard.car_number_day: null,
            car_begin: this.props.userSix && this.props.userSix.journalistCard ? this.props.userSix.journalistCard.car_begin: null,
            car_end: this.props.userSix && this.props.userSix.journalistCard ? this.props.userSix.journalistCard.car_end: null,
            errors: {},
            pro_valueSex: 1,
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
            profiles.pro_ethnic = this.state.pro_ethnic,
            profiles.pro_religion = this.state.pro_religion,
            profiles.pro_background_origin = this.state.pro_background_origin,
            profiles.pro_occupation = this.state.pro_occupation,
            profiles.pro_identity_card = this.state.pro_identity_card,
            profiles.pro_identity_card_when = this.state.pro_identity_card_when,
            profiles.pro_identity_card_where = this.state.pro_identity_card_where,
            departments.pro_name = this.state.dep_name,
            departments.dep_position = this.state.dep_position,
            departments.dep_appointment_date = this.state.dep_appointment_date,
            personal_histories.pro_work_place = this.state.pro_work_place,
            personal_histories.pro_work_from = this.state.pro_work_from,
            personal_histories.pro_work_to = this.state.pro_work_to,
            personal_histories.pro_working_process = this.state.pro_working_process,
            personal_histories.pro_note = this.state.pro_note,
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
                profiles.id = this.props.userSix.profiles.id
                departments.id = this.props.userSix.department.id
                departments.user_id = this.props.userSix.department.user_id
                personal_histories.id = this.props.userSix.personalHistory.id
                personal_histories.user_id = this.props.userSix.personalHistory.user_id
                degrees.id = this.props.userSix.degree.id
                degrees.user_id = this.props.userSix.degree.user_id
                work_objects.id = this.props.userSix.workObject.id
                work_objects.user_id = this.props.userSix.workObject.user_id
                journalist_cards.id = this.props.userSix.journalistCard.id
                journalist_cards.user_id = this.props.userSix.journalistCard.user_id
                const { userSixActionCreator } = this.props;
                const { editUserSix } = userSixActionCreator;
                const { history } = this.props;
                editUserSix(profiles,departments,personal_histories,degrees,work_objects,journalist_cards,history);
            }
            else{
                profiles.user_id = departments.user_id = personal_histories.user_id = degrees.user_id =
                work_objects.user_id = journalist_cards.user_id= "1";
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
        // console.log(this.props.userSix)
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
                                                placeholder="Chọn ngày"
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
                                                    placeholder="Nơi sinh của nhân viên"
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
                                                    placeholder="Quê quán hộ khẩu thường trú"
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
                                                    name="pro_ethnic"
                                                    defaultValue={ this.state.pro_ethnic }
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
                                                placeholder="Chọn ngày"
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
                                                placeholder="Chọn ngày"
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
                                                placeholder="Chọn ngày"
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
                                                placeholder="Chọn ngày"
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
                                                placeholder="Chọn ngày"
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
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.car_begin == null ? null: moment(this.state.car_begin, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"car_begin")}
                                                />
                                            </div>
                                        </li> <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thời gian thẻ hết hiệu lực:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
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
})
const mapDispatchToProps = (dispatch) => ({
    userSixActionCreator: bindActionCreators(userSixActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AddInforEmployee)
