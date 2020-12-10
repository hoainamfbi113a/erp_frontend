import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination } from "antd";
import "./notification.css"

export default class NotifiGenaral extends Component {
  render() {
    return (
      <div className="content-background2">
        <div style={{ minHeight: "70vh" }} className="content-main">
          <div className="content-top">
            <div className="content-top-left content-notification">
              <div className="content-top-left-sum-item">Thông báo chung</div>
              <Button className="btn-notification" type="primary">
                ...
              </Button>
            </div>
          </div>
          <table className="content-notification-table">
            <tbody>
              <tr>
                <th>Tin</th>
                <th>Nội dung</th>
                <th>Ngày</th>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn">
                    Thông báo
                  </div>
                </td>
                <td className="content-notification-unread">
                  Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức
                  khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động
                  (CBNV) trong 2 ngày...
                </td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn content-notification-table-btn__flag">
                    Chào cờ
                  </div>
                </td>
                <td className="content-notification-unread">
                  Bắt đầu từ ngày 20/11/2020 sẽ bắt đầu chào cờ lại...
                </td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn content-notification-table-btn__good">
                    Tin vui
                  </div>
                </td>
                <td>
                  Kính gửi Cán bộ nhân viên, Ngày 20/11/2020 là ngày lễ thành
                  hôn của a ABC phòng ban... với chị BCA được tổ chức tại Ấp,
                  Xã, Huyện Tĩn h...
                </td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn content-notification-table-btn__sad">
                    Tin buồn
                  </div>
                </td>
                <td>
                  Chào anh em, Được tin bà ngoại của A mất sáng nay, lên đang
                  lên kế hoạch đi đám tang vào sáng mai 28-08 ở B. Để chia sẻ sự
                  mất mát này, phòng mình sẽ.....
                </td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn">
                    Thông báo
                  </div>
                </td>
                <td>
                  Kính gửi Cán bộ nhân viên và người lao động, Cơ quan tổ chức
                  khám sức khỏe tổng quát cho cán bộ nhân viên và người lao động
                  (CBNV) trong 2 ngày...
                </td>
                <td>09:15</td>
              </tr>
            </tbody>
          </table>
          <div className="content-bottom">
                <Pagination defaultCurrent={1} total={50} />
            </div>

        </div>
      </div>
    );
  }
}
