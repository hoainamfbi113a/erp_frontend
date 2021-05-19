import { message, Steps } from "antd";
import axiosConfig from "apis/axios";
import { getProfile, updateProfile } from "apis/profileApi";
import { transfersProfile } from "apis/transfersApi";
import { workflowProfile } from "apis/workflowApi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Index from "../index";
import BonusContainer from "../BonusContainer";
import FamilyContainer from "./FamilyContainer";
import CurriculumVitae from "../CurriculumVitae";
import JoinDCS from "../JoinDCS";
import JoinTCTTXH from "../JoinTCTTXH";
import Kinship from "../Kinship";
import PersonalHistory from "../PersonalHistory";
import ProfessionalCompensation from "../ProfessionalCompensation";
import Social from "../Social";
const { Step } = Steps;

const InfoUserContainer = (props) => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState(1);
  const [modalNotify, setModalNotify] = useState(false);
  const [step_id, setStep_id] = useState(0);
  const [workflow, setWorkflowProfile] = useState(null);
  const [profile, setProfile] = useState({});
  const dataProfile = useSelector((state) => state.userProfile);
  

  const renderMenuLeft = () => {
    switch (activeLink) {
      case 1:
        return (
          <CurriculumVitae
            idUser={props.match.params.id}
            value={value}
            handleReloadComponent={handleReloadComponent}
            dataProfile={profile}
          />
        );
      case 2:
        return <PersonalHistory />;
      case 3:
        return <JoinDCS />;
      case 4:
        return <JoinTCTTXH />;
      case 5:
        return <ProfessionalCompensation />;
      case 6:
        return (
          <BonusContainer
            idUser={props.match.params.id}
            dataProfile={profile}
          />
        );
      case 7:
        return (
          <FamilyContainer
            idUser={props.match.params.id}
            dataProfile={profile}
          />
        );
      case 8:
        return <Kinship />;
      case 9:
        return <Social />;
    }
  };

  const renderWorkflow = () => {
    if (workflow) {
      return workflow.map((item) => {
        return <Step key={item.id} title={item.name} />;
      });
    } else {
    }
  };

  const fetchFlowProfile = () => {
    let params = {
      type_id: "5",
    };
    axiosConfig
      .get("/api/workflow/detail", { params })
      .then((res) => {
        console.log(res.steps);
        setWorkflowProfile(res.steps);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    (async function fetchTransfer() {
      let id = props.match.params.id;
      fetchFlowProfile();
      if (id && id !== dataProfile.user_id) {
        let { data } = await getProfile(id);
        setProfile(data);
        if (Object.keys(data).length != 0) {
          let dataTransfersProfile = {};
          dataTransfersProfile = await transfersProfile(data.id);
          setStep_id(dataTransfersProfile.data.next_step_id);
        }
      } else {
        setProfile(dataProfile);
      }
    })();
  }, [dataProfile.id]);

  const handleReject = () => {
    setModalNotify(true);
  };

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
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else {
      message.error("Duyệt hồ sơ thất bại");
    }
  };

  const handleReloadComponent = async () => {
    let dataWorkflowProfile = await workflowProfile();
    setWorkflowProfile(dataWorkflowProfile);
    if (props.match.params.id) {
      // if(Object.keys(dataProfile).length != 0){
      let dataTransfersProfile = {};
      let { data } = getProfile(props.match.params.id);
      dataTransfersProfile = await transfersProfile(data.id);
      setProfile(data);
      setStep_id(dataTransfersProfile.data.next_step_id);
      // }
    }
  };
  
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

  return(
    <div>
      <Index
        value={value}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        modalNotify={modalNotify}
        profile={profile}
        renderMenuLeft={renderMenuLeft}
        renderWorkflow={renderWorkflow}
        handleReject={handleReject}
        handleConfirm={handleConfirm}
        handleReloadComponent={handleReloadComponent}
      />
    </div>
  )
};
export default InfoUserContainer;
