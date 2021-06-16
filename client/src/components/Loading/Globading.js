import React, { Component } from "react";
import "./Globading.css";
import { Spin } from "antd";
import { useSelector } from "react-redux";
const GlobalLoading = () => {
  const showLoading = useSelector(state => state.uiLoading.showLoading)
  return (
    <div>
      {showLoading === true ? (
        <div className="GlobalLoading">
          <Spin className="icon2" size="large" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default GlobalLoading; 
