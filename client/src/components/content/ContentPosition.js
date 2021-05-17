import React from "react";
import TablePosition from "components/Table/TablePosition";
import Content from "./Content";

const ContentPosition = () => {
  const obj = {
    name: "Chức vụ",
    service: "positions", 
    component: TablePosition
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentPosition;
