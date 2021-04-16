import React, { useState, useContext } from "react";
import TablePermission from "components/Table/TablePermission";
import Content from "./Content";

const ContentPermission = () => {
  const obj = {
    name: "Quyền",
    component: TablePermission
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentPermission;
