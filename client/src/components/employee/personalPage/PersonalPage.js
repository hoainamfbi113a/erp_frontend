import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import coverimg from "../../../assets/images/coverimg.png";
import avatar from "../../../assets/images/avatar.png";
import HeaderLayout from "../../Header/Header";
import MenuLayout from "../../Menu/MenuLayout";
import { getProfile } from "../../../apis/profileApi";
import { getUser } from "../../../apis/authenticationApi";
import { Button } from "antd";
import { Timeline } from "antd";
import { Layout } from "antd";
import docCookies from "doc-cookies";
import user2 from "../../../assets/images/icon/user2.png";
import phone from "../../../assets/images/icon/phone.png";
import email from "../../../assets/images/icon/email.png";
const { Footer } = Layout;
import "./PersonalPage.css";
const PersonalPage = () => {
    const [dataUser, setDataUser] = useState(null);
    const [dataProfile, setDataProfile] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const user_id = docCookies.getItem("user_id");
        setDataUser(await getUser(user_id));
        setDataProfile(await getProfile(user_id));
    };
    return (
        <Layout>
            <MenuLayout />
            <Layout>
                <HeaderLayout />
                <div style={{ background: "#EEEFF3" }}>
                    <div className="container">
                        <div className="personal-page-top">
                            {/* <LazyLoad height={1000}> */}
                            <img src={coverimg} alt="" className="personal-page-top-cover" />
                            {/* </LazyLoad> */}
                        </div>
                        <div className="personal-page-content">
                            <div className="personal-page-content-avatar">
                                <LazyLoad height={200}>
                                    <img src={avatar} alt="" className="personal-page-top-img" />
                                </LazyLoad>
                            </div>
                            <div className="personal-page-content-infor-primary">
                                <div className="personal-page-primary-infor">
                                    <div className="infor-primary-name">
                                        {dataProfile
                                            ? dataProfile.data.pro_name
                                            : "Chưa cập nhật họ và tên"}{" "}
                                    </div>
                                    <div className="infor-primary-department">
                                        {dataProfile
                                            ? dataProfile.data.department.data.dep_name
                                            : "Chưa cập nhật phòng ban"}
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
                                                {dataProfile
                                                    ? dataProfile.data.pro_birth_day
                                                    : "Ngày sinh"}
                                            </li>
                                            <div>
                                                <img src={phone}></img>
                                            </div>
                                            <li className="infor-primary-phone">
                                                {dataUser
                                                    ? dataUser.data.phone
                                                    : "Chưa update phone"}
                                            </li>
                                            <div>
                                                <img src={email}></img>
                                            </div>
                                            <li className="infor-primary-gmail">
                                                {dataUser
                                                    ? dataUser.data.email
                                                    : "chưa cập nhật email"}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="infor-primary-contact-edit">
                                    <Button className="btn-edit-user">Chỉnh sửa</Button>
                                </div>
                            </div>
                        </div>
                        <hr className="personal-page-hr"></hr>
                        <div className="personal-page-bottom">
                            <ul>
                                <li>
                                    <div className="personal-page-bottom-left">Bằng cấp</div>
                                    <div className="personal-page-bottom-right">
                                        {dataProfile && dataProfile.data.userDegree
                                            ? dataProfile.data.userDegree.data.deg_diploma
                                            : "Đại học Công nghệ thông tin"}{" "}
                                        :
                                        {/* {dataProfile && dataProfile.data.userDegree ? dataProfile.data.userDegree.data.deg_school_name : "Đại học Công nghệ thông tin"}  */}
                                    </div>
                                </li>
                                <li>
                                    <div className="personal-page-bottom-left">Ngoại ngữ</div>
                                    <div className="personal-page-bottom-right">Tiếng anh</div>
                                </li>
                                <li>
                                    <div className="personal-page-bottom-left">Địa chỉ</div>
                                    <div className="personal-page-bottom-right">
                                        {dataProfile
                                            ? dataProfile.data.pro_resident
                                            : "Ấp 8 , Xã Tân An Luông, Huyện Vũng Liêm, Tỉnh Vĩnh Long"}
                                    </div>
                                </li>
                                <li>
                                    <div className="personal-page-bottom-left">
                                        Quá trình công tác:
                                    </div>
                                    <div className="personal-page-bottom-right ">
                                        <Timeline className="personal-page-timeline">
                                            <Timeline.Item>
                                                <div className="personal-history-time">
                                                    05/09/1990 - 10/05/1995
                                                </div>
                                                <p className="personal-history-content">
                                                    Nhân viên Công Ty TNHH Sutrix Media
                                                </p>
                                            </Timeline.Item>
                                            <Timeline.Item>
                                                <div className="personal-history-time">
                                                    05/09/1990 - 10/05/1995
                                                </div>
                                                <p className="personal-history-content">
                                                    Nhân viên Công Ty TNHH Sutrix Media
                                                </p>
                                            </Timeline.Item>
                                            <Timeline.Item>
                                                <div className="personal-history-time">
                                                    05/09/1990 - 10/05/1995
                                                </div>
                                                <p className="personal-history-content">
                                                    Nhân viên Công Ty TNHH Sutrix Media
                                                </p>
                                            </Timeline.Item>
                                            <Timeline.Item>
                                                <div className="personal-history-time">
                                                    05/09/1990 - 10/05/1995
                                                </div>
                                                <p className="personal-history-content">
                                                    Nhân viên Công Ty TNHH Sutrix Media
                                                </p>
                                            </Timeline.Item>
                                        </Timeline>
                                        ,
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer style={{ textAlign: "center" }} className="layout-footer">
                    Ant Design ©2020 Created by TuoiTre
                </Footer>
            </Layout>
        </Layout>
    );
};

export default PersonalPage;
