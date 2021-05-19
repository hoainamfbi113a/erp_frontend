import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFamily, addFamily } from "../../../../reduxToolkit/features/userProfile/familySlice"
import docCookies from "doc-cookies";
import Family from "../Family"


const fakeData = [
  {
    id: 1,
    title: "Nhà",
    content: "123 Phạm Văn Đồng Gò Vấp giá trị 3 tỉ đồng",
  },
];

const FamilyContainer = () => {
  const dispatch = useDispatch();
  const user_id = docCookies.getItem("user_id");
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const dataFamily = useSelector((state) => state.familyUser);
  

  useEffect(() => {
    dispatch(getFamily(user_id));
  }, [dispatch]);

  const showModal = () => {
    setVisible(true);
    setDataItem({});
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleUpdate = (value) => {
    setVisible(true);
    setDataItem(value);
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
      />
    </div>
  )

};
export default FamilyContainer;
