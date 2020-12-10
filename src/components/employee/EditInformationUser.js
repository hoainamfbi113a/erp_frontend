import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";

import { Radio } from "antd";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./EditInformationUser.css";
import CurriculumVitae from "./edit-infor-child/CurriculumVitae"
import PersonalHistory from "./edit-infor-child/PersonalHistory"
import {Link}  from 'react-router-dom'
export default class NotifiDepartment extends Component {
  render() {
    return (
      <div className="content-background2">
        <div style={{ minHeight: "70vh" }} className="edit-infor">
          <div className="edit-infor-tabs">
            <ul>
            <Link to="/crm/employee/edit-information">   
                <li>
                    <div>1</div>
                    <span>Sơ yếu lý lịch</span>
              </li>
            </Link>
            <Link to="/crm/employee/edit-information/personal-history"> 
              <li>
                <div>2</div>
                <span>Lịch sử bản thân</span>
              </li>
              </Link>
              <li>
                <div>3</div>
                <span>Gia nhập Đảng Cộng Sản Việt Nam</span>
              </li>
              <li>
                <div>4</div>
                <span>
                  Tham gia các tổ chức chính trị, xã hội, các nghề nghiệp
                </span>
              </li>
              <li>
                <div>5</div>
                <span>
                  Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính trị
                  ngoại ngữ
                </span>
              </li>
              <li>
                <div>6</div>
                <span>Khen thưởng, kỷ luật</span>
              </li>
              <li>
                <div>7</div>
                <span>Hoàn cảnh kinh tế, quan hệ gia đình</span>
              </li>
              <li>
                <div>8</div>
                <span>Quan hệ gia đình, thân tộc</span>
              </li>
              <li>
                <div>9</div>
                <span>Quan hệ xã hội</span>
              </li>
            </ul>
            <div className="edit-infr-vertical-line"></div>
          </div>
          

          <Route exact path="/crm/employee/edit-information" component = {CurriculumVitae}></Route>
          <Route exact path="/crm/employee/edit-information/personal-history" component = {PersonalHistory}></Route>
        </div>
      </div>
    );
  }
}
