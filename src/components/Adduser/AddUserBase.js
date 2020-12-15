import React, { Component } from "react";
import { Input, DatePicker } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Radio, Button } from "antd";
import moment from 'moment';
import "./Adduser1.css";
import * as userBaseActions from '../../actions/userBaseAction';
import { isNull } from "lodash";
const dateFormat = 'YYYY/MM/DD';
class AddUserBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            base1: this.props.userBase? this.props.userBase.base1: null,
            // base1: "",
            base2: this.props.userBase? this.props.userBase.base2: null,
            base3: this.props.userBase? this.props.userBase.base3: null,
            base4: this.props.userBase? this.props.userBase.base4: null,
            base5: this.props.userBase? this.props.userBase.base5: 2,
            base6: this.props.userBase? this.props.userBase.base6: null,
            base7: this.props.userBase? this.props.userBase.base7: null,
            base8: this.props.userBase? this.props.userBase.base8: null,
            base9: this.props.userBase? this.props.userBase.base9: null,
            base10: this.props.userBase? this.props.userBase.base10: null,
            base11: this.props.userBase? this.props.userBase.base11: null,
            base12: this.props.userBase? this.props.userBase.base12: null,
            base13: this.props.userBase? this.props.userBase.base13: null,
            base14: this.props.userBase? this.props.userBase.base14: null,
            base15: this.props.userBase? this.props.userBase.base15: null,
            base16: this.props.userBase? this.props.userBase.base16: null,
            base17: this.props.userBase? this.props.userBase.base17: null,
            base18: this.props.userBase? this.props.userBase.base18: null,
            base19: this.props.userBase? this.props.userBase.base19: null,
            base20: this.props.userBase? this.props.userBase.base20: null,
            base21: this.props.userBase? this.props.userBase.base21: null,
            base22: this.props.userBase? this.props.userBase.base22: null,
            base23: this.props.userBase? this.props.userBase.base23: null,
            base24: this.props.userBase? this.props.userBase.base24: null,
            base25: this.props.userBase? this.props.userBase.base25: null,
            base26: this.props.userBase? this.props.userBase.base26: null,
            base27: this.props.userBase? this.props.userBase.base27: null,
            base28: this.props.userBase? this.props.userBase.base28: null,
            base29: this.props.userBase? this.props.userBase.base29: null,
            base30: this.props.userBase? this.props.userBase.base30: null,
            base31: this.props.userBase? this.props.userBase.base31: null,
            base32: this.props.userBase? this.props.userBase.base32: null,
            base33: this.props.userBase? this.props.userBase.base33: null,
            base34: this.props.userBase? this.props.userBase.base34: null,
            base35: this.props.userBase? this.props.userBase.base35: null,
            base36: this.props.userBase? this.props.userBase.base36: null,
            base37: this.props.userBase? this.props.userBase.base37: null,
            errors: {},
            valueSex: 1,
        };
    }
    onSubmit = (e) => {
        e.preventDefault();
        let formData = {}
            formData.base1 = this.state.base1,
            formData.base2 = this.state.base2,
            formData.base3 = this.state.base3,
            formData.base4 = this.state.base4,
            formData.base5 = this.state.base5,
            formData.base6 = this.state.base6,
            formData.base7 = this.state.base7,
            formData.base8 = this.state.base8,
            formData.base9 = this.state.base9,
            formData.base10 = this.state.base10,
            formData.base11 = this.state.base11,
            formData.base12 = this.state.base12,
            formData.base13 = this.state.base13,
            formData.base14 = this.state.base14,
            formData.base15 = this.state.base15,
            formData.base16 = this.state.base16,
            formData.base17 = this.state.base17,
            formData.base18 = this.state.base18,
            formData.base19 = this.state.base19,
            formData.base20 = this.state.base20,
            formData.base21 = this.state.base21,
            formData.base22 = this.state.base22,
            formData.base23 = this.state.base23,
            formData.base24 = this.state.base24,
            formData.base25 = this.state.base25,
            formData.base26 = this.state.base26,
            formData.base27 = this.state.base27,
            formData.base28 = this.state.base28,
            formData.base29 = this.state.base29,
            formData.base30 = this.state.base30,
            formData.base31 = this.state.base31,
            formData.base32 = this.state.base32,
            formData.base33 = this.state.base33,
            formData.base34 = this.state.base34,
            formData.base35 = this.state.base35,
            formData.base36 = this.state.base36,
            formData.base37 = this.state.base37
            console.log(formData);
            if(this.props.match.params.id){
                formData.id = this.props.match.params.id
                const { userBaseActionCreator } = this.props;
                const { editUserBase } = userBaseActionCreator;
                const { history } = this.props;
                editUserBase(formData,history);
            }
            else{
                formData.id = Math.floor((Math.random() * 10000) + 1); ;
                const { userBaseActionCreator } = this.props;
                const { addUserBase } = userBaseActionCreator;
                const { history } = this.props;
                addUserBase(formData,history);
            }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onChangeSex = (e) => {
        this.setState({
            base5: e.target.value,
        });
    };
    onChangeBirthDay = (e, dateString,name) =>{
        this.setState({
            [name]: dateString,
          });
    }
    render() {
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
                                                    defaultValue={ this.state.base1 }
                                                    name="base1"
                                                    onChange={this.onChange}
                                                    placeholder="Nhập họ và tên khai sinh nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tên thường gọi:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base2"
                                                    defaultValue={ this.state.base2 }
                                                    onChange={this.onChange}
                                                    placeholder="Nhập tên thường gọi của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Các tên gọi khác:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base3"
                                                    defaultValue={ this.state.base3 }
                                                    onChange={this.onChange}
                                                    placeholder="Nhập thêm tên gọi khác của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày tháng năm sinh:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    defaultValue={this.state.base4 == null ? null: moment(this.state.base4, dateFormat)}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"base4")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Giới tính:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Radio.Group
                                                    onChange={this.onChangeSex}
                                                    // value={this.state.base5 == null ? this.state.base5: 1 }
                                                    value={this.state.base5}
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
                                                    name="base6"
                                                    defaultValue={ this.state.base6 }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi sinh của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Quê quán:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base7"
                                                    defaultValue={ this.state.base7 }
                                                    onChange={this.onChange}
                                                    placeholder="Quê quán của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Nơi ở hiện nay:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base8"
                                                    defaultValue={ this.state.base8 }
                                                    onChange={this.onChange}
                                                    placeholder="Nơi ở hiện nay của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Dân tộc:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base9"
                                                    defaultValue={ this.state.base9 }
                                                    onChange={this.onChange}
                                                    placeholder="Dân tộc của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tôn giáo:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base10"
                                                    defaultValue={ this.state.base10 }
                                                    onChange={this.onChange}
                                                    placeholder="Tôn giáo của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Thành phần xuất thân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base11"
                                                    defaultValue={ this.state.base11 }
                                                    onChange={this.onChange}
                                                    placeholder="Thành phần xuất thân của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Mã số thành phần xuất thân:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base12"
                                                    defaultValue={ this.state.base12 }
                                                    onChange={this.onChange}
                                                    placeholder="Mã số thành phần xuất thân"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Nghề nghiệp khi tuyển dụng:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base13"
                                                    defaultValue={ this.state.base13 }
                                                    onChange={this.onChange}
                                                    placeholder="Nghề nghiệp khi tuyển dụng"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Trình độ học vấn:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base14"
                                                    defaultValue={ this.state.base14 }
                                                    onChange={this.onChange}
                                                    placeholder="Trình độ học vấn"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Chuyên môn kỹ thuật:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base15"
                                                    defaultValue={ this.state.base15 }
                                                    onChange={this.onChange}
                                                    placeholder="Chuyên môn kỹ thuật"
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
                                            <span className="tabs-user-infor-top">Lý luận chính trị:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base16"
                                                    defaultValue={ this.state.base16 }
                                                    onChange={this.onChange}
                                                    placeholder="Nhập Lý luận chính trị"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngoại ngữ:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base17"
                                                    defaultValue={ this.state.base17 }
                                                    onChange={this.onChange}
                                                    placeholder="Ngoại ngữ của nhân viên"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày tham gia cách mạng:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"base18")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Làm việc gì tổ chức nào của cách mạng:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base19"
                                                    defaultValue={ this.state.base19 }
                                                    onChange={this.onChange}
                                                    placeholder="Làm việc gì tổ chức nào của cách mạng"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày nhập ngủ:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"base20")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày xuất ngủ:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"base21")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Quân hàm:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base22"
                                                    defaultValue={ this.state.base22 }
                                                    onChange={this.onChange}
                                                    placeholder="Quân hàm"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày được tuyển dụng:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"base23")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Cơ quan tuyển dụng:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base24"
                                                    defaultValue={ this.state.base24 }
                                                    onChange={this.onChange}
                                                    placeholder="Cơ quan tuyển dụng"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày vào đảng cộng sản:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"base24")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngày chính thức:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"base25")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Chức vụ hiện tại:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base27"
                                                    defaultValue={ this.state.base27 }
                                                    onChange={this.onChange}
                                                    placeholder="Chức vụ tuyển dụng"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Mã số chức vụ hiện tại:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base28"
                                                    defaultValue={ this.state.base28 }
                                                    onChange={this.onChange}
                                                    placeholder="Mã số chức vụ hiện tại"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Ngạch công chức, viên chức:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base29"
                                                    defaultValue={ this.state.base29 }
                                                    onChange={this.onChange}
                                                    placeholder="Ngạch công chức, viên chức"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Bậc lương:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base30"
                                                    defaultValue={ this.state.base30 }
                                                    onChange={this.onChange}
                                                    placeholder="Bậc lương"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Từ ngày tháng năm:</span>
                                            <div className="tabs-user-infor-bottom tabs-user-infor-bottom-date">
                                                <DatePicker
                                                placeholder="Chọn ngày"
                                                    style={{ width: 350 }}
                                                    onChange={(date,dateString)=>this.onChangeBirthDay(date,dateString,"base31")}
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Mã số:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base32"
                                                    defaultValue={ this.state.base32 }
                                                    onChange={this.onChange}
                                                    placeholder="Mã số"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Danh hiệu được phong:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base33"
                                                    defaultValue={ this.state.base33 }
                                                    onChange={this.onChange}
                                                    placeholder="Danh hiệu được phong"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Tình hình sức khoẻ:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base34"
                                                    defaultValue={ this.state.base34 }
                                                    onChange={this.onChange}
                                                    placeholder="Tình hình sức khoẻ"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Chiểu cao:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base35"
                                                    defaultValue={ this.state.base35 }
                                                    onChange={this.onChange}
                                                    placeholder="Chiểu cao"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Cân nặng:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base36"
                                                    defaultValue={ this.state.base36 }
                                                    onChange={this.onChange}
                                                    placeholder="Cân nặng"
                                                />
                                            </div>
                                        </li>
                                        <li className="tabs-main-left-li">
                                            <span className="tabs-user-infor-top">Sở trường công tác:</span>
                                            <div className="tabs-user-infor-bottom">
                                                <Input
                                                    name="base37"
                                                    defaultValue={ this.state.base37 }
                                                    onChange={this.onChange}
                                                    placeholder="Sở trường công tác"
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
    userBase: state.userBaseReducer.listUserBase.find(item => item.id == props.match.params.id) 
})
const mapDispatchToProps = (dispatch) => ({
    userBaseActionCreator: bindActionCreators(userBaseActions, dispatch)
})
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddUserBase)
