import { DatePicker, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReward,
  getReward,
  removeReward,
  updateReward,
} from "../../../../reduxToolkit/features/userProfile/rewardSlice";
import Bonus from "../Bonus";
import moment from "moment";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
import { formatDateNumber } from "../../../../helpers/FuncHelper";
let fakeData2 = [
  {
    id: 1,
    category: 2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Kỷ luật 1",
  },
  {
    id: 2,
    category: 2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Kỷ luật 2",
  },
  {
    id: 3,
    category: 2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Kỷ luật 3",
  },
];
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
  useEffect(() => {
    dispatch(getReward({
      id_user: props.idUser,
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
    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    let rewardItem = dataReward.find((item) => 
       item.id == value.id
    );
    let { id, rew_formality, rew_time_from, rew_time_to, rew_note} = rewardItem;
    let date1 = formatDateNumber(rew_time_from, dateFormatList[0])
    let date2 = formatDateNumber(rew_time_to, dateFormatList[0])
    setId(id);
    setReward({ ...reward,
       rew_formality,
       rew_time_from:date1,
       rew_time_to:date2,
       rew_note
    });
  };
  const onChangeRange = (e, dateString, name1, name2) => {
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
      if (item.type === 1) {
        datareward.push(item);
      }
    }
  }
  const handleOk = () => {
    let {type, rew_formality, rew_time_from, rew_time_to, rew_note} = reward;
    let date1 = (moment(rew_time_from, "DD-MM-YYYY"))
    let date2 = (moment(rew_time_to, "DD-MM-YYYY"))
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
    if (id === "") {
      dispatch(addReward(params));
      setTimeout(() => {
        dispatch(getReward({
          id_user: props.idUser,
        }));
      }, 200);
    } else {
      dispatch(updateReward(params));
      setId("");
    }

    setVisible(false);
  };
  const handleOkDelete = (id) => {
    dispatch(
      removeReward({
        id,
      })
    );
  };
  return (
    <div>
      <Bonus
        fakeData1={datareward}
        fakeData2={fakeData2}
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
