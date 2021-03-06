import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useSelector, useDispatch } from "react-redux";
import { getOrganize2 } from "../../../reduxToolkit/features/userProfile/organize2Slice";
import { Tabs } from "antd";
import {
  InfoCircleOutlined,
  CarOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { getReward } from "../../../reduxToolkit/features/userProfile/rewardSlice";
import { Timeline } from "antd";
import user2 from "assets/images/icon/user2.png";
import phone from "assets/images/icon/phone.png";
import email from "assets/images/icon/email.png";
import { message } from "antd";
import docCookies from "doc-cookies";
import "./PersonalPage.css";
import axios from "axios";
import { formatDateNumber } from "../../../helpers/FuncHelper";
const { TabPane } = Tabs;
const id_user = docCookies.getItem("user_id");
console.log(id_user)
const placeHolder = "R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const PersonalPage = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);
  const dataProfile = useSelector((state) => state.userProfile);
  const dataOrgan2 = useSelector((state) => state.organize2User);
  const dataReward = useSelector((state) => state.rewardUser);
  const [avatarCoverImg, setAvatarCoverImg] = useState(placeHolder);
  const [dataImg, setDataImg] = useState(placeHolder);
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetChImg();
    dispatch(
      getReward({
        type: 2,
        id_user,
      })
    );
    if (!dataOrgan2.length) {
      dispatch(
        getOrganize2({
          type: 2,
          id_user,
        })
      );
    }
  }, []);
  const fetChImg = () => {
    axios
      .get(`/api/user/resources/${id_user}`)
      .then((res) => {
        let resImg = res.data;
        let i = -1;
        for (let item of resImg) {
          i++;
          if (item.resource_type === "avatar") {
            let arrImg = res.data[i].resource_content;
            setDataImg(arrImg.content);
          }
          if (item.resource_type === "cover") {
            let arrImg = res.data[i].resource_content;
            setAvatarCoverImg(arrImg.content);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeCover = (e) => {
    const formData = new FormData();
    formData.append("resource_type", "image");
    formData.append("user_resource_type", "cover");
    formData.append("user_id", docCookies.getItem("user_id"));
    formData.append("file", e.target.files[0]);
    axios
      .post("/api/user/resources", formData)
      .then((res) => {
        if (res.data.message === "Successfully") {
          message.success("C???p nh???t ???nh b??a th??nh c??ng");
          fetChImg();
        } else {
          message.error("C???p nh???t ???nh b??a th???t b???i");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChange = (e) => {
    const formData = new FormData();
    formData.append("resource_type", "image");
    formData.append("user_resource_type", "avatar");
    formData.append("user_id", docCookies.getItem("user_id"));
    formData.append("file", e.target.files[0]);
    axios
      .post("/api/user/resources", formData)
      .then((res) => {
        if (res.data.message === "Successfully") {
          message.success("C???p nh???t ???nh ?????i di???n th??nh c??ng");
          fetChImg();
        } else {
          message.error("C???p nh???t ???nh ?????i di???n th???t b???i");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderOrgan = () => {
    return dataOrgan2.map((item) => {
      return (
        <Timeline.Item>
          <div className="personal-history-time">
            {formatDateNumber(item.org_time_from, dateFormatList[0])} -{" "}
            <span>
              {" "}
              {formatDateNumber(item.org_time_to, dateFormatList[0])}
            </span>
          </div>
          <p className="personal-history-content">{item.org_note}</p>
        </Timeline.Item>
      );
    });
  };
  const renderReward = () => {
    return dataReward.map((item) => {
      return (
        <Timeline.Item>
          <div className="personal-history-time">
            {formatDateNumber(item.rew_time_from, dateFormatList[0])} -{" "}
            <span>
              {" "}
              {formatDateNumber(item.rew_time_to, dateFormatList[0])}
            </span>
          </div>
          <p className="personal-history-content">{item.rew_formality}</p>
        </Timeline.Item>
      );
    });
  };
  return (
    <div style={{ background: "#EEEFF3" }}>
      <div className="container-fluid emp-profile">
        <div className="row">
          <div className="col-12 thumbnail">
            <div className="thumb_1 div-img-cover">
              <LazyLoad height={200}>
                <img
                  className="img-cover"
                  src={`data:image/jpeg;base64,${avatarCoverImg}`}
                  alt=""
                />
              </LazyLoad>
            </div>
            <div
              style={{ position: "absolute", right: "15px", bottom: "10px" }}
            >
              <div className="file-input">
                <input
                  type="file"
                  name="selectedFile"
                  onChange={onChangeCover}
                  id="file-input"
                  className="file-input__input"
                />
                <label className="file-input__label" for="file-input">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    className="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                  <span>Ch???nh s???a ???nh b??a</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-2 offset-md-1">
            <div className="profile-img">
              <img src={`data:image/jpeg;base64,${dataImg}`} alt="" />
              <div className="file btn btn-lg btn-primary">
                Change Photo
                <input
                  name="selectedFile"
                  onChange={onChange}
                  type="file"
                  name="file"
                />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile-head">
              <div className="row">
                <div className="col-md-8 profile-decs">
                  <span>H??? v?? t??n: &nbsp; </span>
                  <h5>
                    {dataProfile
                      ? dataProfile.pro_name
                      : "Ch??a c???p nh???t h??? v?? t??n"}{" "}
                  </h5>
                </div>
                <div className="col-md-4">
                  <input
                    type="submit"
                    className="profile-edit-btn"
                    name="btnAddMore"
                    value="Edit Profile"
                  />
                </div>
                <div>
                </div>
             
              </div>
              <div className = "profile-decs">
                  <span className= "profile-decs-content" >Ch???c danh - ch???c v???: &nbsp; </span>
                  <h6>
                    {dataProfile && dataProfile.department
                      ? dataProfile.department.data.pos_name
                      : "Ch??a c???p nh???t ch???c v???"}
                  </h6>
                </div>
              <div className = "profile-decs">
                <span className= "profile-decs-content">????n v??? c??ng t??c: &nbsp; </span>
                <h6>
                  {dataProfile && dataProfile.department
                    ? dataProfile.department.data.dep_name
                    : "Ch??a c???p nh???t ph??ng ban"}
                </h6>
              </div>
              <div className = "profile-decs">
                <span className= "profile-decs-content">?????i t?????ng lao ?????ng: &nbsp; </span>
                <h6>
                  {dataProfile && dataProfile.workObject
                    ? dataProfile.workObject.data.formality
                    : "Ch??a c???p nh???t ?????i t?????ng lao ?????ng"}
                </h6>
              </div>
              <div className="infor-primary-contact">
                <ul>
                  <div>
                    <img src={user2}></img>
                  </div>
                  <li
                    style={{ width: "120px" }}
                    className="infor-primary-birthday"
                  >
                    {dataProfile.pro_local_phone != null ? dataProfile.pro_local_phone:"Ch??a c???p nh???t sdt n???i b???" }
                    {/* {dataProfile ? dataProfile.pro_local_phone != null: dataProfile.pro_local_phone  ? "dataProfile.pro_local_phone": "Sdt n???i b??? ch??a c???p nh???t"} */}
                  </li>
                  <div>
                    <img src={phone}></img>
                  </div>
                  <li className="infor-primary-phone">
                    {dataUser ? dataUser.phone : "Ch??a c???p nh???t ??i???n tho???i"}
                  </li>
                  <div>
                    <img src={email}></img>
                  </div>
                  <li className="infor-primary-gmail">
                    {dataUser ? dataUser.email : "Ch??a c???p nh???t email"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="offset-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
