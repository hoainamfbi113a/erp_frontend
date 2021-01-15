import React, { Component } from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
export default class NotFound extends Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, trang bạn yêu cầu không tồn tại"
        extra={
            <Link to="/erp"> <Button type="primary">Quay về trang chủ</Button>
            </Link>
        }
      />
    );
  }
}
