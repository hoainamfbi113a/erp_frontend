import React, {useEffect, useState} from "react";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import coverimg from "assets/images/coverimg.png";
import avatar from "assets/images/avatar.jpg";
import { Button, Tabs } from "antd";
import { InfoCircleOutlined, CarOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
import { Timeline } from "antd";
import { Layout } from "antd";
import user2 from "assets/images/icon/user2.png";
import phone from "assets/images/icon/phone.png";
import email from "assets/images/icon/email.png";
import { Upload, message } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import docCookies from "doc-cookies";
import "./PersonalPage.css";
import axios from "axios";
const PersonalPage = () => {
  const dataUser = useSelector((state) => state.user);
  const dataProfile = useSelector((state) => state.userProfile);
  const [avatarImg, setAvatarImg] = useState("")
  const [dataImg, setDataImg] = useState("")
  useEffect(() => {
    axios.get("/api/user/resources/1")
    .then(res=>{
      setDataImg(res.data[0].resource_content[0].content)
      // console.log()
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  let data = "123"
  const onChange = (e) =>{
    const formData = new FormData()
    formData.append('resource_type', "image");
    formData.append('user_resource_type', "avatar");
    formData.append('user_id', docCookies.getItem(
      "user_id"
    ));
    formData.append('file', e.target.files[0]);
    axios.post("/api/user/resources", formData)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div style={{ background: "#EEEFF3" }}>
      <div className="container-fluid emp-profile">
        <div className="row">
          <div className="col-12 thumbnail">
            <div className="thumb_1 div-img-cover">
            <img className="img-cover" src={`data:image/jpeg;base64,${dataImg}`} alt="" />
            </div>
            <Upload className="d-block">
              <Button icon={<CameraOutlined />}>Chỉnh sửa ảnh bìa</Button>
            </Upload>
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
                type="file" name="file" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="profile-work">
                  <p>Quan hệ</p>
                  <a href="">...</a>
                  <br />
                  <a href="">...</a>
                  <br />
                  <a href="">....</a>
                  <p>Khen thưởng</p>
                  <a href="">...</a>
                  <br />
                  <a href="">...</a>
                  <br />
                  <a href="">...</a>
                  <br />
                  <a href="">...</a>
                  <br />
                </div>
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
                  <Timeline.Item>
                    <div className="personal-history-time">
                      05/04/2003 - 10/05/2005
                    </div>
                    <p className="personal-history-content">
                      Nhân viên Công Ty TNHH Sutrix Media
                    </p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <div className="personal-history-time">
                      10/05/2005 - 10/05/2008
                    </div>
                    <p className="personal-history-content">
                      Nhân viên Công Ty FPT Online
                    </p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <div className="personal-history-time">
                      10/05/2008 - đến nay
                    </div>
                    <p className="personal-history-content">
                      Nhân viên Báo Tuổi Trẻ
                    </p>
                  </Timeline.Item>
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
