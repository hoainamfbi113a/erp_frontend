import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { transfersProfile } from "apis/transfersApi";
import { workflowProfile } from "apis/workflowApi";
import {updateProfile, getProfile } from "apis/profileApi";
import CurriculumVitae from "./CurriculumVitae";
import PersonalHistory from "./PersonalHistory";
import JoinTCTTXH from "./JoinTCTTXH";
import JoinDCS from "./JoinDCS";
import ProfessionalCompensation from "./ProfessionalCompensation";
import Bonus from "./Bonus";
import Family from "./Family";
import Kinship from "./Kinship";
import Social from "./Social";
import Notify from "components/Modal/Notify";
import axiosConfig from "apis/axios";
import { getUserProfile } from "reduxToolkit/features/userProfileSlice";
import { showLoading, hideLoading} from "reduxToolkit/features/uiLoadingSlice"
import {
    Steps,
  } from "antd";
  const { Step } = Steps;
const AddAndUpdateInforUser = (props) => {
  const dispatch = useDispatch()
  const [activeLink, setActiveLink] = useState(1);
  const [modalNotify,setModalNotify] = useState(false);
  const [step_id, setStep_id] = useState(0);
  const [workflow, setWorkflowProfile] = useState(null);
  const [profile, setProfile] = useState({})
  const dataProfile = useSelector((state) => state.userProfile);
  const renderMenuLeft = () => {
    if (activeLink === 1) {
      return <CurriculumVitae idUser={props.match.params.id} value = {value}
        handleReloadComponent={handleReloadComponent}
        dataProfile = {profile}
         />;
    }
    if (activeLink === 2) {
      return <PersonalHistory />;
    }
    if (activeLink === 3) {
      return <JoinDCS />;
    }
    if (activeLink === 4) {
      return <JoinTCTTXH />;
    }
    if (activeLink === 5) {
      return <ProfessionalCompensation />;
    }
    if (activeLink === 6) {
      return <Bonus />;
    }
    if (activeLink === 7) {
      return <Family />;
    }
    if (activeLink === 8) {
      return <Kinship />;
    }
    if (activeLink === 9) {
      return <Social />;
    }
  };
  const renderWorkflow = () => {
    // console.log(workflow)
    if (workflow ) {
      return workflow.map((item) => {
        return <Step key={item.id} title={item.name} />;
      });
    } else {

    }
  };
  const fetchFlowProfile = () => {
    let params = {
      type_id:"5",
    };
    axiosConfig
      .get("/api/workflow/detail", { params })
      .then((res) => {
        console.log(res.steps)
        setWorkflowProfile(res.steps)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  useEffect(() => {
    (async function fetchTransfer() {
      let id = props.match.params.id
      fetchFlowProfile();
      if( id && id !== dataProfile.user_id ){
        let {data } = await getProfile(id);
        setProfile(data)
        if(Object.keys(data).length != 0){
            let dataTransfersProfile = {}
            dataTransfersProfile = await transfersProfile(data.id);
            setStep_id(dataTransfersProfile.data.next_step_id)
        }
      } else {
        setProfile(dataProfile)
      }
    })
    ();
  }, [dataProfile.id]);
  const handleReject = () =>{
    setModalNotify(true);
  }
  const handleConfirm = async () => {
    let idUser = props.match.params.id;
    let params = {
      user_id: idUser,
      reject: 0,
      action: "confirm",
      notify_content: "xac nhan ho so hoan tat",
    };
    let resUpdateProfile = await updateProfile(profile.id, params);
    if (resUpdateProfile.message) {
      message.success("Duyệt thông tin nhân sự thành công");
      setTimeout(()=>{
        window.location.reload();
      },300)
    } else {
      message.error("Duyệt hồ sơ thất bại");
    }
  };
  const handleReloadComponent = async () =>{
    let dataWorkflowProfile = await workflowProfile();
    setWorkflowProfile(dataWorkflowProfile);
    if(props.match.params.id){
      // if(Object.keys(dataProfile).length != 0){
          let dataTransfersProfile = {}
          let {data } = getProfile(props.match.params.id);    
          dataTransfersProfile = await transfersProfile(data.id);
          setProfile(data)
          setStep_id(dataTransfersProfile.data.next_step_id)
      // }
    }
  }
  let value = 0;
  if (step_id === 1) {
      value = 0;
  } else if (step_id === 2) {
      value = 1;
  } else if (step_id === 3) {
      value = 2;
  } else if (step_id === null) {
      value = 3;
  }
  const [, forceUpdate] = React.useState(0);
  return (
    <div className="content-background2" style={{ width: "100%" }}>
      <Steps current={value} size="small" className="process-work-flow">
            {renderWorkflow()}
            <Step title="Hồ sơ sẵn sàng" />
        </Steps>
        {value == 2 ? (
            <li className="tabs-main-left-li btn-confirm-reject ">
                <span
                    onClick={handleReject}
                    className="btn-confirm btn-add-user"
                    style={{ marginBottom: "10px", width: "140px" }}
                >
                    Không duyệt
                </span>
                <span
                    onClick={handleConfirm}
                    className="btn-no-confirm btn-add-user"
                    style={{ marginBottom: "10px", width: "140px" }}
                >
                    Duyệt
                </span>
            </li>
        ) : (
            ""
        )}
      <div style={{ minHeight: "70vh" }} className="edit-infor">
        <div className="edit-infor-tabs">
          <ul>
            <li onClick={() => setActiveLink(1)}>
              <div className={activeLink === 1 ? "active" : ""}>1</div>
              <span className={activeLink === 1 ? "active" : ""}>
                Sơ yếu lý lịch
              </span>
            </li>
            <li onClick={() => setActiveLink(2)}>
              <div className={activeLink === 2 ? "active" : ""}>2</div>
              <span className={activeLink === 2 ? "active" : ""}>
                Lịch sử bản thân
              </span>
            </li>
            <li onClick={() => {
              setActiveLink(3)
              window.scrollTo(0, 0)
            }}>
              <div className={activeLink === 3 ? "active" : ""}>3</div>
              <span className={activeLink === 3 ? "active" : ""}>
                Gia nhập Đảng Cộng Sản Việt Nam
              </span>
            </li>
            <li onClick={() => {
              setActiveLink(4)
              window.scrollTo(0, 0)
            }}>
              <div className={activeLink === 4 ? "active" : ""}>4</div>
              <span className={activeLink === 4 ? "active" : ""}>
                Tham gia các tổ chức chính trị, xã hội, các nghề nghiệp
              </span>
            </li>
            <li onClick={() => {
              setActiveLink(5)
              window.scrollTo(0, 0)
            }}>
              <div className={activeLink === 5 ? "active" : ""}>5</div>
              <span className={activeLink === 5 ? "active" : ""}>
                Đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ, lý luận chính trị
                ngoại ngữ
              </span>
            </li>
            <li onClick={() => {
              setActiveLink(6)
              window.scrollTo(0, 0)
            }}>
              <div className={activeLink === 6 ? "active" : ""}>6</div>
              <span className={activeLink === 6 ? "active" : ""}>
                Khen thưởng, kỷ luật
              </span>
            </li>
            <li onClick={() => {setActiveLink(7)
            window.scrollTo(0, 0)
            }}>
              <div className={activeLink === 7 ? "active" : ""}>7</div>
              <span className={activeLink === 7 ? "active" : ""}>
                Hoàn cảnh kinh tế, quan hệ gia đình
              </span>
            </li>
            <li onClick={() => {
              setActiveLink(8)
              window.scrollTo(0, 0)
            }}>
              <div className={activeLink === 8 ? "active" : ""}>8</div>
              <span className={activeLink === 8 ? "active" : ""}>
                Quan hệ gia đình, thân tộc
              </span>
            </li>
            <li onClick={() => {
              setActiveLink(9)
              window.scrollTo(0, 0)
            }}>
              <div className={activeLink === 9 ? "active" : ""}>9</div>
              <span className={activeLink === 9 ? "active" : ""}>
                Quan hệ xã hội
              </span>
            </li>
          </ul>
          <div className="edit-infr-vertical-line"></div>
        </div>
        {renderMenuLeft()}
      </div>
      <Notify
            actionModal={modalNotify}
            pro_id={profile.id}
            closeDeny={()=>{setModalNotify(false)}}
            handleReloadComponent={()=>handleReloadComponent}
        />
    </div>
  );
};
export default AddAndUpdateInforUser;
