import {
  DatePicker,
  Input,
  Select
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReward, getReward } from "../../../reduxToolkit/features/userProfile/rewardSlice";
import Bonus from "./Bonus";
const { RangePicker } = DatePicker;

const { Option } = Select;
const { TextArea } = Input;
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
  const [type, setType] = useState(1);
  const [rew_formality, setRew_formality] = useState("");
  const [rew_time_from, setRew_time_from] = useState(null);
  const [rew_time_to, setRew_time_to] = useState(null);
  const [rew_note, setRew_note] = useState(null);
  // const [rew, setRew] = useState({

  // });

  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
<<<<<<< HEAD
  const dataReward = useSelector((state) => state.rewardUser);
=======
  const dataReward = useSelector((state) => state.rewardDiscipline);
>>>>>>> b332883c383ab64280125d611d825fc3cc9ef35c
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
    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    setDataItem(value);
  };
  const onChangeRange = (e, dateString, name1, name2) => {
    dataItem.dateStart = dateString[0];
    dataItem.dateEnd = dateString[1];
    console.log(dateString);
    setRew_time_from(dateString[0]);
    setRew_time_to(dateString[1]);
    setRefresh(!refresh);
  };
  const handleChange = (value) => {
    dataItem.category = value;
    setType(value);

    
    setRefresh(!refresh);
  };
  const onChange = (e) => {
    // console.log('Change:', e.target.value);
    setRew_formality(e.target.value);
  };
  const datareward = [];
  if (dataReward.length !== 0) {
    for (let item of dataReward) {
      if (item.type === 1) {
        datareward.push(item);
      }
    }
  }
  const handleOk = () => {
    let parseRew_time_from = Date(rew_time_from)
    let parseRew_time_to = Date(rew_time_to)
    let params = {
      pro_id: "196",
      user_id: "3",
      rew_formality,
      type,
      rew_time_from:Date.parse(parseRew_time_from)/1000,
      rew_time_to:Date.parse(parseRew_time_to)/1000,
      rew_note
    };
    let a = dispatch(addReward(params));
    console.log(a);
    setVisible(false);
  };
  return (
    <div>
      <Bonus
        fakeData1={datareward}
        fakeData2={fakeData2}
        dataItem={dataItem}
        visible={visible}
        showModal={showModal}
        hideModal={hideModal}
        handleOk={handleOk}
        handleUpdate={handleUpdate}
        onChangeRange={onChangeRange}
        handleChange={handleChange}
        onChange={onChange}
      />
    </div>
  );
};

export default BonusContainer;
