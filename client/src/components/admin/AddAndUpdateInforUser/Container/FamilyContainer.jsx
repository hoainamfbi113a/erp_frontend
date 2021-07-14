import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Family from "../Family";
import moment from "moment";
import {
  formatDateNumber,
  ValidateField2,
  notNull2,
} from "../../../../helpers/FuncHelper";
const dateFormatList = ["YYYY", "DD/MM/YY"];

const FamilyContainer = ({
  idUser,
  proId,
  type,
  namination,
  getData,
  updateData,
  addData,
  removeData,
  data,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({
    rem_full_name: "",
    rem_birthday: "",
    rem_job: "",
    rem_workplace: "",
    rem_historical_features: "",
    rem_residence: "",
    rem_note: "",
  });
  const [err, setErr] = useState({
    err_full_name: "",
    err_birthday: "",
    err_job: "",
    err_workplace: "",
    err_historical_features: "",
    err_residence: "",
    err_relationship: "",
  });
  const [rem_relationship, setRem] = useState();
  const [idFam, setIdFam] = useState(null);
  useEffect(() => {
    if (!data.length) dispatch(getData);
  }, [type]);

  const handleOk = async () => {
    const {
      rem_full_name,
      rem_birthday,
      rem_job,
      rem_workplace,
      rem_historical_features,
      rem_residence,
      rem_note,
    } = dataItem;
    let date = moment(dataItem.rem_birthday, dateFormatList[0]);

    const parseTime = Date.parse(date) / 1000;

    const err_full_name = await ValidateField2(rem_full_name, 3, 30, "Họ tên");
    const err_birthday = await notNull2(rem_birthday, "Năm sinh");
    const err_job = await ValidateField2(rem_job, 3, 30, "Nghề nghiệp");
    const err_work_place = await ValidateField2(
      rem_workplace,
      3,
      30,
      "Nơi làm việc"
    );
    const err_historical_features = await ValidateField2(
      rem_historical_features,
      3,
      50,
      "Đặc điểm lịch sử"
    );
    const err_residence = await ValidateField2(
      rem_residence,
      3,
      50,
      "Nơi cư trú"
    );
    const err_relationship = await ValidateField2(
      rem_relationship,
      1,
      30,
      "Trường này"
    );
    if (
      err_full_name ||
      err_birthday ||
      err_job ||
      err_work_place ||
      err_historical_features ||
      err_residence ||
      err_relationship
    ) {
      setErr({
        err_full_name,
        err_birthday,
        err_job,
        err_work_place,
        err_historical_features,
        err_residence,
        err_relationship,
      });
    }

    if (
      err_full_name === "" &&
      err_birthday === "" &&
      err_job === "" &&
      err_work_place === "" &&
      err_historical_features === "" &&
      err_residence === "" &&
      err_relationship === ""
    ) {
      const paramsAdd = {
        pro_id: proId,
        user_id: idUser,
        rem_type: type,
        rem_birthday: parseTime,
        rem_relationship,
        rem_full_name,
        rem_job,
        rem_workplace,
        rem_historical_features,
        rem_residence,
        rem_note,
      };
      const paramsUpdate = {
        ...paramsAdd,
        id: idFam,
      };
      if (idFam) {
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
      rem_relationship,
      rem_full_name,
      rem_job,
      rem_workplace,
      rem_historical_features,
      rem_residence,
      rem_note,
      rem_birthday,
    } = value;
    const date = formatDateNumber(rem_birthday, dateFormatList[0]);
    setVisible(true);
    setDataItem({
      rem_full_name,
      rem_birthday: date,
      rem_job,
      rem_workplace,
      rem_historical_features,
      rem_residence,
      rem_note,
    });
    setRem(rem_relationship);
    setIdFam(id);
  };

  const showModal = () => {
    setVisible(true);
    setDataItem({});
  };

  const hideModal = () => {
    setVisible(false);
    setRem();
    setIdFam(null);
    setErr({
      err_full_name: "",
      err_birthday: "",
      err_job: "",
      err_workplace: "",
      err_historical_features: "",
      err_residence: "",
      err_relationship: "",
    });
  };

  const onChange = (e) => {
    setDataItem({ ...dataItem, [e.target.name]: e.target.value });
  };

  const onChangeRange = (dateString) => {
    setDataItem({
      ...dataItem,
      rem_birthday: dateString,
    });
  };

  return (
    <div>
      <Family
        dataFamily={data}
        showModal={showModal}
        hideModal={hideModal}
        handleUpdate={handleUpdate}
        visible={visible}
        dataItem={dataItem}
        onChange={onChange}
        onChangeRange={onChangeRange}
        setRem={setRem}
        handleOk={handleOk}
        handleDelete={handleDelete}
        rem_relationship={rem_relationship}
        namination={namination}
        err={err}
      />
    </div>
  );
};
export default FamilyContainer;
