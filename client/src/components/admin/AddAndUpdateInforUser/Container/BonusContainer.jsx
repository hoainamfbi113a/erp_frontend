import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
import {
  formatDateNumber,
  ValidateNumber,
  ValidateField,
} from "../../../../helpers/FuncHelper";
const BonusContainer = (props) => {
  const [id, setId] = useState("");
  const [reward, setReward] = useState({
    type: 1,
    rew_formality: "",
    rew_time_from: "",
    rew_time_to: "",
    rew_note: null,
    rew_content: "",
    rew_decision_number: "",
    id: "",
  });
  const [err, setErr] = useState({
    err_content: "",
    err_number: "",
  });
  const [visible, setVisible] = useState(false);
  const [fileImg, setFileImg] = useState(null);
  const [dataItem, setDataItem] = useState({});
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
  const dataReward = useSelector((state) => state.rewardUser);
  const dataDiscipline = useSelector((state) => state.disciplineUser);
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(
      getReward({
        id_user: props.idUser,
        type: 1,
      })
    );
    dispatch(
      getDiscipline({
        id_user: props.idUser,
        type: 2,
      })
    );
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
      rew_content: "",
      rew_decision_number: "",
      fileImg: null,
    });
    setErr({
      err_content: "",
      err_number: ""
    })
    setId("");

    setVisible(false);
  };

  const handleUpdate = (value) => {
    setVisible(true);
    let rewardItem = {};
    if (value.type == 1) {
      rewardItem = dataReward.find((item) => item.id == value.id);
    } else {
      rewardItem = dataDiscipline.find((item) => item.id == value.id);
    }

    let {
      id,
      type,
      rew_formality,
      rew_time_from,
      rew_time_to,
      rew_note,
      rew_content,
      rew_decision_number,
    } = rewardItem;
    let date1 = formatDateNumber(rew_time_from, dateFormatList[0]);
    let date2 = formatDateNumber(rew_time_to, dateFormatList[0]);
    setId(id);
    setReward({
      ...reward,
      rew_formality,
      rew_time_from: date1,
      rew_time_to: date2,
      rew_note,
      type,
      rew_content,
      rew_decision_number,
      id: id,
    });
  };

  const onChangeRange = (e, dateString, name1, name2) => {
    console.log(dateString[0]);
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

  const onChange = (e) => {
    setReward({ ...reward, [e.target.name]: e.target.value });
  };

  const datareward = [];
  if (dataReward && dataReward.length !== 0) {
    for (let item of dataReward) {
      if (item.type == 1) {
        datareward.push(item);
      }
    }
  }

  const addData = async (idImg) => {
    let {
      type,
      rew_formality,
      rew_time_from,
      rew_time_to,
      rew_note,
      rew_content,
      rew_decision_number,
    } = reward;

    let date1 = moment(rew_time_from, "DD-MM-YYYY");
    let date2 = moment(rew_time_to, "DD-MM-YYYY");

    let err_content = await ValidateField(rew_content, 5, 50, "Nội dung");
    let err_number = await ValidateNumber(rew_decision_number, 5, 10, "Số Cấp");

    if (err_content || err_number) {
      setErr({ err_content, err_number });
    }

    if (err_content === "" && err_number === "") {
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
        rew_content,
        rew_decision_number,
        resource_id: idImg,
      };
      if (id == "") {
        if (type == 1) {
          dispatch(addReward(params));
        } else {
          dispatch(addDiscipline(params));
        }

        setTimeout(() => {
          if (type == 1) {
            dispatch(
              getReward({
                id_user: props.idUser,
                type: 1,
              })
            );
          } else {
            dispatch(
              getDiscipline({
                id_user: props.idUser,
                type: 2,
              })
            );
          }
        }, 200);
      } else {
        if (type == 1) {
          dispatch(updateReward(params));
        } else {
          dispatch(updateDiscipline(params));
        }
        setId("");
      }

      setVisible(false);
    }
  };

  const handleOkDelete = (item) => {
    const { type, id } = item;
    if (type == 1) {
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

  const handleOk = (id) => {
    if (fileImg) {
      const formData = new FormData();
      formData.append("file", fileImg.target.files[0]);
      formData.append("type", "bounus" + dataItem.tra_type);
      axios
        .post("/api/resources", formData)
        .then((res) => {
          if (res.data.message === "Successfully") {
            addData(res.data.data.id);
          } else {
            message.error("Thêm ảnh thất bại");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addData(id);
    }
  };

  const onChangeImage = (e) => {
    setFileImg(e);
  };

  return (
    <div>
      <Bonus
        dataReward={datareward}
        err={err}
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
        onChangeImage={onChangeImage}
      />
    </div>
  );
};

export default BonusContainer;
