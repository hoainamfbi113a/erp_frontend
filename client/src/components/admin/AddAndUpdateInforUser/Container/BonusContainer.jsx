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
    rew_time_from: null,
    rew_time_to: null,
    rew_note: null,
  });
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
  const dataReward = useSelector((state) => state.rewardUser);
  useEffect(() => {
    dispatch(getReward());
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
      rew_time_from: null,
      rew_time_to: null,
      rew_note: null,
    });
    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    let reward = dataReward.filter((item) => {
      return item.id == value.id;
    });
    setId(reward[0].id);
    setReward({
      type: 1,
      rew_formality,
      rew_time_from,
      rew_time_to,
      rew_note,
    });
  };
  const onChangeRange = (e, dateString, name1, name2) => {
    console.log(dateString);
    reward.rew_time_from = dateString[0];
    reward.rew_time_to = dateString[1];
    // dataItem.rew_time_from = moment((dateString[0], dateFormatList[0]),"DD-MM-YYYY")
    // dataItem.rew_time_to = moment((dateString[1], dateFormatList[0]),"DD-MM-YYYY")
    // setRew_time_from(convertFormatDate(dateString[0]));
    // setRew_time_to(convertFormatDate(dateString[1]));
    setRefresh(!refresh);
  };
  const handleChange = (value) => {
    setReward({ ...reward, type: value });
    console.log(reward);
    setRefresh(!refresh);
  };
  const onChange = (e) => {
    setRew_formality(e.target.value);
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
    console.log(rew_time_from);
    const parseRew_time_from = Date.parse(rew_time_from) / 1000;
    const parseRew_time_to = Date.parse(rew_time_to) / 1000;
    const params = {
      pro_id: "196",
      user_id: "3",
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
        dispatch(getReward());
      }, 200);
    } else {
      console.log(params);
      dispatch(updateReward(params));
      setId("");
    }

    setVisible(false);
  };
  const handleOkDelete = (id) => {
    console.log(id);
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
