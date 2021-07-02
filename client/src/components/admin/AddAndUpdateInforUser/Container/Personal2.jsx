import React from "react";
import PersonalHistoryContainer from "./PersonalHistoryContainer";

const Personal2 = ({
  idUser,
  proId,
  type,
  namination,
  getData,
  addData,
  updateData,
  removeData,
  data,
}) => {
  const renderData = (i) => { 
      return (
        <PersonalHistoryContainer
          idUser={idUser}
          proId={proId}
          type={type[i]}
          namination={namination[i]}
          getData={getData[i]}
          addData={addData[i]}
          updateData={updateData[i]}
          removeData={removeData[i]}
          data={data[i]}
        />
      )
  }
  return (
    <div>
      {renderData(0)}
      {renderData(1)}
    </div>
  );
};
export default Personal2;
