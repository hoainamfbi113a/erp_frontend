import TablePartContainer from "components/Table/container/TablePartContainer";
import React from "react";
import Content from "./Content";

const ContentPart = () => {
  const obj = {
    name: "Tổ",
    service: "parts", 
    component: TablePartContainer
  }
  return (
    <Content {...obj}/>
  )
};
export default ContentPart;
