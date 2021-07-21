import {
  getFamily,
  addFamily,
  removeFamily,
  updateFamily,
  eraseFamily,
} from "../../../../reduxToolkit/features/userProfile/familySlice";
import {
  getKinship,
  addKinship,
  removeKinship,
  updateKinship,
  eraseKinship,
} from "../../../../reduxToolkit/features/userProfile/kinshipSlice";
import {
  getSocial,
  addSocial,
  removeSocial,
  updateSocial,
  eraseSocial,
} from "../../../../reduxToolkit/features/userProfile/socialSlice";
import {
  addHistory,
  getHistory,
  removeHistory,
  updateHistory,
  eraseHistory,
} from "../../../../reduxToolkit/features/userProfile/historySlice";
import {
  addHistory2,
  getHistory2,
  removeHistory2,
  updateHistory2,
  eraseHistory2,
} from "../../../../reduxToolkit/features/userProfile/historySlice2";
import {
  getAbroad,
  addAbroad,
  removeAbroad,
  updateAbroad,
  eraseAbroad,
} from "../../../../reduxToolkit/features/userProfile/abroadSlice";
import { eraseTraining } from "reduxToolkit/features/userProfile/trainingSlice";
import { eraseTraining2 } from "reduxToolkit/features/userProfile/training2Slice";
import { eraseOrganize } from "reduxToolkit/features/userProfile/organizeSlice";
import { eraseOrganize2 } from "reduxToolkit/features/userProfile/organize2Slice";
import { message, Steps } from "antd";
import axiosConfig from "apis/axios";
import { getProfile, updateProfile } from "apis/profileApi";
import { transfersProfile } from "apis/transfersApi";
import { workflowProfile } from "apis/workflowApi";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Index from "../index";
import BonusContainer from "./BonusContainer";
import Personal2 from "./Personal2";
import Family2 from "./Family2";
import TrainingContainer from "./TrainingContainer";
import CurriculumVitae from "../CurriculumVitae";
import JoinDCS from "./JoinDCSContainer";
import OrganizeContainer from "./OrganizeContainer";
import GoAbroadContainer from "./GoAbroadContainer";

const { Step } = Steps;

const InfoUserContainer = (props) => {
  const dispatch = useDispatch();
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
  const dataHistory2 = useSelector((state) => state.history2User);
  const dataAbroad = useSelector((state) => state.abroadUser);
  const userId = props.match.params.id;

  useEffect(() => {
    return () => {
      dispatch(eraseHistory());
      dispatch(eraseHistory2());
      dispatch(eraseFamily());
      dispatch(eraseKinship());
      dispatch(eraseSocial());
      dispatch(eraseTraining());
      dispatch(eraseTraining2());
      dispatch(eraseOrganize());
      dispatch(eraseOrganize2());
      dispatch(eraseAbroad());
    };
  }, []);
  
  useEffect(() => {
    (async function fetchTransfer() {
      fetchFlowProfile();
      if (userId && userId !== dataProfile.user_id) {
        let { data } = await getProfile(userId);
        if (data) {
          setProfile(data);
          setProId(data.id);
          let dataTransfersProfile = {};
          dataTransfersProfile = await transfersProfile(data.id);
          setStep_id(dataTransfersProfile.data.next_step_id);
          // console.log(dataTransfersProfile.data.next_step_id);
        }
        if (Object.keys(data).length != 0) {
          let dataTransfersProfile = {};
          dataTransfersProfile = await transfersProfile(data.id);
          setStep_id(dataTransfersProfile.data.next_step_id);
        }
      } else if (window.location.href.includes("create") === false) {
        setProfile(dataProfile);
        setProId(dataProfile.id);
        // setStep_id(dataProfile.status);
        // console.log(dataProfile.status)
        let dataTransfersProfile = {};
        dataTransfersProfile = await transfersProfile(dataProfile.id);
        setStep_id(dataTransfersProfile.data.next_step_id);
        console.log(dataTransfersProfile.data.next_step_id);
      }
    })();
  }, []);

  const renderMenuLeft = () => {
    switch (activeLink) {
      case 1:
        return (
          <CurriculumVitae
            activeLink={activeLink}
            idUser={userId}
            value={value}
            handleReloadComponent={handleReloadComponent}
            dataProfile={profile}
          />
        );
      case 2:
        return (
          <Personal2
            idUser={userId}
            proId={pro_id}
            type={[0, 1]}
            namination={["Học tập", "Làm việc"]}
            getData={[
              getHistory({ id: userId, type: 0 }),
              getHistory2({ id: userId, type: 1 }),
            ]}
            addData={[addHistory, addHistory2]}
            updateData={[updateHistory, updateHistory2]}
            removeData={[removeHistory, removeHistory2]}
            data={[dataHistory, dataHistory2]}
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
          <Family2
            idUser={userId}
            proId={pro_id}
            type={["family", "kinship", "social"]}
            namination={["Gia đình", "Quan hệ thân tộc", "Quan hệ xã hội"]}
            getData={[
              getFamily({ id: userId, type: "family" }),
              getKinship({ id: userId, type: "kinship" }),
              getSocial({ id: userId, type: "social" }),
            ]}
            addData={[addFamily, addKinship, addSocial]}
            updateData={[updateFamily, updateKinship, updateSocial]}
            removeData={[removeFamily, removeKinship, removeSocial]}
            data={[dataFamily, dataKinship, dataSocial]}
          />
        );
      case 9:
        return (
          <GoAbroadContainer
            idUser={userId}
            proId={pro_id}
            getData={getAbroad({ id: userId })}
            addData={addAbroad}
            updateData={updateAbroad}
            removeData={removeAbroad}
            data={dataAbroad}
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
        setModalNotify={setModalNotify}
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
