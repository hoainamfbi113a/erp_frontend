import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFamily,
  addFamily,
  removeFamily,
  updateFamily,
} from "../../../../reduxToolkit/features/userProfile/familySlice";
import Family from "../Family";

const fakeData = [
  {
    id: 1,
    title: "Nhà",
    content: "123 Phạm Văn Đồng Gò Vấp giá trị 3 tỉ đồng",
  },
];

const FamilyContainer = ({ idUser, proId }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({
    rem_full_name: "",
    rem_note: "",
    rem_job: "",
  });
  const [rem_relationship, setRem] = useState();
  const [idFam, setIdFam] = useState(null);
  const dataFamily = useSelector((state) => state.familyUser);

  useEffect(() => {
    dispatch(getFamily(idUser));
  }, [dispatch]);

  const handleOk = () => {
    const params = {
      id: idFam,
      pro_id: proId,
      user_id: idUser,
      rem_relationship: rem_relationship,
      rem_full_name: dataItem.rem_full_name,
      rem_note: dataItem.rem_note,
      rem_job: dataItem.rem_job,
    };
    if (idFam) {
      console.log(params);
      dispatch(updateFamily(params));
    } else {
      dispatch(addFamily(params));
      setTimeout(() => {
        dispatch(getFamily(idUser));
      }, 200);
    }

    setVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(removeFamily(id));
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
  };

  const onChange = (e) => {
    setDataItem({ ...dataItem, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Family
        fakeData={fakeData}
        dataFamily={dataFamily}
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
      />
    </div>
  );
};
export default FamilyContainer;
