import {
  getFamily,
  addFamily,
  removeFamily,
  updateFamily,
} from "../../../../reduxToolkit/features/userProfile/familySlice";
import {
  getKinship,
  addKinship,
  removeKinship,
  updateKinship,
} from "../../../../reduxToolkit/features/userProfile/kinshipSlice";
import {
  getSocial,
  addSocial,
  removeSocial,
  updateSocial,
} from "../../../../reduxToolkit/features/userProfile/socialSlice";
import {
  addHistory,
  getHistory,
  removeHistory,
  updateHistory,
} from "../../../../reduxToolkit/features/userProfile/historySlice";
import { message, Steps } from "antd";
import axiosConfig from "apis/axios";
import { getProfile, updateProfile } from "apis/profileApi";
import { transfersProfile } from "apis/transfersApi";
import { workflowProfile } from "apis/workflowApi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Index from "../index";
import BonusContainer from "./BonusContainer";
import FamilyContainer from "./FamilyContainer";
import TrainingContainer from "./TrainingContainer";
import CurriculumVitae from "../CurriculumVitae";
import JoinDCS from "./JoinDCSContainer";
import OrganizeContainer from "./OrganizeContainer";
import PersonalHistoryContainer from "./PersonalHistoryContainer";
const { Step } = Steps;

const InfoUserContainer = (props) => {
  const [activeLink, setActiveLink] = useState(1);
  const [modalNotify, setModalNotify] = useState(false);
  const [step_id, setStep_id] = useState(0);
  const [workflow, setWorkflowProfile] = useState(null);
  const [profile, setProfile] = useState({});
  const [pro_id, setProId] = useState(null);
  const dataProfile = useSelector((state) => state.userProfile);
  const dataFamily = useSelector((state) => state.familyUser);
  const dataKinship = useSelector((state) => state.kinshipUser);
  const dataSocial = useSelector((state) => state.socialUser);
  const dataHistory = useSelector((state) => state.historyUser);
  const userId = props.match.params.id;
  useEffect(() => {
    (async function fetchTransfer() {
      fetchFlowProfile();
      if (userId && userId !== dataProfile.user_id) {
        let { data } = await getProfile(userId);
        if (data) {
          setProfile(data);
          setProId(data.id);
        }
        if (Object.keys(data).length != 0) {
          let dataTransfersProfile = {};
          dataTransfersProfile = await transfersProfile(data.id);
          setStep_id(dataTransfersProfile.data.next_step_id);
        }
      } else if (window.location.href.includes("create") === false) {
        setProfile(dataProfile);
        setProId(dataProfile.id);
        let dataTransfersProfile = {};
        dataTransfersProfile = await transfersProfile(dataProfile.id);
        setStep_id(dataTransfersProfile.data.next_step_id);
      }
    })();
  }, []);

  const renderMenuLeft = () => {
    switch (activeLink) {
      case 1:
        return (
          <CurriculumVitae
            activeLink = {activeLink}
            idUser={userId}
            value={value}
            handleReloadComponent={handleReloadComponent}
            dataProfile={profile}
          />
        );
      case 2:
        return (
          <PersonalHistoryContainer
            idUser={userId}
            proId={pro_id}
            getData={getHistory({ id: userId })}
            addData={addHistory}
            updateData={updateHistory}
            removeData={removeHistory}
            data={dataHistory}
          />
        );
      case 3:
        return <JoinDCS idUser={userId} dataProfile={profile} />;
      case 4:
        return <OrganizeContainer idUser={userId} dataProfile={profile} />;
      case 5:
        return <TrainingContainer idUser={userId} dataProfile={profile} />;
      case 6:
        return <BonusContainer idUser={userId} dataProfile={profile} />;
      case 7:
        return (
          <FamilyContainer
            idUser={userId}
            proId={pro_id}
            type="family"
            namination="Gia đình"
            getData={getFamily({ id: userId, type: "family" })}
            addData={addFamily}
            updateData={updateFamily}
            removeData={removeFamily}
            data={dataFamily}
          />
        );
      case 8:
        return (
          <FamilyContainer
            idUser={userId}
            proId={pro_id}
            type="kinship"
            namination="Quan hệ thân tộc"
            getData={getKinship({ id: userId, type: "kinship" })}
            addData={addKinship}
            updateData={updateKinship}
            removeData={removeKinship}
            data={dataKinship}
          />
        );
      case 9:
        return (
          <FamilyContainer
            idUser={userId}
            proId={pro_id}
            type="social"
            namination="Quan hệ xã hội"
            getData={getSocial({ id: userId, type: "social" })}
            addData={addSocial}
            updateData={updateSocial}
            removeData={removeSocial}
            data={dataSocial}
          />
        );
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

  const handleReject = () => {
    setModalNotify(true);
  };

  const handleConfirm = async () => {
    let params = {
      user_id: userId,
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
    if (userId) {
      // if(Object.keys(dataProfile).length != 0){
      let dataTransfersProfile = {};
      let { data } = getProfile(userId);
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

  return (
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
  );
};
export default InfoUserContainer;
