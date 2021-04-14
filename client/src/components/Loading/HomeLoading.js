import React from "react";
import "./Globading.css";
import { Spin } from "antd";
const HomeLoading = () => {
  return (
    <div>
      <div className="GlobalLoading">
        <Spin className="icon" size="large" />
      </div>
    </div>
  );
};
export default HomeLoading;
