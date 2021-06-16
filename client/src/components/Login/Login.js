import React, { Component } from "react";
import axios from "axios";
import { login } from "apis/authenticationApi";
import { Spin } from "antd";
import { ValidateEmail, ValidateField } from "helpers/FuncHelper";
import { message } from "antd";
import docCookies from "doc-cookies";
import { withRouter } from "react-router-dom";
import "./Login.css";
import logologin from "assets/images/logoFix1.png";
import background from "assets/images/bgd.jpg";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errEmail: "err",
      errPassword: "err",
      activeErrEmail: false,
      activeErrPassWord: false,
      ishow: false,
      isVibrate: false,
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
    _this.errPassword = ValidateField(_this.state.password, 6, 18, "Mật khẩu");
    if (_this.errEmail == "pass" && _this.errPassword == "pass") {
      const params = {
        email: this.state.email,
        password: this.state.password,
        user_ip: "123",
        user_agent: navigator.userAgent,
      };
      const data = await login(params);
      if (data) {
        if (data.message === "Đăng nhập thành công!") {
          this.setState({ ishow: !this.state.ishow });
          localStorage.setItem("0","0")
          setTimeout(() => {
            this.setState({
              activeErrEmail: false,
              activeErrPassWord: false,
            });
            // if(this.state.email === ""){
            //   localStorage.setItem("0","0")
            // }
            this.props.history.push("/");
            this.setState({ ishow: !this.state.ishow });
          }, 600);
        } else {
          this.setState({
            activeErrEmail: false,
            activeErrPassWord: false,
          });
          message.error("tài khoản hoặc mật khẩu không đúng");
        }
      } else {
        this.setState({
          activeErrEmail: false,
          activeErrPassWord: false,
        });
        message.error("tài khoản hoặc mật khẩu không đúng hoặc lỗi server");
      }
    } else {
      if (_this.errEmail !== "pass" && _this.errPassword !== "pass") {
        this.setState({
          errEmail: _this.errEmail,
          errPassword: _this.errPassword,
          activeErrEmail: true,
          activeErrPassWord: true,
          isVibrate: true,
        });
      } else if (_this.errEmail != "pass") {
        this.setState({
          errEmail: _this.errEmail,
          activeErrEmail: true,
          activeErrPassWord: false,
          isVibrate: true,
        });
      } else if (_this.errPassword != "pass") {
        this.setState({
          errPassword: _this.errPassword,
          activeErrPassWord: true,
          activeErrEmail: false,
          isVibrate: true,
        });
      }
      setTimeout(() => {
        this.setState({
          isVibrate: false,
        });
      }, 300);
    }
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
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
            <img src={background} alt="" className="form__img" />
            <form className="form__content" onSubmit={this.onSubmit}>
              <h1 className="form__title" style={{ fontSize: "27px" }}>
                {" "}
                <img src={logologin} alt="" />
              </h1>
              <div className="form__div form__div-one">
                <div className="form__icon">
                  <i className="bx bx-user-circle" />
                </div>
                <div className="form__div-input">
                  <div className="form_label-input">
                    <label>Tên đăng nhập</label>
                  </div>
                  <input
                    placeholder="Email đăng nhập"
                    type="text"
                    className={
                      "form__input " +
                      (this.state.activeErrEmail == true &&
                      this.state.isVibrate == true
                        ? "error"
                        : "")
                    }
                    name="email"
                    onChange={this.onChange}
                  />
                  <i
                    className={
                      "login-error " +
                      (this.state.activeErrEmail == true ? "error-email" : "")
                    }
                  >
                    {this.state.errEmail}
                  </i>
                </div>
                <span></span>
              </div>
              <div className="form__div">
                <div className="form__icon">
                  <i className="bx bx-lock" />
                </div>
                <div className="form__div-input">
                  <div className="form_label-input">
                    <label>Mật khẩu</label>
                  </div>
                  <input
                    placeholder="Mật khẩu"
                    type="password"
                    className={
                      "form__input " +
                      (this.state.activeErrPassWord == true &&
                      this.state.isVibrate == true
                        ? "error"
                        : "")
                    }
                    name="password"
                    onChange={this.onChange}
                  />
                  <i
                    className={
                      "login-error " +
                      (this.state.activeErrPassWord == true
                        ? "error-email"
                        : "")
                    }
                  >
                    {this.state.errPassword}
                  </i>
                </div>
              </div>
              {/* <a href="#" className="form__forgot">
                                Quên mật khẩu ?
                            </a> */}
              <input type="submit" value="Đăng nhập" className="form__button" />
              <div className="rectangle"></div>
              <div className="rectangle2"></div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
