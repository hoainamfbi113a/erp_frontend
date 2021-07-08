import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import {
  addTraining,
  getTraining,
  removeTraining,
  updateTraining,
} from "../../../../reduxToolkit/features/userProfile/trainingSlice";
import {
  addTraining2,
  getTraining2,
  removeTraining2,
  updateTraining2,
} from "../../../../reduxToolkit/features/userProfile/training2Slice";
import Training from "../Training";
import moment from "moment";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
import { formatDateNumber } from "../../../../helpers/FuncHelper";

const TrainingContainer = (props) => {
  const [id, setId] = useState("");
  const [dataItem, setDataItem] = useState({
    tra_type: 1,
    tra_time_from: "",
    tra_time_from: "",
    tra_note: null,
    tra_school_name: "",
    tra_study_time: "",
    tra_majors: "",
    tra_study_mode: "",
    tra_diploma: "",
    tra_address: "",
  });
  const [visible, setVisible] = useState(false);
  const [fileImg, setFileImg] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [cate, setCate] = useState({});
  const dispatch = useDispatch();
  const dataTraining = useSelector((state) => state.trainingUser);
  const dataTraining2 = useSelector((state) => state.training2User);

  useEffect(() => {
    if (!dataTraining.length && !dataTraining2.length) {
      dispatch(
        getTraining({
          id_user: props.idUser,
          type: 1,
        })
      );
      dispatch(
        getTraining2({
          id_user: props.idUser,
          type: 2,
        })
      );
    }
  }, [dispatch]);
  const showModal = (value) => {
    setDataItem({
      tra_type: 1,
      tra_time_from: "",
      tra_time_to: "",
      tra_note: null,
      tra_school_name: "",
      tra_study_time: "",
      tra_majors: "",
      tra_study_mode: "",
      tra_diploma: "",
      tra_address: "",
      fileImg: null,
    });
    if (value == 1) {
      setCate({ category: 1 });
    } else {
      setCate({ category: 2 });
    }
    setVisible(true);
  };

  const hideModal = () => {
    setDataItem({
      tra_type: 1,
      tra_time_from: "",
      tra_time_to: "",
      tra_note: null,
      tra_school_name: "",
      tra_study_time: "",
      tra_majors: "",
      tra_study_mode: "",
      tra_diploma: "",
      tra_address: "",
      fileImg: mull,
    });
    setId("");

    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    let dataTemp = {};
    if (value.tra_type == 1) {
      dataTemp = dataTraining.find((item) => item.id == value.id);
    } else {
      dataTemp = dataTraining2.find((item) => item.id == value.id);
    }

    let {
      id,
      tra_type,
      tra_time_from,
      tra_time_to,
      tra_note,
      tra_school_name,
      tra_study_time,
      tra_majors,
      tra_study_mode,
      tra_diploma,
      tra_address,
    } = dataTemp;
    let date1 = formatDateNumber(tra_time_from, dateFormatList[0]);
    let date2 = formatDateNumber(tra_time_to, dateFormatList[0]);
    setId(id);
    setDataItem({
      ...dataItem,
      tra_time_from: date1,
      tra_time_to: date2,
      tra_note,
      tra_type,
      tra_school_name,
      tra_study_time,
      tra_majors,
      tra_study_mode,
      tra_diploma,
      tra_address,
    });
  };
  const onChangeRange = (dateString) => {
    setDataItem({
      ...dataItem,
      tra_time_from: dateString[0],
      tra_time_to: dateString[1],
    });
  };
  const handleChange = (value) => {
    setDataItem({ ...dataItem, tra_type: value });
    setRefresh(!refresh);
  };
  // const onChange = (e) => {
  //   setDataItem({ ...dataItem, tra_note: e.target.value });
  // };
  const onChange = (e) => {
    if (!e.file) {
      setDataItem({ ...dataItem, [e.target.name]: e.target.value });
    }
  };

  const datatraining = [];
  if (dataTraining && dataTraining.length !== 0) {
    for (let item of dataTraining) {
      if (item.tra_type == 1) {
        datatraining.push(item);
      }
    }
  }
  const addData = (idImg) => {
    let {
      tra_type,
      tra_time_from,
      tra_time_to,
      tra_note,
      tra_school_name,
      tra_study_time,
      tra_majors,
      tra_study_mode,
      tra_diploma,
      tra_address,
    } = dataItem;
    let date1 = moment(tra_time_from, "DD-MM-YYYY");
    let date2 = moment(tra_time_to, "DD-MM-YYYY");

    const parse_time_from = Date.parse(date1) / 1000;
    const parse_time_to = Date.parse(date2) / 1000;
    const params = {
      pro_id: props.dataProfile.id,
      user_id: props.idUser,
      tra_type,
      tra_time_from: parse_time_from,
      tra_time_to: parse_time_to,
      tra_note,
      tra_school_name,
      tra_study_time,
      tra_majors,
      tra_study_mode,
      tra_diploma,
      tra_address,
      id,
      resource_id: idImg,
    };
    console.log(params);
    if (id == "") {
      if (tra_type == 1) {
        dispatch(addTraining(params));
      } else {
        dispatch(addTraining2(params));
      }

      setTimeout(() => {
        if (tra_type == 1) {
          dispatch(
            getTraining({
              id_user: props.idUser,
              type: 1,
            })
          );
        } else {
          dispatch(
            getTraining2({
              id_user: props.idUser,
              type: 2,
            })
          );
        }
      }, 200);
    } else {
      if (tra_type == 1) {
        dispatch(updateTraining(params));
      } else {
        dispatch(updateTraining2(params));
      }
      setId("");
    }

    setVisible(false);
  };
  const handleOkDelete = (item) => {
    const { tra_type, id } = item;
    if (tra_type == 1) {
      dispatch(
        removeTraining({
          id,
        })
      );
    } else {
      dispatch(
        removeTraining2({
          id,
        })
      );
    }
  };
  const handleOk = () => {
    const formData = new FormData();
    formData.append("file", fileImg.target.files[0]);
    formData.append("type", "training" + dataItem.tra_type);
    axios
      .post("/api/resources", formData)
      .then((res) => {
        if (res.data.message === "Successfully") {
          console.log(res.data.data.id);
          addData(res.data.data.id);
        } else {
          message.error("Thêm ảnh thất bại");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeImage = (e) => {
    setFileImg(e);
  };
  return (
    <div>
      <Training
        dataTraining={datatraining}
        dataTraining2={dataTraining2}
        dataItem={dataItem}
        visible={visible}
        showModal={showModal}
        hideModal={hideModal}
        handleOk={handleOk}
        handleUpdate={handleUpdate}
        onChangeRange={onChangeRange}
        handleChange={handleChange}
        onChange={onChange}
        handleOkDelete={handleOkDelete}
        onChangeImage={onChangeImage}
      />
    </div>
  );
};

export default TrainingContainer;
