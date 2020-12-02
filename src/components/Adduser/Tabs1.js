import React, { Component } from 'react'
import axios from "axios"
import { Button, Input } from "antd";
import { Radio,DatePicker} from 'antd';
import "./Adduser1.css";
const { TextArea } = Input;
export default class Tabs1 extends Component {
    constructor(props) {//khởi tạo giá trị
        super(props)
        this.state = {
            _id: '',
            name: '',
            pen_name: '',
            birth_day: '',
            gender: '',
            birth_place: '',
            home_town: '',
            mobile_phone: '',
            local_phone: '',
            resident: '',
            ethnic: '',
            religion: '',
            background_origin: '',
            occupation: '',
            identity_card: '',
            identity_card_when: '',
            identity_card_where: '',
            errors: {},
            valueSex:1
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onChangeSex = e => {
        this.setState({
          valueSex: e.target.value,
        });
      };
    onSubmit = (e) => {
        e.preventDefault();
        const {_id, name, pen_name, birth_day,home_town,
            mobile_phone,local_phone,resident,ethnic,religion,
            background_origin,occupation,identity_card,identity_card_when,identity_card_where } = this.state;
        let formData={

        } ;
        formData._id = Math.floor((Math.random() * 10000) + 1); ;
        formData.name = name ;
        formData.pen_name = pen_name ;
        formData.birth_day= birth_day;
        formData.home_town= home_town;
        formData.mobile_phone= mobile_phone;
        formData.local_phone= local_phone;
        formData.ethnic= ethnic;
        formData.resident= resident;
        formData.religion= religion;
        formData.background_origin= background_origin;
        formData.occupation= occupation;
        formData.identity_card= identity_card;
        formData.identity_card_when= identity_card_when;
        formData.identity_card_where= identity_card_where;
        console.log(formData);
        localStorage.setItem("id_user", formData._id);
        axios.post("http://localhost:3000/profiles",formData);
    }
    onChangeIdentityCard = (date, dateString) => {
        this.setState({
            identity_card_when: dateString,
          });
    }
    onChangeBirthDay = (date, dateString) =>{
        this.setState({
            birth_day: dateString,
          });
    }
    render() {
        console.log("loi roi cay oi")
        return (
            <div className="tabs-main">
                <div className="tabs-main-left">
                    <h2>Thông tin cơ bản của nhân viên</h2>
                </div>
                <div className="tabs-main-right">
                    <h2>Nhập thông tin nhân viên</h2>
                    <form className="form-horizontal" noValidate onSubmit={this.onSubmit} method="post">
                        <div className="tabs-main-left-content">
                            <div className="tabs-main-left">
                                <ul className="tabs-main-left-ul">
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Tên nhân viên:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="name" onChange={this.onChange} placeholder="Nhập tên nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Bút danh:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="pen_name" onChange={this.onChange} placeholder="Bút danh của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Ngày sinh:
                        </span>
                                        <div className="tabs-user-infor-right tabs-user-infor-right-date">
                                        <DatePicker style={{ width: 350 }} onChange={this.onChangeBirthDay} />
                                            {/* <Date onChangeDateBirthDay = {this.onChangeDateBirthDay} />
                                            <Month onChangeMonthBirthDay ={this.onChangeMonthBirthDay} />
                                            <Year onChangeYearBirthDay ={this.onChangeYearBirthDay} /> */}
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Giới tính:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Radio.Group onChange={this.onChangeSex} value={this.state.valueSex}>
                                                <Radio value={1}>Nam</Radio>
                                                <Radio value={2}>Nữ</Radio>
                                                <Radio value={3}>Khác</Radio>
                                            </Radio.Group>
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Nơi sinh:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="birth_place" onChange={this.onChange} placeholder="Nơi sinh của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Quê quán:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="home_town" onChange={this.onChange} placeholder="Quê quán của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Số điện thoại di động:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="mobile_phone" onChange={this.onChange} placeholder="Số điện thoại di động của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Số điện thoại nhà
                        </span>
                                        <div className="tabs-user-infor-right tabs-user-infor-right-date ">
                                            <Input name="local_phone" onChange={this.onChange} placeholder="Số điện thoại nhà" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Địa chỉ nhà:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="resident" onChange={this.onChange} placeholder="Địa chỉ nhà của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Dân tộc:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="ethnic" onChange={this.onChange} placeholder="Dân tộc của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Tôn giáo :
                        </span>
                                        <div className="tabs-user-infor-right tabs-user-infor-right-date">
                                            <Input name="religion" onChange={this.onChange} placeholder="Tôn giáo của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Nơi sinh:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="background_origin" onChange={this.onChange} placeholder="Nơi sinh của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Nghề nghiệp:
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="occupation" onChange={this.onChange} placeholder="Nghề nghiệp của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Số chứng minh nhân dân/căn cước
                        </span>
                                        <div className="tabs-user-infor-right tabs-user-infor-right-date">
                                            <Input name="identity_card" onChange={this.onChange} placeholder="Nghề nghiệp của nhân viên" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left ">
                                            Ngày cấp chứng minh nhân dân:
                        </span>
                                        <div className="tabs-user-infor-right tabs-user-infor-right-date">
                                        <DatePicker style={{ width: 350 }} onChange={this.onChangeIdentityCard} />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                        <span className="tabs-user-infor-left">
                                            Nơi cấp chứng minh nhân dân
                        </span>
                                        <div className="tabs-user-infor-right">
                                            <Input name="identity_card_where" onChange={this.onChange} placeholder="Nơi cấp chứng minh nhân dân" />
                                        </div>
                                    </li>
                                    <li className="tabs-main-left-li">
                                  
                                        <Button htmlType="submit" className="btn-add-user">Gửi thông tin</Button>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

        )
    }
}
