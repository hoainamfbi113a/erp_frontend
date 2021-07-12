import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PersonalHistory from "../PersonalHistory";
import moment from "moment";
import { formatDateNumber } from "../../../../helpers/FuncHelper";
import {
  getAllCityApi,
  getDistrictById,
} from "../../../../apis/UserProfile/cityApi";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const PersonalHistoryContainer = ({
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
    his_work_place: "",
    his_work_from: "",
    his_work_to: "",
    his_working_process: "",
    his_note: "",
  });
  const [his_city, setHisCity] = useState([]);
  const [his_district, setHisDistrict] = useState();
  const [idHis, setIdHis] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState("");
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (!data.length) dispatch(getData);
  }, [type]);

  useEffect(() => {
    fetchCityData();
  }, []);

  useEffect(() => {
    if (cityId !== "") {
      setDistricts("");
      fetchDistrictData(cityId);
    }
  }, [cityId]);

  const fetchCityData = async () => {
    try {
      const data = await getAllCityApi();
      if (!data.err) {
        setCities(data.LtsItem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDistrictData = async (id) => {
    try {
      const data = await getDistrictById(id);
      if (!data.err) {
        setDistricts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    let date1 = moment(dataItem.his_work_from, "DD-MM-YYYY");
    let date2 = moment(dataItem.his_work_to, "DD-MM-YYYY");

    const parseTimeFrom = Date.parse(date1) / 1000;
    const parseTimeTo = Date.parse(date2) / 1000;
    const paramsAdd = {
      pro_id: proId,
      user_id: idUser,
      his_work_place: dataItem.his_work_place,
      his_work_from: parseTimeFrom,
      his_work_to: parseTimeTo,
      his_working_process: dataItem.his_working_process,
      his_note: dataItem.his_note,
      type: type,
    };
    const paramsUpdate = {
      id: idHis,
      pro_id: proId,
      user_id: idUser,
      his_work_place: dataItem.his_work_place,
      his_work_from: parseTimeFrom,
      his_work_to: parseTimeTo,
      his_working_process: dataItem.his_working_process,
      his_note: dataItem.his_note,
      type: type,
    };
    if (idHis) {
      dispatch(updateData(paramsUpdate));
    } else {
      dispatch(addData(paramsAdd));
      setTimeout(() => {
        dispatch(getData);
      }, 200);
    }

    hideModal();
  };

  const handleDelete = (id) => {
    dispatch(removeData(id));
  };

  const handleUpdate = (value) => {
    const {
      id,
      his_work_place,
      his_work_from,
      his_work_to,
      his_working_process,
      his_note,
    } = value;
    const date1 = formatDateNumber(his_work_from, dateFormatList[0]);
    const date2 = formatDateNumber(his_work_to, dateFormatList[0]);
    setVisible(true);
    setIdHis(id);
    setDataItem({
      ...dataItem,
      his_work_place,
      his_work_from: date1,
      his_work_to: date2,
      his_working_process,
      his_note,
    });
  };

  const showModal = () => {
    setVisible(true);
    setDataItem({});
  };

  const hideModal = () => {
    setVisible(false);
    setIdHis(null);
  };

  const onChange = (e) => {
    setDataItem({ ...dataItem, [e.target.name]: e.target.value });
  };

  const onChangeRange = (dateString) => {
    setDataItem({
      ...dataItem,
      his_work_from: dateString[0],
      his_work_to: dateString[1],
    });
  };

  const onChangeDropDown = () => {
    setDistricts([]);
    console.log(districts);
  }

  return (
    <div>
      <PersonalHistory
        dataHistory={data}
        showModal={showModal}
        hideModal={hideModal}
        handleUpdate={handleUpdate}
        visible={visible}
        dataItem={dataItem}
        onChange={onChange}
        handleOk={handleOk}
        handleDelete={handleDelete}
        onChangeRange={onChangeRange}
        namination={namination}
        his_city={his_city}
        setHisCity={setHisCity}
        setCityId={setCityId}
        his_district={his_district}
        setHisDistrict={setHisDistrict}
        cities={cities}
        districts={districts}
        onChangeDropDown={onChangeDropDown}
      />
    </div>
  );
};
export default PersonalHistoryContainer;
