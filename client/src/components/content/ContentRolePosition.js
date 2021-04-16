import React, { useState, useContext } from "react";
import TableRolePosition from "components/Table/TableRolePosition";
import Content from "./Content";

const ContentRolePosition = () => {
  const obj = {
    name: "Chức vụ",
    component: TableRolePosition
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentRolePosition;
