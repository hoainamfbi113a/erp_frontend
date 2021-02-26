import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination } from "antd";
import "./notification.css"
export default class NotifiDepartment extends Component {
    render() {
        return (
          <div className="content-background2">
          <div style={{minHeight:'70vh'}} className="content-main">
            <div className="content-top">
              <div className="content-top-left content-notification">
                <div className="content-top-left-sum-item">Thông tin phòng ban</div>
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
                    team building
                    </div>
                  </td>
                  <td className="content-notification-unread">
                  Team buiding tại Cần Giờ
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                    Quỹ phòng
                    </div>
                  </td>
                  <td className="content-notification-unread">
                  Nộp tiền quỹ phòng tháng 12/2020, Hạn cuối 10/12/2020
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                    Cấp SSD
                    </div>
                  </td>
                  <td className="content-notification-unread"> 
                  Cấp SSD cho các bạn, A,B,C,D
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
                  Anh em vệ sinh chổ ngồi để chấm điểm cuối năm.
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <div className="content-notification-table-btn">
                    Hội ý
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
                    Hội ý
                    </div>
                  </td>
                  <td>
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
