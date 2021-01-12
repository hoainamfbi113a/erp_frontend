import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";
import "./EditInformationUser.css";
import CurriculumVitae from "./edit-infor-child/CurriculumVitae";
import PersonalHistory from "./edit-infor-child/PersonalHistory";
import JoinTCTTXH from "./edit-infor-child/JoinTCTTXH";
import JoinDCS from "./edit-infor-child/JoinDCS";
import ProfessionalCompensation from "./edit-infor-child/ProfessionalCompensation";
import Bonus from "./edit-infor-child/Bonus";
import Family from "./edit-infor-child/Family";
import Kinship from "./edit-infor-child/Kinship";
import Social from "./edit-infor-child/Social";
import axiosConfig from "../../apis/axios";
import { Link } from "react-router-dom";
import { Steps } from "antd";
const { Step } = Steps;
export default class NotifiDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: 1,
      STATUS_PROFILE: 1,
      dataWorkflow:null,
      dataUser:null,
      step_id:null,
    };
  }
  handleClick = (id) => {
    this.setState({ activeLink: id });
  };
  async componentDidMount() {
    let tokenID = localStorage.getItem("tokenID");
    await axiosConfig
      .post(`/api/fe/profiles/user`, {
        id: tokenID,
      })
      .then(async (res) => {
        const data = res.data;
        this.setState({
          dataUser:data
        })
        let pro_id = data.id;
        Axios.get(
          `/api/transfers/profiles/${pro_id}`
        ).then((res) => {
          this.setState({
            STATUS_PROFILE: res.data.data.after_status,
            step_id:res.data.data.next_step_id
          });
        });
      });
      this.fetchWorkflowProfile();
  }
  fetchWorkflowProfile = () =>{
    axiosConfig.get(`/api/workflow/update-profile`)
    .then(res=>{
      this.setState({
        dataWorkflow:res
      })
     
    })
    .catch(err=>{
      console.log("err",err)
    })
  }
  renderWorkflow = () => {
    if (!!this.state.dataWorkflow === true) {
      const workflowProfile = this.state.dataWorkflow;
      return workflowProfile.steps.map((item) => {
        return <Step key={item.id} title={item.description} />;
      });
    }
    // return ""
  };
  render() {
    let value = 3;
    let step_id = this.state.step_id;
    if(step_id === 1){
      value = 0;
    } else if(step_id === 2){
      value = 1;
    } else if(step_id === 3){
      value = 2
    }
    return (
      <div className="content-background2">
        <Steps current={value} size="small" className="process-work-flow">
          {this.renderWorkflow()}
          <Step title="đống hs" />
        </Steps>
        {/* <fieldset disabled={value == 2 || value == 3 ? "disabled" : ""}> */}
          <div style={{ minHeight: "70vh" }} className="edit-infor" disabled>
            <div className="edit-infor-tabs">
              <ul>
                <Link to="/crm/employee/edit-information">
                  <li onClick={() => this.handleClick(1)}>
                    <div
                      className={this.state.activeLink === 1 ? "active" : ""}
                    >
                      1
                    </div>
                    <span
                      className={this.state.activeLink === 1 ? "active" : ""}
                    >
                      Sơ yếu lý lịch
                    </span>
                  </li>
                </Link>
                <Link to="/crm/employee/edit-information/personal-history">
                  <li onClick={() => this.handleClick(2)}>
                    <div
                      className={this.state.activeLink === 2 ? "active" : ""}
                    >
                      2
                    </div>
                    <span
                      className={this.state.activeLink === 2 ? "active" : ""}
                    >
                      Lịch sử bản thân
                    </span>
                  </li>
                </Link>
                <Link to="/crm/employee/edit-information/joinDCS">
                  <li onClick={() => this.handleClick(3)}>
                    <div
                      className={this.state.activeLink === 3 ? "active" : ""}
                    >
                      3
                    </div>
                    <span
                      className={this.state.activeLink === 3 ? "active" : ""}
                    >
                      Gia nhập Đảng Cộng Sản Việt Nam
                    </span>
                  </li>
                </Link>
                <Link to="/crm/employee/edit-information/join-TCTTXH">
                  <li onClick={() => this.handleClick(4)}>
                    <div
                      className={this.state.activeLink === 4 ? "active" : ""}
                    >
                      4
                    </div>
                    <span
                      className={this.state.activeLink === 4 ? "active" : ""}
                    >
                      Tham gia các tổ chức chính trị, xã hội, các nghề nghiệp
                    </span>
                  </li>
                </Link>
                <Link to="/crm/employee/edit-information/professional-compensation">
                  <li onClick={() => this.handleClick(5)}>
                    <div
                      className={this.state.activeLink === 5 ? "active" : ""}
                    >
                      5
                    </div>
                    <span
                      className={this.state.activeLink === 5 ? "active" : ""}
                    >
                      Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính
                      trị ngoại ngữ
                    </span>
                  </li>
                </Link>
                <Link to="/crm/employee/edit-information/bonus">
                  <li onClick={() => this.handleClick(6)}>
                    <div
                      className={this.state.activeLink === 6 ? "active" : ""}
                    >
                      6
                    </div>
                    <span
                      className={this.state.activeLink === 6 ? "active" : ""}
                    >
                      Khen thưởng, kỷ luật
                    </span>
                  </li>
                </Link>
                <Link to="/crm/employee/edit-information/family">
                  <li onClick={() => this.handleClick(7)}>
                    <div
                      className={this.state.activeLink === 7 ? "active" : ""}
                    >
                      7
                    </div>
                    <span
                      className={this.state.activeLink === 7 ? "active" : ""}
                    >
                      Hoàn cảnh kinh tế, quan hệ gia đình
                    </span>
                  </li>
                </Link>
                <Link to="/crm/employee/edit-information/kinship">
                  <li onClick={() => this.handleClick(8)}>
                    <div
                      className={this.state.activeLink === 8 ? "active" : ""}
                    >
                      8
                    </div>
                    <span
                      className={this.state.activeLink === 8 ? "active" : ""}
                    >
                      Quan hệ gia đình, thân tộc
                    </span>
                  </li>
                </Link>
                <Link to="/crm/employee/edit-information/social">
                  <li onClick={() => this.handleClick(9)}>
                    <div
                      className={this.state.activeLink === 9 ? "active" : ""}
                    >
                      9
                    </div>
                    <span
                      className={this.state.activeLink === 9 ? "active" : ""}
                    >
                      Quan hệ xã hội
                    </span>
                  </li>
                </Link>
              </ul>
              <div className="edit-infr-vertical-line"></div>
            </div>

            <Route
              exact
              path="/crm/employee/edit-information"
              component={CurriculumVitae}
            ></Route>
            <Route
              exact
              path="/crm/employee/edit-information/personal-history"
              component={PersonalHistory}
            ></Route>
            <Route
              exact
              path="/crm/employee/edit-information/joinDCS"
              component={JoinDCS}
            ></Route>
            <Route
              exact
              path="/crm/employee/edit-information/join-TCTTXH"
              component={JoinTCTTXH}
            ></Route>
            <Route
              exact
              path="/crm/employee/edit-information/professional-compensation"
              component={ProfessionalCompensation}
            ></Route>
            <Route
              exact
              path="/crm/employee/edit-information/bonus"
              component={Bonus}
            ></Route>
            <Route
              exact
              path="/crm/employee/edit-information/family"
              component={Family}
            ></Route>
            <Route
              exact
              path="/crm/employee/edit-information/kinship"
              component={Kinship}
            ></Route>
            <Route
              exact
              path="/crm/employee/edit-information/social"
              component={Social}
            ></Route>
          </div>
        {/* </fieldset> */}
      </div>
    );
  }
}
