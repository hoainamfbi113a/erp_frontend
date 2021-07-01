import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Family from "../Family";
 
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
    rem_note: "",
    rem_job: "",
  });
  const [rem_relationship, setRem] = useState();
  const [idFam, setIdFam] = useState(null);
  useEffect(() => {
    if (!data.length) dispatch(getData);
  }, [type]);

  const handleOk = () => {
    const paramsAdd = {
      pro_id: proId,
      user_id: idUser,
      rem_relationship: rem_relationship,
      rem_full_name: dataItem.rem_full_name,
      rem_note: dataItem.rem_note,
      rem_job: dataItem.rem_job,
      rem_type: type,
    };
    const paramsUpdate = {
      id: idFam,
      pro_id: proId,
      user_id: idUser,
      rem_relationship: rem_relationship,
      rem_full_name: dataItem.rem_full_name,
      rem_note: dataItem.rem_note,
      rem_job: dataItem.rem_job,
      rem_type: type,
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
  };

  const handleDelete = (id) => {
    dispatch(removeData(id));
  };

  const handleUpdate = (value) => {
    const { id, rem_relationship } = value;
    setVisible(true);
    setDataItem(value);
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
  };

  const onChange = (e) => {
    setDataItem({ ...dataItem, [e.target.name]: e.target.value });
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
        setRem={setRem}
        handleOk={handleOk}
        handleDelete={handleDelete}
        rem_relationship={rem_relationship}
        namination={namination}
      />
    </div>
  );
};
export default FamilyContainer;
