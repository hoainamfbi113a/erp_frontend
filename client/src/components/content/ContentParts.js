import React, { useState, useContext } from "react";
import TableParts from "components/Table/TableParts";
import Content from "./Content";

const ContentDepartment = () => {
  const obj = {
    name: "Tổ",
    service: "parts", 
    component: TableParts
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentDepartment;
