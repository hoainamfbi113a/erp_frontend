import React, { Component } from 'react'
import { DatePicker,Input,Button } from "antd";
import axios from "axios"
const { TextArea } = Input;
export default class Tabs4 extends Component {
          constructor(props) {//khởi tạo giá trị
            super(props)
            this.state = {
                _id: '',
                type:"",
                diploma:"",
                majors:"",
                school_name:"",
                start_study:"",
                end_study:"",
                graduation_time:"",
                errors: {},
            }
        }
        onChange = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }
        onChangeStartStudy = (date, dateString) => {
            this.setState({
              start_study: dateString,
              });
        }
        onChangeEndStudy = (date, dateString) => {
            this.setState({
              end_study: dateString,
              });
        }
        onChangeGraduationTime = (date, dateString) => {
            this.setState({
              graduation_time: dateString,
              });
        }
        onSubmit = (e) => {
          e.preventDefault();
        const {_id, type, diploma, majors,school_name,start_study,end_study,graduation_time} = this.state;
        let formData={

        } ;
        formData.type = type ;
        formData.diploma = diploma ;
        formData.majors= majors;
        formData.school_name= school_name;
        formData.start_study= start_study;
        formData.end_study= end_study;
        formData.graduation_time= graduation_time;
        formData.id= localStorage.getItem("id_user")
        console.log(formData)
        axios.post("http://localhost:3000/user-degrees",formData);
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
                         Loại bằng cấp
                      </span>
                      <div className="tabs-user-infor-right">
                          {/* <Input placeholder="Basic usage" /> */}
                          <Input name="type" onChange={this.onChange} placeholder="Loại bằng cấp của nhân viên" />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                         Tên bằng cấp:
                      </span>
                      <div className="tabs-user-infor-right">
                          <Input name="diploma" onChange={this.onChange} placeholder="Tên bằng câp của nhân viên" />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                          Chuyên nghành:
                      </span>
                      <div className="tabs-user-infor-right">
                          <Input name="majors" onChange={this.onChange} placeholder="Chuyên nghành của bằng cấp" />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                          Tên trường học:
                      </span>
                      <div className="tabs-user-infor-right">
                          <Input onChange={this.onChange} name="school_name" placeholder="Tên trường học" />
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                          Ngày bắt đầu:
                      </span>
                      <div className="tabs-user-infor-right">
                        <div className="tabs-user-infor-right tabs-user-infor-right-date ">
                       <DatePicker style={{ width: 350 }} onChange={this.onChangeStartStudy} />
                        </div>
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                          Ngày kết thức:
                      </span>
                      <div className="tabs-user-infor-right">
                        <div className="tabs-user-infor-right tabs-user-infor-right-date ">
                       <DatePicker style={{ width: 350 }} onChange={this.onChangeEndStudy} />
                        </div>
                      </div>
                    </li>
                    <li className="tabs-main-left-li">
                      <span className="tabs-user-infor-left">
                          Thời gian tốt nghiệp:
                      </span>
                        <div className="tabs-user-infor-right tabs-user-infor-right-date ">
                       <DatePicker style={{ width: 350 }} onChange={this.onChangeGraduationTime} />
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
