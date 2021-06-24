import TableDepartmentContainer from "components/Table/container/TableDepartmentContainer";
import React from "react";
import ContentDepartContainer from "./ContentDepartContainer";

const ContentDepartment = () => {
  const obj = {
    name: "Phòng ban",
    service: "departments", 
    component: TableDepartmentContainer
  }
  return (
    <ContentDepartContainer {...obj}/>
  )
};
export default ContentDepartment;
