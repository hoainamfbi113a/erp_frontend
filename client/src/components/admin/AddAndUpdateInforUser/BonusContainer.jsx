import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tag,
} from "antd";
import { data } from "jquery";
import moment from "moment";
import React, { useState } from "react";
import Bonus from "./Bonus";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getReward } from "reduxToolkit/features/rewarddiscipline";
const { RangePicker } = DatePicker;

const { Option } = Select;
const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

let fakeData1 = [
  {
    id: 1,
    category: 1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "Lao Động Tiên Tiến",
  },
  {
    id: 2,
    category: 1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "Lao Động Khá",
  },
  {
    id: 3,
    category: 1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "Lao Động Xuất Sắc",
  },
];
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
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
  const dataReward = useSelector((state) => state.rewarddiscipline);
  useEffect(() => {
    console.log("Nguyen Hoai Nam");
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
    setDataItem(dataItem);
    setRefresh(!refresh);
  };
  const handleChange = (value) => {
    dataItem.category = value;
    setDataItem(dataItem);
    console.log(dataItem);
    setRefresh(!refresh);
  };
  const datareward = []
  if(dataReward.length!==0){
    for(let item of dataReward) {
      if(item.type === 1){
        datareward.push(item);
      }
    }
  }
  return (
    <div>
      {/* {console.log(dataReward)} */}
      <Bonus
        fakeData1={datareward}
        fakeData2={fakeData2}
        dataItem={dataItem}
        visible={visible}
        showModal={showModal}
        hideModal={hideModal}
        handleUpdate={handleUpdate}
        onChangeRange={onChangeRange}
        handleChange={handleChange}
      />
    </div>
  );
};

export default BonusContainer;
