import TableDepartmentContainer from "components/Table/container/TableDepartmentContainer";
import React from "react";
import Content from "./Content";

const ContentDepartment = () => {
  const obj = {
    name: "Phòng ban",
    service: "departments", 
    component: TableDepartmentContainer
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentDepartment;
