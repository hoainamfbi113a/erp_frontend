import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { ValidateEmail, ValidateField } from "helpers/FuncHelper";
import { message } from "antd";
import docCookies from "doc-cookies";
import { withRouter } from "react-router-dom";
import "./Login.css";
import logologin from "assets/images/logoFix1.png";
import background from "assets/images/bgd.jpg";
import { useForm } from "react-hook-form";
import { getLogin} from "reduxToolkit/features/authencationSlice"
import { showLoading, hideLoading} from "reduxToolkit/features/uiLoadingSlice"
const Logins = () => {
  const dispatch = useDispatch()
  const { push } = useHistory();
  const [activeErrEmail, setActiveErrEmail] = useState(false)
  const [activeErrPassWord, setActiveErrPassWord] = useState(false)
  const [errEmail, setErrEmail] = useState("err")
  const [errPassword, setErrPassword] = useState("err")
  const [isVibrate, setIsVibrate] = useState(false)
  let emailUser = "";
  const onSubmitForm = async(formData) => {
    // dispatch(showLoading())
    emailUser = formData.email;
    let errEmail = ValidateEmail(formData.email, 8);
    let errPassword = ValidateField(formData.password, 6, 18, "Mật khẩu");
    if (errEmail == "pass" && errPassword == "pass") {
      const params = {
        email: formData.email,
        password: formData.password,
        user_ip: "123",
        user_agent: navigator.userAgent,
      }
      await dispatch(getLogin(params));
    } else {
      if (errEmail !== "pass" && errPassword !== "pass") {
          setErrEmail(errEmail);
          setErrPassword(errPassword);
          setActiveErrEmail(true);
          setActiveErrPassWord(true);
          setIsVibrate(true);
      } else if (errEmail != "pass") {
          setErrEmail(errEmail);
          setActiveErrEmail(true);
          setActiveErrPassWord(false);
          setIsVibrate(true);
      } else if (errPassword != "pass") {
        setErrPassword(errPassword);
        setActiveErrPassWord(true);
        setActiveErrEmail(false);
        setIsVibrate(true);
      }
      setTimeout(() => {
        setIsVibrate(false);
      }, 300);
    }
    
  }
  const respLogin = useSelector(state => state.authen);
  console.log(respLogin)
  useEffect (()=>{
    if(respLogin && respLogin.message === "Đăng nhập thành công!") {
      if(emailUser === "manager0@gmail.com"){
        localStorage.setItem("0","0")
      }
      push("/");
    } else if (respLogin && respLogin.message === "Email hoặc mật khẩu không đúng!") {
        setActiveErrEmail(false);
        setActiveErrPassWord(false);
        message.error("Email hoặc mật khẩu không đúng!");
      } 
  },[respLogin])
  const { register, handleSubmit, errors, watch } = useForm();
  return (
    <div>
      {/* <div className="example">{this.state.ishow == true ? <Spin /> : ""}</div> */}
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
          <form className="form__content" onSubmit={handleSubmit(onSubmitForm)}>
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
                    "form__input " 
                    + (activeErrEmail == true &&
                    isVibrate == true
                      ? "error"
                      : "")
                  }
                  ref= {register}
                  name="email"
                />
                <i
                  className={
                    "login-error " +
                    (activeErrEmail == true ? "error-email" : "")
                  }
                >
                  {errEmail}
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
                    "form__input " 
                    + (activeErrPassWord == true &&
                    isVibrate == true
                      ? "error"
                      : "")
                  }
                  ref={register}
                  name="password"
                />
                <i
                  className={
                    "login-error " +
                    (activeErrPassWord == true ? "error-email" : "")
                  }
                >
                  {errPassword}
                </i>
              </div>
            </div>
            <input type="submit" value="Đăng nhập" className="form__button" />
            <div className="rectangle"></div>
            <div className="rectangle2"></div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Logins;
