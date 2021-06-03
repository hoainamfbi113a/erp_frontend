import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addJoinDCS,
  getJoinDCS,
  removeJoinDCS,
  updateJoinDCS,
} from "../../../../reduxToolkit/features/userProfile/joinDCSSlice";
import moment from "moment";
import JoinDCS from "../JoinDCS";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
import { formatDateNumber } from "../../../../helpers/FuncHelper";
const JoinDCSContainer = (props) => {
  const [id, setId] = useState("");
  const dataJoinDCS = useSelector((state) => state.joinDCSUser);
  // console.log(dataJoinDCS.par_admission_date)
  let [joinDCS, setJoinDCS] = useState({
    par_admission_date:dataJoinDCS.par_admission_date,
    par_branch:dataJoinDCS.par_branch,
    par_committee:"",
    par_first_full_name:"",
    par_first_position:"",
    par_first_workplace:"",
    par_first_residence:"",
    par_second_full_name:"",
    par_second_position:"",
    par_second_workplace:"",
    par_second_residence:"",
    par_announcement_date:"",
    par_announcement_branch:"",
    par_announcement_committee:"",
    par_member_id:"",
    par_issue_date:"",
    par_issue_committee:"",
  });
  // const dataJoinDCS = useSelector((state) => state.joinDCSUser);
  // console.log(dataJoinDCS)
  // const [joinDCS, setJoinDCS] = useState(dataJoinDCS);
  // console.log(joinDCS)
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(
      getJoinDCS({
        id_user: props.idUser,
        type: 1,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    setJoinDCS(dataJoinDCS)
  }, [dataJoinDCS.par_admission_date]);
  const showModal = (value) => {
    if (value == 1) {
      setDataItem({ category: 1 });
    } else {
      setDataItem({ category: 2 });
    }
    setVisible(true);
  };

  const hideModal = () => {
    setJoinDCS({
      par_admission_date: "",
      par_branch: "",
      par_committee: "",
      par_first_full_name: "",
      par_first_position: "",
      par_first_workplace: "",
      par_first_residence: "",
      par_second_full_name: "",
      par_second_position: "",
      par_second_workplace: "",
      par_second_residence: "",
      par_announcement_date: "",
      par_announcement_branch: "",
      par_announcement_committee: "",
      par_member_id: "",
      par_issue_date: "",
      par_issue_committee: "",
    });
    setId("");
    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    let joinDCSItem = {};
    joinDCSItem = dataJoinDCS.find((item) => item.id == value.id);

    let {
      id,
      par_admission_date,
      par_branch,
      par_committee,
      par_first_full_name,
      par_first_position,
      par_first_workplace,
      par_first_residence,
      par_second_full_name,
      par_second_position,
      par_second_workplace,
      par_second_residence,
      par_announcement_date,
      par_announcement_branch,
      par_announcement_committee,
      par_member_id,
      par_issue_date,
      par_issue_committee,
    } = joinDCSItem;
    let date1 = formatDateNumber(par_admission_date, dateFormatList[0]);
    let date2 = formatDateNumber(par_announcement_date, dateFormatList[0]);
    let date3 = formatDateNumber(par_issue_date, dateFormatList[0]);
    setId(id);
    setReward({
      ...reward,
      par_admission_date: date1,
      par_branch,
      par_committee,
      par_first_full_name,
      par_first_position,
      par_first_workplace,
      par_first_residence,
      par_second_full_name,
      par_second_position,
      par_second_workplace,
      par_second_residence,
      par_announcement_date: date2,
      par_announcement_branch,
      par_announcement_committee,
      par_member_id,
      par_issue_date: date3,
      par_issue_committee,
    });
  };
  const onChangeRange = (e, dateString, name1, name2) => {
    setReward({
      ...reward,
      rew_time_from: dateString[0],
      rew_time_to: dateString[1],
    });
  };
  const handleChange = (value) => {
    setReward({ ...reward, type: value });
    setRefresh(!refresh);
  };
  // const onChange = (e) => {
  //   setReward({ ...reward, rew_formality: e.target.value });
  // };

  const handleOk = () => {
    let {
      par_admission_date,
      par_branch,
      par_committee,
      par_first_full_name,
      par_first_position,
      par_first_workplace,
      par_first_residence,
      par_second_full_name,
      par_second_position,
      par_second_workplace,
      par_second_residence,
      par_announcement_date,
      par_announcement_branch,
      par_announcement_committee,
      par_member_id,
      par_issue_date,
      par_issue_committee,
    } = joinDCS;
    let date1 = moment(par_admission_date, "DD-MM-YYYY");
    let date2 = moment(par_announcement_date, "DD-MM-YYYY");
    let date3 = moment(par_issue_date, "DD-MM-YYYY");
    const parsePar_admission_date = Date.parse(date1) / 1000;
    const parsePar_announcement_date = Date.parse(date2) / 1000;
    const parsePar_issue_date = Date.parse(date3) / 1000;
    const params = {
      pro_id: props.dataProfile.id,
      user_id: props.idUser,
      par_admission_date: par_admission_date,
      par_branch,
      par_committee,
      par_first_full_name,
      par_first_position,
      par_first_workplace,
      par_first_residence,
      par_second_full_name,
      par_second_position,
      par_second_workplace,
      par_second_residence,
      par_announcement_date: par_announcement_date,
      par_announcement_branch,
      par_announcement_committee,
      par_member_id,
      par_issue_date: par_issue_date,
      par_issue_committee,
      id,
    };
    // console.log(params)
    if (id == "") {
      dispatch(addJoinDCS(params));
      setTimeout(() => {
        dispatch(
          getJoinDCS({
            id_user: props.idUser,
            type: 1,
          })
        );
      }, 900);
    } else {
      dispatch(updateJoinDCS(params));
      setId("");
    }
  };
  const onChangeBirthDay = (e, dateString, name) => {
    let date3 = moment(dateString, "DD-MM-YYYY");
    const parsePar_admission_date = Date.parse(date3) / 1000;
    setJoinDCS({ ...joinDCS, [name]: parsePar_admission_date });
  };
  const onChange = (e) => {
    setJoinDCS({ ...joinDCS, [e.target.name]: e.target.value });
   
  };
  return (
    <div>
      <JoinDCS
        dataJoinDCS={joinDCS}
        visible={visible}
        showModal={showModal}
        hideModal={hideModal}
        handleOk={handleOk}
        handleUpdate={handleUpdate}
        onChange={onChange}
        onChangeBirthDay={onChangeBirthDay}
      />
    </div>
  );
};

export default JoinDCSContainer;
