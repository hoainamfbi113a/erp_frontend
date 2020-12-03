import React, { Component } from "react";
import axios from "axios"
import { Spin } from "antd";
import { ValidateEmail, ValidateField } from "../../helpers/FuncHelper";
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
      errEmail: "",
      errPassword: "",
      ishow: false,
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
    // _this.errEmail = ValidateEmail(_this.email, 8);
    // _this.errPassword = ValidateField(_this.password, 6, 100, "Mật khẩu");
    // const params = {
    //   "username":this.state.userLogin,
    //   "password": this.state.userPass,
    //   "user_ip":"123",
    //   "user_agent":"ad"
    // }
    console.log(process.env.apiUrl)
    const params = {
      "username":"dang",
      "password":"12345@",
      "user_ip":"123",
      "user_agent":"ad"
      }
  // let  {data}  = await axios.post("http://192.168.61.116/api/login",params);
    // console.log(data)
    axios.get( `http://192.168.61.116/api/departments/profiles/3`)
    .then(res => {
      const persons = res.data;
      console.log(persons)
    })
    // return axios
    // .post("http://192.168.61.116/api/login", params)
    // .then(res =>{
    //   console.log(res.data)
      if (this.state.userLogin === "admin" && this.state.userPass === "admin") {
        localStorage.setItem("usertoken", "NguyeenxHoaifNam");
        this.setState({ ishow: !this.state.ishow });
        setTimeout(() => {
          this.props.history.push("/crm/notification");
          this.setState({ ishow: !this.state.ishow });
        }, 600);
      } else {
        alert("tai khoan hoac mat khau khong dung");
      }
    // })
    //  .catch(err => {
    //   console.log(err)
    // })
    // if (_this.errEmail == "" && _this.errPassword == "") {
    // }
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
                    className="form__input error"
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
                    className="form__input error"
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
