import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import GoAbroad from "../GoAbroad";
import moment from "moment";
import {
  formatDateNumber,
  ValidateField,
  ValidateField2,
  ValidateField3,
} from "../../../../helpers/FuncHelper";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const GoAbroadContainer = ({
  idUser,
  proId,
  getData,
  updateData,
  addData,
  removeData,
  data,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [go_expense, setExpense] = useState("");
  const [dataItem, setDataItem] = useState({
    go_destination_country: "",
    go_time: "",
    go_time_comeback: "",
    go_inviting_unit: "",
    go_content: "",
    go_is_reported: 0,
    go_note: "",
  });
  const [go_purpose, setPurpose] = useState();
  const [err, setErr] = useState({
    err_destination_country: "",
    err_purpose: "",
    err_expense: "",
    err_inviting_unit: "",
    err_content: "",
  });
  const [idAbroad, setIdAbroad] = useState("");

  useEffect(() => {
    if (data&& !data.length) dispatch(getData);
  }, [data&&data.length]);

  const handleOk = async () => {
    let {
      go_destination_country,
      go_time,
      go_time_comeback,
      go_inviting_unit,
      go_content,
      go_note,
      go_is_reported,
    } = dataItem;
    let date1 = moment(go_time, "DD-MM-YYYY");
    let date2 = moment(go_time_comeback, "DD-MM-YYYY");

    let err_destination_country = await ValidateField(
      go_destination_country,
      2,
      20,
      "Nước đến"
    );

    let err_inviting_unit = "";
    let err_content = "";
    if (go_purpose === "Công tác") {
      err_inviting_unit = await ValidateField3(
        go_inviting_unit,
        2,
        20,
        "Đơn vị mời"
      );
      err_content = await ValidateField3(
        go_content,
        2,
        100,
        "Nội dung chuyến đi"
      );
      
    }
    if (err_inviting_unit || err_content) {
      setErr({
        ...err,
        err_inviting_unit,
        err_content,
      });
    }

    let err_purpose = await ValidateField2(
      go_purpose,
      2,
      30,
      "Mục đích chuyến đi"
    );
    let err_expense = await ValidateField(go_expense, 2, 20, "Kinh phí");

    if (
      err_destination_country ||
      err_expense ||
      err_purpose ||
      (err_purpose && go_purpose === "Công tác")
    ) {
      setErr({
        err_destination_country,
        err_expense,
        err_purpose,
        err_inviting_unit,
        err_content,
      });
    }

    const tempErr =
      err_destination_country === "" &&
      err_expense === "" &&
      err_purpose === "";

    if (
      (tempErr && go_purpose !== "Công tác") ||
      (tempErr &&
        go_purpose === "Công tác" &&
        err_inviting_unit === "" &&
        err_content === "")
    ) {
      const parseTimeFrom = Date.parse(date1) / 1000;
      const parseTimeTo = Date.parse(date2) / 1000;
      const paramsAdd = {
        pro_id: proId,
        user_id: idUser,
        go_destination_country,
        go_purpose,
        go_time: parseTimeFrom,
        go_time_comeback: parseTimeTo,
        go_expense,
        go_inviting_unit,
        go_content,
        go_is_reported,
        go_note,
      };
      const paramsUpdate = {
        id: idAbroad,
        ...paramsAdd
      };
      if (idAbroad) {
        dispatch(updateData(paramsUpdate));
      } else {
        dispatch(addData(paramsAdd));
        setTimeout(() => {
          dispatch(getData);
        }, 200);
      }
      hideModal();
    }
  };

  const handleDelete = (id) => {
    dispatch(removeData(id));
  };

  const handleUpdate = (value) => {
    const {
      id,
      go_destination_country,
      go_purpose,
      go_time,
      go_time_comeback,
      go_expense,
      go_inviting_unit,
      go_content,
      go_is_reported,
      go_note,
    } = value;
    const date1 = formatDateNumber(go_time, dateFormatList[0]);
    const date2 = formatDateNumber(go_time_comeback, dateFormatList[0]);
    setVisible(true);
    setIdAbroad(id);
    setPurpose(go_purpose);
    setExpense(go_expense);
    setDataItem({
      ...dataItem,
      go_destination_country,
      go_time: date1,
      go_time_comeback: date2,
      go_inviting_unit,
      go_content,
      go_is_reported,
      go_note,
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setDataItem({
      go_destination_country: "",
      go_time: "",
      go_time_comeback: "",
      go_inviting_unit: "",
      go_content: "",
      go_is_reported: 0,
      go_note: "",
    });
    setIdAbroad("");
    setPurpose();
    setExpense("");
    setErr({
      err_destination_country: "",
      err_purpose: "",
      err_expense: "",
      err_inviting_unit: "",
      err_content: "",
    });
    setVisible(false);
  };

  const onChange = (e) => {
    setDataItem({ ...dataItem, [e.target.name]: e.target.value });
  };

  const onChangeRange = (dateString) => {
    setDataItem({
      ...dataItem,
      go_time: dateString[0],
      go_time_comeback: dateString[1],
    });
  };

  return (
    <div>
      <GoAbroad
        dataAbroad={data}
        showModal={showModal}
        hideModal={hideModal}
        err={err}
        handleUpdate={handleUpdate}
        visible={visible}
        dataItem={dataItem}
        onChange={onChange}
        handleOk={handleOk}
        handleDelete={handleDelete}
        onChangeRange={onChangeRange}
        go_purpose={go_purpose}
        setPurpose={setPurpose}
        go_expense={go_expense}
        setExpense={setExpense}
      />
    </div>
  );
};
export default GoAbroadContainer;
