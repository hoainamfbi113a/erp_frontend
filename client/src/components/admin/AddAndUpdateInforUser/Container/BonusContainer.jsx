import { DatePicker, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReward,
  getReward,
  removeReward,
  updateReward,
} from "../../../../reduxToolkit/features/userProfile/rewardSlice";
import {
  addDiscipline,
  getDiscipline,
  removeDiscipline,
  updateDiscipline,
} from "../../../../reduxToolkit/features/userProfile/Disciplineslice";
import Bonus from "../Bonus";
import moment from "moment";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
import { formatDateNumber } from "../../../../helpers/FuncHelper";
const BonusContainer = (props) => {
  const [id, setId] = useState("");
  const [reward, setReward] = useState({
    type: 1,
    rew_formality: "",
    rew_time_from: "",
    rew_time_to: "",
    rew_note: null,
  });
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
  const dataReward = useSelector((state) => state.rewardUser);
  const dataDiscipline = useSelector((state) => state.disciplineUser);
  const state = useSelector((state)=> state);
  useEffect(() => {
      dispatch(getReward({
        id_user: props.idUser,
        type:1,
      }));
      dispatch(getDiscipline({
        id_user: props.idUser,
        type:2,
      }));
    
  }, [dispatch]);
  const showModal = (value) => {
    if (value == 1) {
      setDataItem({ category: 1 });
    } else {
      setDataItem({ category: 2 });
    }
    setVisible(true);
  };

  const hideModal = () => {
    setReward({
      type: 1,
      rew_formality: "",
      rew_time_from: "",
      rew_time_to: "",
      rew_note: null,
    });
    setId("")
    
    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    let rewardItem = {}
    if(value.type == 1) {
      rewardItem = dataReward.find((item) => 
      item.id == value.id
      );
    } else {
      rewardItem = dataDiscipline.find((item) => 
      item.id == value.id
      );
    }

    let { id, type, rew_formality, rew_time_from, rew_time_to, rew_note} = rewardItem;
    let date1 = formatDateNumber(rew_time_from, dateFormatList[0])
    let date2 = formatDateNumber(rew_time_to, dateFormatList[0])
    setId(id);
    setReward({ ...reward,
       rew_formality,
       rew_time_from:date1,
       rew_time_to:date2,
       rew_note,
       type
    });
  };
  const onChangeRange = (e, dateString, name1, name2) => {
    console.log(dateString[0])
    setReward({ ...reward, rew_time_from: dateString[0], rew_time_to: dateString[1] });
  };
  const handleChange = (value) => {
    setReward({ ...reward, type: value });
    setRefresh(!refresh);
  };
  const onChange = (e) => {
    setReward({ ...reward, rew_formality: e.target.value });
  };
  const datareward = [];
  if (dataReward && dataReward.length !== 0) {
    for (let item of dataReward) {
      if (item.type == 1) {
        datareward.push(item);
      }
    }
  }
  const handleOk = () => {
    let {type, rew_formality, rew_time_from, rew_time_to, rew_note} = reward;
    let date1 = (moment(rew_time_from, "DD-MM-YYYY"))
    let date2 = (moment(rew_time_to, "DD-MM-YYYY"))
    // let date2 = Date.parse(moment(rew_time_to, "DD-MM-YYYY"))/1000

    const parseRew_time_from = Date.parse(date1) / 1000;
    const parseRew_time_to = Date.parse(date2) / 1000;
    const params = {
      pro_id: props.dataProfile.id,
      user_id: props.idUser,
      rew_formality,
      type,
      rew_time_from: parseRew_time_from,
      rew_time_to: parseRew_time_to,
      rew_note,
      id,
    };
    if (id == "") {
      if(type == 1 ) {
        dispatch(addReward(params));
      } else {
        dispatch(addDiscipline(params));
      }

      setTimeout(() => {
        if(type == 1) {
          dispatch(getReward({
            id_user: props.idUser,
            type:1,
          }));
        } else {
          dispatch(getDiscipline({
            id_user: props.idUser,
            type:2,
          }));
        }
      }, 200);
    } else {
      if(type == 1) {
        dispatch(updateReward(params));
      } else {
        dispatch(updateDiscipline(params));
      }
      setId("");
    }

    setVisible(false);
  };
  const handleOkDelete = (item) => {
    const {type, id} =item;
    if(type == 1){
      dispatch(
        removeReward({
          id,
        })
      );
    } else {
      dispatch(
        removeDiscipline({
          id,
        })
      );
    }
  };
  return (
    <div>
      <Bonus
        dataReward={datareward}
        dataDiscipline={dataDiscipline}
        reward={reward}
        visible={visible}
        showModal={showModal}
        hideModal={hideModal}
        handleOk={handleOk}
        handleUpdate={handleUpdate}
        onChangeRange={onChangeRange}
        handleChange={handleChange}
        onChange={onChange}
        handleOkDelete={handleOkDelete}
      />
    </div>
  );
};

export default BonusContainer;
