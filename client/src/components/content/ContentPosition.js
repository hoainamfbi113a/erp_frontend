import React from "react";
import TablePositionContainer from "components/Table/container/TablePositionContainer";
import Content from "./Content";

const ContentPosition = () => {
  const obj = {
    name: "Chức vụ",
    service: "positions", 
    component: TablePositionContainer
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentPosition;
