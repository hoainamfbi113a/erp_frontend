import React, { useState, useContext } from "react";
import TablePosition from "components/Table/TablePosition";
import Content from "./Content";

const ContentDepartment = () => {
  const obj = {
    name: "Chức vụ",
    service: "positions", 
    component: TablePosition
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentDepartment;
