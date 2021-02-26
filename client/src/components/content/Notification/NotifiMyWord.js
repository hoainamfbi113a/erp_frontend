import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination } from "antd";
import "./notification.css"

export default class NotifiWord extends Component {
    render() {
        return (
          <div className="content-background2">
          <div style={{minHeight:'70vh'}} className="content-main">
            <div className="content-top">
              <div className="content-top-left content-notification">
                <div className="content-top-left-sum-item">Việc của tôi</div>
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
                    <div className="content-notification-table-btn content-notification-table-btn__good">
                    TTC
                    </div>
                  </td>
                  <td className="content-notification-unread">
                  Thiết kế thiệp giáng sinh TTC
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                    TTCT
                    </div>
                  </td>
                  <td >
                  Canh trái text của title các trang 1 cột
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                    Thông tin nhân viên
                    </div>
                  </td>
                  <td className="content-notification-unread">
                  Gửi các bạn phòng CNTT, 2:00 PM Phòng CNTT sẽ có cuộc hơp về dự án A với sự miêu tả của anh B. Mong các bạn đến đúng giờ....
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                    Thông tin nhân viên
                    </div>
                  </td>
                  <td className="content-notification-unread">
                  Gửi các bạn phòng CNTT, 2:00 PM Phòng CNTT sẽ có cuộc hơp về dự án A với sự miêu tả của anh B. Mong các bạn đến đúng giờ....
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                    Thông tin nhân viên
                    </div>
                  </td>
                  <td className="content-notification-unread">
                  Gửi các bạn phòng CNTT, 2:00 PM Phòng CNTT sẽ có cuộc hơp về dự án A với sự miêu tả của anh B. Mong các bạn đến đúng giờ....
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                    Thông tin nhân viên
                    </div>
                  </td>
                  <td className="content-notification-unread">
                  Gửi các bạn phòng CNTT, 2:00 PM Phòng CNTT sẽ có cuộc hơp về dự án A với sự miêu tả của anh B. Mong các bạn đến đúng giờ....
                  </td>
                  <td>09:15</td>
                </tr>
              </tbody>
            </table>
            <div className="content-bottom-pagination">
                <Pagination defaultCurrent={1} total={150} />
            </div>
          </div>
        </div>
        )
    }
}
