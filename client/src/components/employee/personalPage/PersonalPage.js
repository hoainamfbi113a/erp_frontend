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
import {
  getReward,
} from "../../../reduxToolkit/features/userProfile/rewardSlice";
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
  useEffect(() => {
    fetChImg();
    dispatch(getReward({
      type: 2,
      id_user,
    }));
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
          message.success("Cập nhật ảnh bìa thành công");
          fetChImg();
        } else {
          message.error("Cập nhật ảnh bìa thất bại");
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
          message.success("Cập nhật ảnh đại diện thành công");
          fetChImg();
        } else {
          message.error("Cập nhật ảnh đại diện thất bại");
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
          <p className="personal-history-content">
           {item.org_note}
          </p>
        </Timeline.Item>
      );
    });
  };
  const renderReward = () => {
    return dataReward.map(item=>{
      return (
        <Timeline.Item>
          <div className="personal-history-time">
          {formatDateNumber(item.rew_time_from, dateFormatList[0])} -{" "}
            <span>
              {" "}
              {formatDateNumber(item.rew_time_to, dateFormatList[0])}
            </span>
          </div>
          <p className="personal-history-content">
           {item.rew_formality}
          </p>
        </Timeline.Item>
      )
    })
  }
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
                  <span>Upload file</span>
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
                <div className="col-md-8">
                  <h5>
                    {dataProfile
                      ? dataProfile.pro_name
                      : "Chưa cập nhật họ và tên"}{" "}
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
              </div>

              <h6>
                {dataProfile && dataProfile.department
                  ? dataProfile.department.data.pos_name
                  : "Chưa cập nhật chức vụ"}
              </h6>
              <h6>
                {dataProfile && dataProfile.department
                  ? dataProfile.department.data.dep_name
                  : "Chưa cập nhật phòng ban"}
              </h6>
              <div className="infor-primary-contact">
                <ul>
                  <div>
                    <img src={user2}></img>
                  </div>
                  <li
                    style={{ width: "120px" }}
                    className="infor-primary-birthday"
                  >
                    {dataProfile ? dataProfile.pro_birth_day : "Ngày sinh"}
                  </li>
                  <div>
                    <img src={phone}></img>
                  </div>
                  <li className="infor-primary-phone">
                    {dataUser ? dataUser.phone : "Chưa update phone"}
                  </li>
                  <div>
                    <img src={email}></img>
                  </div>
                  <li className="infor-primary-gmail">
                    {dataUser ? dataUser.email : "Chưa cập nhật email"}
                  </li>
                </ul>
              </div>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined />
                    Thông tin
                  </span>
                }
                key="1"
              >
                <div className="row">
                  <div className="col-md-4">
                    <label>Bằng cấp</label>
                  </div>
                  <div className="col-md-8">
                    <p>
                      {dataProfile && dataProfile.userDegree
                        ? dataProfile.userDegree.data.deg_diploma
                        : "Đại học Công nghệ thông tin"}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label>Ngoại ngữ</label>
                  </div>
                  <div className="col-md-8">
                    <p>Tiếng anh</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label>Địa chỉ</label>
                  </div>
                  <div className="col-md-8">
                    <p>
                      {dataProfile
                        ? dataProfile.pro_resident
                        : "Ấp 8 , Xã Tân An Luông, Huyện Vũng Liêm, Tỉnh Vĩnh Long"}
                    </p>
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CarOutlined />
                    Quá trình công tác
                  </span>
                }
                key="2"
              >
                <Timeline className="personal-page-timeline">
                  {renderOrgan()}
                </Timeline>
              </TabPane>
              {/* <TabPane
                tab={
                  <span>
                    <IdcardOutlined /> Quan hệ
                  </span>
                }
                key="3"
              >
                <a href="">...</a>
                <br />
                <a href="">...</a>
                <br />
                <a href="">...</a>
                <br />
                <a href="">...</a>
              </TabPane> */}
              <TabPane
                tab={
                  <span>
                    {" "}
                    <SmileOutlined />
                    Khen thưởng
                  </span>
                }
                key="4"
              >
                 <Timeline className="personal-page-timeline">
                  {renderReward()}
                </Timeline>
              </TabPane>
            </Tabs>
          </div>
          <div className="offset-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
