import React, { Component } from "react";
import "./EditInformationUser.css";
import CurriculumVitae from "./edit-infor-child/CurriculumVitae";
import CurriculumVitaes from "./edit-infor-child/CurriculumVitaes";
import PersonalHistory from "./edit-infor-child/PersonalHistory";
import JoinTCTTXH from "./edit-infor-child/JoinTCTTXH";
import JoinDCS from "./edit-infor-child/JoinDCS";
import ProfessionalCompensation from "./edit-infor-child/ProfessionalCompensation";
import Bonus from "./edit-infor-child/Bonus";
import Family from "./edit-infor-child/Family";
import Kinship from "./edit-infor-child/Kinship";
import Social from "./edit-infor-child/Social";
import { Steps } from "antd";
import docCookies from "doc-cookies";
import { getProfile} from "apis/profileApi";
import { workflowProfile } from "apis/workflowApi";
import { transfersProfile } from "apis/transfersApi";
const { Step } = Steps;
export default class NotifiDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: 1,
      STATUS_PROFILE: 1,
      dataWorkflow: null,
      step_id: null,
    };
  }
  handleClick = (id) => { 
    this.setState({ activeLink: id });
  };
  renderComponents = () => {
    if (this.state.activeLink === 1) {
      return (
        <CurriculumVitae statusProfile={this.state.step_id} handleReloadComponent={this.handleReloadComponent} />
      );
    }
    if (this.state.activeLink === 2) {
      return <PersonalHistory />;
    }
    if (this.state.activeLink === 3) {
      return <JoinDCS/>;
    }
    if (this.state.activeLink === 4) {
      return <JoinTCTTXH />;
    }
    if (this.state.activeLink === 5) {
      return <ProfessionalCompensation />;
    }
    if (this.state.activeLink === 6) {
      return <Bonus />;
    }
    if (this.state.activeLink === 7) {
      return <Family />;
    }
    if (this.state.activeLink === 8) {
      return <Kinship />;
    }
    if (this.state.activeLink === 9) {
      return <Social />;
    }
  };
  async componentDidMount() {
   this.fetProfile();
    this.fetchWorkflowProfile();
  }
  fetProfile = async () =>{
    let tokenID = docCookies.getItem("user_id");
    let resGetProfile = await getProfile(tokenID);
    const data = resGetProfile.data;
    let pro_id = data.id;
    let dataTransfersProfile = await transfersProfile(pro_id);
    this.setState({
      STATUS_PROFILE: dataTransfersProfile.data.after_status,
      step_id: dataTransfersProfile.data.next_step_id,
    });
  }
  fetchWorkflowProfile = async () => {
    let dataWorkflowProfile = await workflowProfile();
    this.setState({
      dataWorkflow: dataWorkflowProfile,
    });
  };
  renderWorkflow = () => {
    if (!!this.state.dataWorkflow === true) {
      const workflowProfile = this.state.dataWorkflow;
      return workflowProfile.steps.map((item) => {
        return <Step key={item.id} title={item.description} />;
      });
    }
  };
  handleReloadComponent = () => {
    this.componentDidMount();
  };
  render() {
    let value = 0;
    let step_id = this.state.step_id;
    if (step_id === 1) {
      value = 0;
    } else if (step_id === 2) {
      value = 1;
    } else if (step_id === 3) {
      value = 2;
    } else {
      value = 3
    }
    return (
      <div className="content-background2">
        <Steps current={value} size="small" className="process-work-flow">
          {this.renderWorkflow()}
          <Step title="Hồ sơ sẵn sàng" />
        </Steps>
        <div style={{ minHeight: "70vh" }} className="edit-infor" disabled>
          <div className="edit-infor-tabs">
            <ul>
              <li onClick={() => this.handleClick(1)}>
                <div className={this.state.activeLink === 1 ? "active" : ""}>
                  1
                </div>
                <span className={this.state.activeLink === 1 ? "active" : ""}>
                  Sơ yếu lý lịch
                </span>
              </li>
              <li onClick={() => this.handleClick(2)}>
                <div className={this.state.activeLink === 2 ? "active" : ""}>
                  2
                </div>
                <span className={this.state.activeLink === 2 ? "active" : ""}>
                  Lịch sử bản thân
                </span>
              </li>

              <li onClick={() => this.handleClick(3)}>
                <div className={this.state.activeLink === 3 ? "active" : ""}>
                  3
                </div>
                <span className={this.state.activeLink === 3 ? "active" : ""}>
                  Gia nhập Đảng Cộng Sản Việt Nam
                </span>
              </li>
              <li onClick={() => this.handleClick(4)}>
                <div className={this.state.activeLink === 4 ? "active" : ""}>
                  4
                </div>
                <span className={this.state.activeLink === 4 ? "active" : ""}>
                  Tham gia các tổ chức chính trị, xã hội, các nghề nghiệp
                </span>
              </li>

              <li onClick={() => this.handleClick(5)}>
                <div className={this.state.activeLink === 5 ? "active" : ""}>
                  5
                </div>
                <span className={this.state.activeLink === 5 ? "active" : ""}>
                  Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính trị
                  ngoại ngữ
                </span>
              </li>
              <li onClick={() => this.handleClick(6)}>
                <div className={this.state.activeLink === 6 ? "active" : ""}>
                  6
                </div>
                <span className={this.state.activeLink === 6 ? "active" : ""}>
                  Khen thưởng, kỷ luật
                </span>
              </li>
              <li onClick={() => this.handleClick(7)}>
                <div className={this.state.activeLink === 7 ? "active" : ""}>
                  7
                </div>
                <span className={this.state.activeLink === 7 ? "active" : ""}>
                  Hoàn cảnh kinh tế, quan hệ gia đình
                </span>
              </li>
              <li onClick={() => this.handleClick(8)}>
                <div className={this.state.activeLink === 8 ? "active" : ""}>
                  8
                </div>
                <span className={this.state.activeLink === 8 ? "active" : ""}>
                  Quan hệ gia đình, thân tộc
                </span>
              </li>
              <li onClick={() => this.handleClick(9)}>
                <div className={this.state.activeLink === 9 ? "active" : ""}>
                  9
                </div>
                <span className={this.state.activeLink === 9 ? "active" : ""}>
                  Quan hệ xã hội
                </span>
              </li>
            </ul>
            <div className="edit-infr-vertical-line"></div>
          </div>
          {this.renderComponents()}
        </div>
      </div>
    );
  }
}
