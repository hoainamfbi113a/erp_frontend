import { Steps } from "antd";
import axiosConfig from "apis/axios";
import { transfersProfile } from "apis/transfersApi";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addFamily,
  getFamily,
  removeFamily,
  updateFamily,
} from "../../reduxToolkit/features/userProfile/familySlice";
import {
  addHistory,
  getHistory,
  removeHistory,
  updateHistory,
} from "../../reduxToolkit/features/userProfile/historySlice";
import {
  addHistory2,
  getHistory2,
  removeHistory2,
  updateHistory2,
} from "../../reduxToolkit/features/userProfile/historySlice2";
import {
  addKinship,
  getKinship,
  removeKinship,
  updateKinship,
} from "../../reduxToolkit/features/userProfile/kinshipSlice";
import {
  addSocial,
  getSocial,
  removeSocial,
  updateSocial,
} from "../../reduxToolkit/features/userProfile/socialSlice";
import {
  getAbroad,
  addAbroad,
  removeAbroad,
  updateAbroad,
} from "../../reduxToolkit/features/userProfile/abroadSlice";
import BonusContainer from "../admin/AddAndUpdateInforUser/Container/BonusContainer";
import Family2 from "../admin/AddAndUpdateInforUser/Container/Family2";
import JoinDCS from "../admin/AddAndUpdateInforUser/Container/JoinDCSContainer";
import OrganizeContainer from "../admin/AddAndUpdateInforUser/Container/OrganizeContainer";
import Personal2 from "../admin/AddAndUpdateInforUser/Container/Personal2";
import TrainingContainer from "../admin/AddAndUpdateInforUser/Container/TrainingContainer";
import GoAbroadContainer from "../admin/AddAndUpdateInforUser/Container/GoAbroadContainer";
import CurriculumVitae from "./edit-infor-child/CurriculumVitae";
import "./EditInformationUser.css";
const { Step } = Steps;
const EditInformationUser = ({}) => {
  const [activeLink, setActiveLink] = useState(1);
  const [STATUS_PROFILE, setStatusProfile] = useState(1);
  const [dataWorkflow, setDataWorkflow] = useState(null);
  const [step_id, setStepId] = useState(null);
  const dataProfile = useSelector((state) => state.userProfile);
  const dataFamily = useSelector((state) => state.familyUser);
  const dataKinship = useSelector((state) => state.kinshipUser);
  const dataSocial = useSelector((state) => state.socialUser);
  const dataHistory = useSelector((state) => state.historyUser);
  const dataHistory2 = useSelector((state) => state.history2User);
  const dataAbroad = useSelector((state) => state.abroadUser);

  useEffect(() => {
    fetchProfile();
    fetchWorkflowProfile();
  }, []);

  // const handleClick = (id) => {
  //   setActiveLink(id);
  // };

  const renderComponents = () => {
    if (activeLink === 1) {
      return (
        <CurriculumVitae
          statusProfile={step_id}
          handleReloadComponent={fetchProfile}
        />
      );
    }
    if (activeLink === 2) {
      return (
        <Personal2
          idUser={dataProfile.user_id}
          proId={dataProfile.id}
          type={[0, 1]}
          namination={["H???c t???p", "L??m vi???c"]}
          getData={[
            getHistory({ id: dataProfile.user_id, type: 0 }),
            getHistory2({ id: dataProfile.user_id, type: 1 }),
          ]}
          addData={[addHistory, addHistory2]}
          updateData={[updateHistory, updateHistory2]}
          removeData={[removeHistory, removeHistory2]}
          data={[dataHistory, dataHistory2]}
        />
      );
    }
    if (activeLink === 3) {
      return <JoinDCS idUser={dataProfile.user_id} dataProfile={dataProfile} />;
      // return <JoinDCS />;
    }
    if (activeLink === 4) {
      return (
        <OrganizeContainer
          idUser={dataProfile.user_id}
          dataProfile={dataProfile}
        />
      );
    }
    if (activeLink === 5) {
      return (
        <TrainingContainer
          idUser={dataProfile.user_id}
          dataProfile={dataProfile}
        />
      );
    }
    if (activeLink === 6) {
      return (
        <BonusContainer
          idUser={dataProfile.user_id}
          dataProfile={dataProfile}
        />
      );
    }
    if (activeLink === 7) {
      return (
        
        <Family2
          idUser={dataProfile.user_id}
          proId={dataProfile.id}
          type={["family", "kinship", "social"]}
          namination={["Gia ????nh", "Quan h??? th??n t???c", "Quan h??? x?? h???i"]}
          getData={[
            getFamily({ id: dataProfile.user_id, type: "family" }),
            getKinship({ id: dataProfile.user_id, type: "kinship" }),
            getSocial({ id: dataProfile.user_id, type: "social" }),
          ]}
          addData={[addFamily, addKinship, addSocial]}
          updateData={[updateFamily, updateKinship, updateSocial]}
          removeData={[removeFamily, removeKinship, removeSocial]}
          data={[dataFamily, dataKinship, dataSocial]}
        />
      );
    }
    if (activeLink === 8) {
      return <div></div>;
    }
    if (activeLink === 9) {
      return (
        <GoAbroadContainer
            idUser={dataProfile.user_id}
            proId={dataProfile.id}
            getData={getAbroad({ id: dataProfile.user_id })}
            addData={addAbroad}
            updateData={updateAbroad}
            removeData={removeAbroad}
            data={dataAbroad}
          />
      );
    }
  };
  const fetchProfile = async () => {
    let dataTransfersProfile = await transfersProfile(dataProfile.id);
    setStatusProfile(dataTransfersProfile.data.after_status);
    setStepId(dataTransfersProfile.data.next_step_id);
  };

  const fetchWorkflowProfile = async () => {
    let params = {
      type_id: "5",
    };
    axiosConfig
      .get("/api/workflow/detail", { params })
      .then((res) => {
        this.setState({
          dataWorkflow: res.steps,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderWorkflow = () => {
    if (dataWorkflow) {
      return dataWorkflow.map((item) => {
        return <Step key={item.id} title={item.name} />;
      });
    }
  };
  // handleReloadComponent = () => {
  //   this.fetProfile();
  //   // this.fetchWorkflowProfile();
  // };
  let value = 0;
  if (step_id === 1) {
    value = 0;
  } else if (step_id === 2) {
    value = 1;
  } else if (step_id === 3) {
    value = 2;
  } else {
    value = 3;
  }
  return (
    <div className="content-background2">
      <Steps current={value} size="small" className="process-work-flow">
        {renderWorkflow()}
        <Step title="H??? s?? s???n s??ng" />
      </Steps>
      <div style={{ minHeight: "70vh" }} className="edit-infor" disabled>
        <div className="edit-infor-tabs">
          <ul>
            <li onClick={() => setActiveLink(1)}>
              <div className={activeLink === 1 ? "active" : ""}>1</div>
              <span className={activeLink === 1 ? "active" : ""}>
                S?? y???u l?? l???ch
              </span>
            </li>
            <li onClick={() => setActiveLink(2)}>
              <div className={activeLink === 2 ? "active" : ""}>2</div>
              <span className={activeLink === 2 ? "active" : ""}>
                L???ch s??? b???n th??n
              </span>
            </li>

            <li onClick={() => setActiveLink(3)}>
              <div className={activeLink === 3 ? "active" : ""}>3</div>
              <span className={activeLink === 3 ? "active" : ""}>
                ??o??n - ?????ng
              </span>
            </li>
            <li onClick={() => setActiveLink(4)}>
              <div className={activeLink === 4 ? "active" : ""}>4</div>
              <span className={activeLink === 4 ? "active" : ""}>
                Tham gia c??c t??? ch???c ch??nh tr???, x?? h???i, c??c c?? h???i ngh??? nghi???p
              </span>
            </li>

            <li onClick={() => setActiveLink(5)}>
              <div className={activeLink === 5 ? "active" : ""}>5</div>
              <span className={activeLink === 5 ? "active" : ""}>
                ????o t???o, b???i d?????ng v??? chuy??n m??n, nghi???p v???, l?? lu???n ch??nh tr???
                ngo???i ng???
              </span>
            </li>
            <li onClick={() => setActiveLink(6)}>
              <div className={activeLink === 6 ? "active" : ""}>6</div>
              <span className={activeLink === 6 ? "active" : ""}>
                Khen th?????ng, k??? lu???t
              </span>
            </li>
            <li onClick={() => setActiveLink(7)}>
              <div className={activeLink === 7 ? "active" : ""}>7</div>
              <span className={activeLink === 7 ? "active" : ""}>
              Quan h??? gia ????nh th??n t???c
              </span>
            </li>
            <li onClick={() => setActiveLink(8)}>
              <div className={activeLink === 8 ? "active" : ""}>8</div>
              <span className={activeLink === 8 ? "active" : ""}>
                T??i s???n
              </span>
            </li>
            <li onClick={() => setActiveLink(9)}>
              <div className={activeLink === 9 ? "active" : ""}>9</div>
              <span className={activeLink === 9 ? "active" : ""}>
                ??i n?????c ngo??i
              </span>
            </li>
          </ul>
          <div className="edit-infr-vertical-line"></div>
        </div>
        {renderComponents()}
      </div>
    </div>
  );
};

export default EditInformationUser;
