import React, { useState, useContext } from "react";
import TableParts from "components/Table/TableParts";
import Content from "./Content";

const ContentPart = () => {
  const obj = {
    name: "Tổ",
    service: "parts", 
    component: TableParts
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentPart;
