import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrganize,
  getOrganize,
  removeOrganize,
  updateOrganize,
} from "../../../../reduxToolkit/features/userProfile/organizeSlice";
import {
  addOrganize2,
  getOrganize2,
  removeOrganize2,
  updateOrganize2,
} from "../../../../reduxToolkit/features/userProfile/organize2Slice";
import Organize from "../Organize";
import moment from "moment";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
import { formatDateNumber } from "../../../../helpers/FuncHelper";

const OrganizeContainer = (props) => {
  const [id, setId] = useState("");
  const [dataItem, setDataItem] = useState({
    org_type: 1,
    org_time_from: "",
    org_time_from: "",
    org_note: null,
    org_name:"",
    org_headquarters_where:"",
    org_position:"",
    org_youth_team:"",
    org_youth_group:"",
  });
  const [visible, setVisible] = useState(false);
  const [cate, setCate] = useState({});
  const [refresh, setRefresh] = useState(true);
  const dispatch = useDispatch();
  const dataOrg = useSelector((state) => state.organizeUser);
  const dataOrg2 = useSelector((state) => state.organize2User);

  useEffect(() => {
    if (!dataOrg.length && !dataOrg2.length) {
      dispatch(
        getOrganize({
          id_user: props.idUser,
          type:"org"
        })
      );
      dispatch(
        getOrganize2({
          id_user: props.idUser,
          type: 2,
        })
      );
    }
  }, [dispatch]);
  const showModal = (value) => {
    setDataItem({
      org_type: 1,
      org_time_from: "",
      org_time_to: "",
      org_note: null,
      org_name:"",
      org_headquarters_where:"",
      org_position:"",
      org_youth_team:"",
      org_youth_group:"",
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
      org_type: 1,
      org_time_from: "",
      org_time_to: "",
      org_note: null,
      org_name:"",
      org_headquarters_where:"",
      org_position:"",
      org_youth_team:"",
      org_youth_group:"",
    });
    setId("");

    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    let dataTemp = {};
    if (value.org_type == 1) {
      dataTemp = dataOrg.find((item) => item.id == value.id);
    } else {
      dataTemp = dataOrg2.find((item) => item.id == value.id);
    }

    let { id, org_type, org_time_from, org_time_to, org_note,
      org_name, org_headquarters_where, org_position, org_youth_team, org_youth_group, } = dataTemp;
    let date1 = formatDateNumber(org_time_from, dateFormatList[0]);
    let date2 = formatDateNumber(org_time_to, dateFormatList[0]);
    setId(id);
    setDataItem({
      ...dataItem,
      org_time_from: date1,
      org_time_to: date2,
      org_note,
      org_type,
      org_name,
      org_headquarters_where,
      org_position,
      org_youth_team,
      org_youth_group,
    });
  };
  // const onChangeRange = (dateString) => {
  //   setDataItem({
  //     ...dataItem,
  //     org_time_from: dateString[0],
  //     org_time_to: dateString[1],
  //   });
  // };
  const onChangeRange = (e, dateString, name) => {
    setDataItem({ ...dataItem, org_time_from: dateString });
  };
  const handleChange = (value) => {
    setDataItem({ ...dataItem, org_type: value });
    setRefresh(!refresh);
  };
  const onChange = (e) => {
    setDataItem({ ...dataItem, [e.target.name]: e.target.value });
  };
  const dataorg = [];
  if (dataOrg && dataOrg.length !== 0) {
    for (let item of dataOrg) {
      if (item.org_type == 1) {
        dataorg.push(item);
      }
    }
  }
  const handleOk = () => {
    let { org_type, org_time_from, org_time_to, org_note, org_name,
      org_headquarters_where, org_position, org_youth_team, org_youth_group, } = dataItem;
    let date1 = moment(org_time_from, "DD-MM-YYYY");
    let date2 = moment(org_time_to, "DD-MM-YYYY");

    const parse_time_from = Date.parse(date1) / 1000;
    const parse_time_to = Date.parse(date2) / 1000;
    const params = {
      pro_id: props.dataProfile.id,
      user_id: props.idUser,
      org_type,
      org_time_from: parse_time_from,
      org_time_to: parse_time_to,
      org_note,
      org_name,
      org_headquarters_where,
      org_position,
      org_youth_team,
      org_youth_group,
      id,
    };
    if (id == "") {
      if (org_type == 1) {
        dispatch(addOrganize(params));
      } else {
        dispatch(addOrganize2(params));
      }

      setTimeout(() => {
        if (org_type == 1) {
          dispatch(
            getOrganize({
              id_user: props.idUser,
              type: 1,
            })
          );
        } else {
          dispatch(
            getOrganize2({
              id_user: props.idUser,
              type: 2,
            })
          );
        }
      }, 200);
    } else {
      if (org_type == 1) {
        dispatch(updateOrganize(params));
      } else {
        dispatch(updateOrganize2(params));
      }
      setId("");
    }

    setVisible(false);
  };
  const handleOkDelete = (item) => {
    const { org_type, id } = item;
    if (org_type == 1) {
      dispatch(
        removeOrganize({
          id,
        })
      );
    } else {
      dispatch(
        removeOrganize2({
          id,
        })
      );
    }
  };
  return (
    <div>
      <Organize
        dataOrg={dataorg}
        dataOrg2={dataOrg2}
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
      />
    </div>
  );
};

export default OrganizeContainer;
