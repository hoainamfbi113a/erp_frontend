import React, { Component } from "react";
import axios from "axios"
import { Spin } from "antd";
import { ValidateEmail, ValidateField } from "../../helpers/FuncHelper";
import { message } from 'antd';
import "./Login.css";
import authentication from "../../assets/images/authentication.svg";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errEmail: "err",
      errPassword: "err",
      activeErrEmail:false,
      activeErrPassWord:false,
      ishow: false,
      isVibrate:false,
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    let _this = this;
    _this.errEmail = ValidateEmail(_this.state.email, 8);
    _this.errPassword = ValidateField(_this.state.password, 6, 100, "Mật khẩu");
    if (_this.errEmail == "pass" && _this.errPassword == "pass") {
      const params = {
        "email":this.state.email,
        "password":this.state.password,
        "user_ip":"123",
        "user_agent":"ad"
        }
      return axios
      .post("https://employee.tuoitre.vn/api/login", params)
      .then(res =>{
        if (res.data.message === "Đăng nhập thành công!") {
          if(this.state.email!=="manager@gmail.com"){
            localStorage.setItem("per","employee");
          }
          else{
            localStorage.setItem("per","hr");
          }
          localStorage.setItem("usertoken", res.data.access_token);
          localStorage.setItem("current_user_id", res.data.detail.id);
          this.setState({ ishow: !this.state.ishow });
          setTimeout(() => {
            this.setState({
              activeErrEmail:false,
              activeErrPassWord:false,
            })
            this.props.history.push("/crm/employee/notification");
            this.setState({ ishow: !this.state.ishow });
          }, 600);
        } else {
          this.setState({
            activeErrEmail:false,
            activeErrPassWord:false
          })
          message.error('tài khoản hoặc mật khẩu không đúng');
        }
      })
       .catch(err => {
        this.setState({
          activeErrEmail:false,
          activeErrPassWord:false
        })
         message.error('tài khoản hoặc mật khẩu không đúng hoặc lỗi server');
        console.log(err)
      })
    } else {
      if(_this.errEmail !=="pass" && _this.errPassword !=="pass"){
        this.setState({
          errEmail:_this.errEmail,
          errPassword:_this.errPassword,
          activeErrEmail:true,
          activeErrPassWord:true,
          isVibrate:true
        })
      }
      
     else if(_this.errEmail != "pass"){
        this.setState({
          errEmail:_this.errEmail,
          activeErrEmail:true,
          activeErrPassWord:false,
          isVibrate:true
        })
      }
      else if(_this.errPassword != "pass"){
        this.setState({
          errPassword:_this.errPassword,
          activeErrPassWord:true,
          activeErrEmail:false,
          isVibrate:true
        })
      }
     setTimeout(()=>{
        this.setState({
          isVibrate:false
        })
     },300)
    } 
  };
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}
  render() {
    const envVariables = process.env.apiUser;
    return (
      <div>
        <div className="example">
          {this.state.ishow == true ? <Spin /> : ""}
        </div>
        <div className="l-form">
          <div id="bubbles">
            <div className="bubble x1"></div>
            <div className="bubble x2"></div>
            <div className="bubble x3"></div>
            <div className="bubble x4"></div>
            <div className="bubble x5"></div>
          </div>
          <div className="shape1" />
          <div className="shape2" />
          <div className="floating floatFoot" />
          <div className="form">
            <img src={authentication} alt="" className="form__img" />
            <form className="form__content" onSubmit={this.onSubmit}>
              <h1 className="form__title" style={{fontSize:"27px"}}>TUỔI TRẺ CỦA CHÚNG TA</h1>
              <div className="form__div form__div-one">
                <div className="form__icon">
                  <i className="bx bx-user-circle" />
                </div>
                <div className="form__div-input">
                  <input
                    placeholder="Email đăng nhập"
                    type="text"
                    className={"form__input "+ (this.state.activeErrEmail == true && this.state.isVibrate ==true ? 'error' : '')}
                    name="email"
                    onChange={this.onChange}
                  />
                  <i className={"login-error "+ (this.state.activeErrEmail == true ? 'error-email' : '')}>{this.state.errEmail}</i>
                </div>
                <span>
                  
                </span>
              </div>
              <div className="form__div">
                <div className="form__icon">
                  <i className="bx bx-lock" />
                </div>
                <div className="form__div-input">
                  <input
                    placeholder="Mật khẩu"
                    type="password"
                    className={"form__input "+ (this.state.activeErrPassWord == true && this.state.isVibrate ==true ? 'error' : '')}
                    name="password"
                    onChange={this.onChange}
                  />
                  <i className={"login-error "+ (this.state.activeErrPassWord == true ? 'error-email' : '')}>{this.state.errPassword}</i>
                </div>
              </div>
              <a href="#" className="form__forgot">
                Quên mật khẩu ?
              </a>
              <input type="submit" value="Đăng nhập" className="form__button" />
              {/* <div className="form__social">
                <span className="form__social-text">Đăng nhập với</span>
                <a href="#" className="form__social-icon">
                  <FacebookOutlined />
                </a>
                <a href="#" className="form__social-icon">
                  <GooglePlusOutlined />
                </a>
                <a href="#" className="form__social-icon">
                  <InstagramFilled />
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
