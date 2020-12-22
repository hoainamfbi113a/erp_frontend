import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination } from "antd";
import "./notification.css"
export default class NotifiMy extends Component {
    render() {
        return (
          <div className="content-background2">
          <div style={{minHeight:'70vh'}} className="content-main">
            <div className="content-top">
              <div className="content-top-left content-notification">
                <div className="content-top-left-sum-item">Thông báo của tôi</div>
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
                    <div className="content-notification-table-btn content-notification-table-btn__paycheck">
                      Phiếu lương
                    </div>
                  </td>
                  <td className="content-notification-unread">
                    Gửi Vinh, Phiếu lương tháng 11/2020...
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                      Họp
                    </div>
                  </td>
                  <td className="content-notification-unread">
                  Gửi Vinh, Họp phòng CNTT...
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                      Họp
                    </div>
                  </td>
                  <td className="content-notification-unread"> 
                  Gửi Vinh, Họp chi đoàn tòa soạn.
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                      Họp
                    </div>
                  </td>
                  <td>
                  Gửi các bạn phòng CNTT, 2:00 PM Phòng CNTT sẽ có cuộc hơp về dự án A với sự miêu tả của anh B. Mong các bạn đến đúng giờ....
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                      Họp
                    </div>
                  </td>
                  <td>
                  Gửi các bạn phòng CNTT, 2:00 PM Phòng CNTT sẽ có cuộc hơp về dự án A với sự miêu tả của anh B. Mong các bạn đến đúng giờ....
                  </td>
                  <td>09:15</td>
                </tr>
              </tbody>
            </table>
            <div className="content-bottom">
                <Pagination defaultCurrent={1} total={150} />
            </div>
          </div>
        </div>
        )
    }
}
