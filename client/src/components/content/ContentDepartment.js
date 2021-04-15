import React, { useState, useContext } from "react";
import TableDepartment from "components/Table/TableDepartment";
import Content from "./Content";

const ContentDepartment = () => {
  const obj = {
    name: "Phòng ban",
    service: "departments", 
    component: TableDepartment
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentDepartment;
