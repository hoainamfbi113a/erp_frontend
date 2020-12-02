import React, { Component } from "react";
import { Spin } from 'antd';
import {
  FacebookOutlined,
  GooglePlusOutlined,
  InstagramFilled,
} from "@ant-design/icons";
import "./Login.css";
import authentication from "../../assets/images/authentication.svg";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userLogin: "",
      userPass: "",
      ishow:false
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.userLogin === "admin" && this.state.userPass === "admin") {
      localStorage.setItem("usertoken", "NguyeenxHoaifNam");
      this.setState({ ishow: !this.state.ishow});
      setTimeout(()=>{
        this.props.history.push('/crm')
        this.setState({ ishow: !this.state.ishow});
      },600);
    }
    else{
      alert("tai khoan hoac mat khau khong dung")
    }
  };
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
          <img src={authentication} alt="" className="form__img" />
          <form className="form__content" onSubmit={this.onSubmit}>
            <h1 className="form__title">Welcome CRP</h1>
            <div className="form__div form__div-one">
              <div className="form__icon">
                <i className="bx bx-user-circle" />
              </div>
              <div className="form__div-input">
                <input
                  placeholder="Tên đăng nhập"
                  type="text"
                  className="form__input"
                  name="userLogin"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form__div">
              <div className="form__icon">
                <i className="bx bx-lock" />
              </div>
              <div className="form__div-input">
                <input
                  placeholder="Mật khẩu"
                  type="password"
                  className="form__input"
                  name="userPass"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <a href="#" className="form__forgot">
              Quên mật khẩu ?
            </a>
            <input type="submit" value="Đăng nhập" className="form__button" />
            <div className="form__social">
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
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}
