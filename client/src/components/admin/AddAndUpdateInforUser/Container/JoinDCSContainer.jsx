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
import { formatDateNumber, validateOnlyNumber } from "../../../../helpers/FuncHelper";
const JoinDCSContainer = (props) => {
  const [id, setId] = useState("");
  const [idSelection, setIdselection] = useState("Gia nhập Đoàn");
  const dataJoinDCS = useSelector((state) => state.joinDCSUser);
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
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
  const handleChange = () =>{

  }
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
    const validatePar = validateOnlyNumber(par_member_id)
    if(validatePar === "") {
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
    } else {
      alert("Số đảng viên phải là số")
    }
   
  };
  const onChangeBirthDay = (e, dateString, name) => {
    let date = moment(dateString, "DD-MM-YYYY");
    const parsePar_admission_date = Date.parse(date) / 1000;
    setJoinDCS({ ...joinDCS, [name]: parsePar_admission_date });
  };
  const onChange = (e) => {
    setJoinDCS({ ...joinDCS, [e.target.name]: e.target.value });
   
  };
  const handleChangeSelection = (value) =>{
    setIdselection(value)
  }
  return (
    <div>
      <JoinDCS
        idSelection = {idSelection}
        dataJoinDCS={joinDCS}
        visible={visible}
        showModal={showModal}
        hideModal={hideModal}
        handleOk={handleOk}
        onChange={onChange}
        onChangeBirthDay={onChangeBirthDay}
        handleChangeSelection = {handleChangeSelection}
      />
    </div>
  );
};

export default JoinDCSContainer;
