import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination } from "antd";

import "../Content.css";
import "./notification.css"
export default class ContentNotification extends Component {
  render() {
    return (
      <div >
        <div className="content-background2">
          <div style={{minHeight:'10vh'}} className="content-main">
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
                    khám sức khỏe tổng quát cho cán bộ nhân viên và người lao
                    động (CBNV) trong 2 ngày...
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
                  Kính gửi Cán bộ nhân viên, Ngày 20/11/2020 là ngày lễ thành hôn của a ABC phòng ban... với chị BCA được tổ chức tại Ấp, Xã, Huyện Tĩn h...
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
                  Chào anh em, Được tin bà ngoại của A mất sáng nay, lên đang lên kế hoạch đi đám tang vào sáng mai 28-08 ở B. Để chia sẻ sự mất mát này, phòng mình sẽ.....
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
                    khám sức khỏe tổng quát cho cán bộ nhân viên và người lao
                    động (CBNV) trong 2 ngày...
                  </td>
                  <td>09:15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="content-background2">
          <div style={{minHeight:'10vh'}} className="content-main">
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
          </div>
        </div>
        <div className="content-background2">
          <div style={{minHeight:'10vh'}} className="content-main">
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
                  10h 
                  </td>
                  <td>09:15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="content-background2">
          <div style={{minHeight:'10vh'}} className="content-main">
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
                  Hoàn thành thông tin nhân viên
                  </td>
                  <td>09:15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
