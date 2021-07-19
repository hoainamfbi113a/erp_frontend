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
  checkEmpty
} from "../../../../helpers/FuncHelper";
import { hideLoading, showLoading } from "reduxToolkit/features/uiLoadingSlice";
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
    resource: "",
    id: "",
  });
  const [err, setErr] = useState({
    err_content: "",
    err_number: "",
    err_file: "",
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
      resource: ""
    });
    setErr({
      err_content: "",
      err_number: "",
      err_file: ""
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
      resource
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
      resource
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
    // return
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
    } else {
      if (type == 1) {
        dispatch(updateReward(params));
      } else {
        dispatch(updateDiscipline(params));
      }

      setId("");
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
    hideModal();
    setVisible(false);
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

  const handleOk = async (id) => {
    let {
      rew_content,
      rew_decision_number,
    } = reward;
    let err_content = await ValidateField(rew_content, 5, 50, "Nội dung");
    let err_number = await ValidateNumber(rew_decision_number, 5, 10, "Số Cấp");
    let err_file = "";
    if (fileImg == null && id == "") {
      err_file = "File không thể để trống";
    }
    if (err_content || err_number || err_file !== "") {
      setErr({ err_content, err_number, err_file });
    }
    if (err_content === "" && err_number === "" && err_file === "") {
      if (fileImg) {
        let fileName = fileImg.target.files[0].name;
        const formData = new FormData();
        formData.append("file", fileImg.target.files[0]);
        if (fileName.slice(fileName.indexOf(".")) === ".pdf") {
          formData.append("type", "bounuspdf")
        } else {
          formData.append("type", "bounus" + dataItem.tra_type)
        }
        dispatch(showLoading());
        fileImg.target.value = null;
        axios
          .post("/api/resources", formData)
          .then((res) => {
            if (res.data.message === "Successfully") {
              addData(res.data.data.id);
            } else {
              message.error("Thêm ảnh thất bại");
            }
            dispatch(hideLoading());
          })
          .catch((err) => {
            console.log(err);
            dispatch(hideLoading());
          });
      } else {
        addData(id);
      }
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
