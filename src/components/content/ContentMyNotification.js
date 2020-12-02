import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination } from "antd";
import { Link } from "react-router-dom";
const { Search } = Input;
import TableSix from "../Table/TableSix";
import "./Content.css";

export default class ContentMyNotification extends Component {
  render() {
    return (
      <div>
        <div className="content-top">
          <div className="content-top-left content-notification">
            <div className="content-top-left-sum-item">Thông báo chung</div>
            <Button className="btn-notification" type="primary">
              ...
            </Button>
          </div>
        </div>
        <table className="content-notification-table">
          <tr>
            <th>Tin</th>
            <th>Nội dung</th>
            <th>Ngàys</th>
          </tr>
          <tr>
            <td><div className="content-notification-table-btn">Thông báo</div></td>
            <td>Kính gửi Cán bộ nhân viên và người<br></br> lao động, Cơ quan tổ chức khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động (CBNV) trong 2 ngày...</td>
            <td>09:15</td>
          </tr>
          <tr>
            <td><div className="content-notification-table-btn">Thông báo</div></td>
            <td>Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động (CBNV) trong 2 ngày...</td>
            <td>09:15</td>
          </tr>
          <tr>
            <td><div className="content-notification-table-btn">Thông báo</div></td>
            <td>Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động (CBNV) trong 2 ngày...</td>
            <td>09:15</td>
          </tr>
          <tr>
            <td><div className="content-notification-table-btn">Thông báo</div></td>
            <td>Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động (CBNV) trong 2 ngày...</td>
            <td>09:15</td>
          </tr>
          <tr>
            <td><div className="content-notification-table-btn">Thông báo</div></td>
            <td>Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động (CBNV) trong 2 ngày...</td>
            <td>09:15</td>
          </tr>
          <tr>
            <td><div className="content-notification-table-btn">Thông báo</div></td>
            <td>Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động (CBNV) trong 2 ngày...</td>
            <td>09:15</td>
          </tr>
          <tr>
            <td><div className="content-notification-table-btn">Thông báo</div></td>
            <td>Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động (CBNV) trong 2 ngày...</td>
            <td>09:15</td>
          </tr>
          <tr>
            <td><div className="content-notification-table-btn">Thông báo</div></td>
            <td>Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động (CBNV) trong 2 ngày...</td>
            <td>09:15</td>
          </tr>
        </table>
        <div className="content-bottom">
            <Pagination defaultCurrent={1} total={150} />
        </div>
      </div>
      // <div>aaaa</div>
    );
  }
}
