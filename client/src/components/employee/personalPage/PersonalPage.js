import React from "react";
import LazyLoad from 'react-lazyload';
import coverimg from "../../../assets/images/coverimg.png";
import avatar from "../../../assets/images/avatar.png";
import HeaderLayout from "../../Header/Header"
import MenuLayout from "../../Menu/MenuLayout";
import { Button } from "antd";
import { Timeline } from "antd";
import { Layout } from "antd";
const { Footer } = Layout;
import "./PersonalPage.css";
const PersonalPage = () => {
  return (
    <Layout>
      <MenuLayout />
      <Layout>
      <HeaderLayout />
      {/* <LazyLoad height={20000} offset={10000}> */}
    <div style={{ background: "#EEEFF3" }} >
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
          <div>
            <div className="infor-primary-name">Nguyễn Quang Vinh</div>
            <div className="infor-primary-department">Nhân viên phòng CNTT</div>
            <div className="infor-primary-contact">
              <ul>
                <li className="infor-primary-birthday">03/01/1990</li>
                <li className="infor-primary-phone">090550999</li>
                <li className="infor-primary-gmail">
                  lanphuong@tuoitre.com.vn
                </li>
              </ul>
            </div>
          </div>
          <div className="infor-primary-contact-edit">
            <Button className="btn-edit-user">Chỉnh sửa</Button>
          </div>
        </div>
      </div>
      <hr className="personal-page-hr" ></hr>
      <div className="personal-page-bottom">
        <ul>
          <li>
            <div className="personal-page-bottom-left">Bằng cấp</div>
            <div className="personal-page-bottom-right">
              Đại học Công nghệ thông tins
            </div>
          </li>
          <li>
            <div className="personal-page-bottom-left">Ngoại ngữ</div>
            <div className="personal-page-bottom-right">Tiếng anh</div>
          </li>
          <li>
            <div className="personal-page-bottom-left">Địa chỉ</div>
            <div className="personal-page-bottom-right">
              Ấp 8 , Xã Tân An Luông, Huyện Vũng Liêm, Tỉnh Vĩnh Long
            </div>
          </li>
          <li>
            <div className="personal-page-bottom-left">Quá trình công tác:</div>
            <div className="personal-page-bottom-right ">
              <Timeline>
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
    {/* </LazyLoad> */}
    <Footer style={{ textAlign: "center" }} className="layout-footer">
              Ant Design ©2020 Created by TuoiTre
            </Footer>
          </Layout>
    </Layout>
  );
};

export default PersonalPage;
