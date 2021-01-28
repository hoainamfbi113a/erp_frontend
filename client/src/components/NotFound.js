import { Button, Result } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class NotFound extends Component {
  render() {
    return (
      <Result style={{height:'83vh'}}
        status="404"
        title="404"
        subTitle="Sorry, trang bạn yêu cầu không tồn tại"
        extra={
            <Link to="/"> <Button type="primary">Quay về trang chủ</Button>
            </Link>
        }
      />
    );
  }
}
