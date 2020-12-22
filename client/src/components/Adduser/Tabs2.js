import React, { Component } from 'react'
import { DatePicker,Input,Button } from "antd";
import axios from "axios"
import "./Adduser1.css";
const { TextArea } = Input;
export default class Tabs2 extends Component {
      constructor(props) {//khởi tạo giá trị
        super(props)
        this.state = {
            _id: '',
            id:"",
            name:"",
            position:"",
            appointment_date:"",
            errors: {},
        }
    }
      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onChangeAppointmentDate = (date, dateString) => {
        this.setState({
          appointment_date: dateString,
          });
    }
    onSubmit = (e) => {
      e.preventDefault();
    const {_id, name, position, appointment_date} = this.state;
    let formData={

    } ;
    formData._id = Math.floor((Math.random() * 10000) + 1); ;
    formData.name = name ;
    formData.position = position ;
    formData.appointment_date= appointment_date;
    formData.id= localStorage.getItem("id_user")
    console.log(formData)
    axios.post("http://localhost:3000/departments",formData);
    }
    render() {
        return (
            <div className="tabs-main">
            <div className="tabs-main-left">
              <div className="tabs-main-left-content">
                <div className="tabs-main-left-title">

                </div>
                <div className="tabs-main-left-top">
                  <h3 className="left-user-name">Trần Thanh Tâm</h3>
                  <p className="left-user-position">Trưởng phòng CNTT</p>
                  <p className="left-user-address">60A Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP.HCM</p>
                </div>
                <div className="tabs-main-left-bottom">
                  <ul className="tabs-main-left-bottom-ul">
                    <li className="tabs-main-left-bottom-li">
                      <span className="tabs-user-infor-left">
                          Ngày tuyển dụng:
                      </span>
                      <div className="tabs-user-infor-right">
                          12/03/2018
                      </div>
                    </li>
                    <li className="tabs-main-left-bottom-li">
                      <span className="tabs-user-infor-left">
                          Trình độ:
                      </span>
                      <div className="tabs-user-infor-right">
                          Cử nhân CNTT chính quy
                      </div>
                    </li>
                    <li className="tabs-main-left-bottom-li">
                      <span className="tabs-user-infor-left">
                          Ngày sinh:
                      </span>
                      <div className="tabs-user-infor-right">
                          02/03/1993
                      </div>
                    </li>
                    <li className="tabs-main-left-bottom-li">
                      <span className="tabs-user-infor-left">
                          Bút danh:
                      </span>
                      <div className="tabs-user-infor-right">
                          Tâm Trần
                      </div>
                    </li>
                    <li className="tabs-main-left-bottom-li">
                      <span className="tabs-user-infor-left">
                          Số điện thoại:
                      </span>
                      <div className="tabs-user-infor-right">
                          0973173949
                      </div>
                    </li>
                    <li className="tabs-main-left-bottom-li">
                      <span className="tabs-user-infor-left">
                          Email:
                      </span>
                      <div className="tabs-user-infor-right">
                          tam@tuoitre.com.vn
                      </div>
                    </li>
                    <li className="tabs-main-left-bottom-li">
                      <span className="tabs-user-infor-left">
                          Thẻ nhà báo:
                      </span>
                      <div className="tabs-user-infor-right">
                          tam@tuoitre.com.vn
                      </div>
                    </li>
                    <li className="tabs-main-left-bottom-li">
                      <span className="tabs-user-infor-left">
                          Email:
                      </span>
                      <div className="tabs-user-infor-right">
                          733949
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tabs-main-right">
            <form className="form-horizontal" noValidate onSubmit={this.onSubmit} method="post">
              <div className="tabs-main-left-content">
              <div className="tabs-main-left">
                  <ul className="tabs-main-left-ul">
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                          Tên phòng ban:
                      </span>
                      <div className="tabs-user-infor-right">
                          {/* <Input placeholder="Basic usage" /> */}
                          <Input name="name" onChange={this.onChange} placeholder="Tên phòng ban của nhân viên" />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                          Chức vụ của nhân viên:
                      </span>
                      <div className="tabs-user-infor-right">
                      <Input name="position" onChange={this.onChange} placeholder="Chức vụ của nhân viên" />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                          Ngày gia nhập phòng ban:
                      </span>
                      <div className="tabs-user-infor-right tabs-user-infor-right-date">
                      <DatePicker style={{ width: 350 }} onChange={this.onChangeAppointmentDate} />
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
