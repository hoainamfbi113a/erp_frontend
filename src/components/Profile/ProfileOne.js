import React, { Component } from "react";
import { Divider, Col, Row, Tabs, Avatar, Tag } from "antd";
import {
  PhoneOutlined,
  HomeOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import {
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  AppleOutlined
} from "@ant-design/icons";
// import { Row, Col } from 'antd';
const { TabPane } = Tabs;
import "./ProfileOne.css";
export default class ProfileOne extends Component {
  render() {
    return (
      <div style={{ height: "calc(100vh - 139px)" }}>
        <Row className="profile-content-main" justify="space-around">
          <Col span={6} className="profile-content gutter-row">
            <p
              className="site-description-item-profile-p profile-infor-user"
              style={{ marginBottom: 24 }}
            >
              THÔNG TIN NHÂN VIÊN
            </p>
            <div className="profile-infor-main">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <h3 className="profileone-name">Nguyễn Hoài Nam</h3>
              <span className="profile-job">Nhân viên phòng CNTT</span>
            </div>
            <Row className="profile-information-priority">
              <Col span={24}>
                <PhoneOutlined twoToneColor="#eb2f96" />
                <span className="profile-infor-user-title-left">
                  Số điện thoại:
                </span>
                <span className="profile-infor-user-content">
                  0999999999999
                </span>
              </Col>
            </Row>
            <Row className="profile-information-priority">
              <Col span={24}>
                <ContactsOutlined twoToneColor="#eb2f96" />
                <span className="profile-infor-user-title-left">Email:</span>
                <span className="profile-infor-user-content">
                  nguyeenxhoaifnam@gmail.com
                </span>
              </Col>
            </Row>
            <Row className="profile-information-priority">
              <Col span={24}>
                <HomeOutlined twoToneColor="#eb2f96" />
                <span className="profile-infor-user-title-left">
                  Địa chỉ liên hệ:
                </span>
                <span className="profile-infor-user-content">
                  60A, Hoàng Văn Thụ, quận Phú Nhuận, thành phố HCM
                </span>
              </Col>
            </Row>
            <div className="ant-divider ant-divider-horizontal ant-divider-dashed" role="separator"></div>
            <div className="profileone-organization">
              <h4>ĐẢNG, ĐOÀN VIÊN</h4>
              <div className="profile-organization-list">
                <Tag>Đảng viên</Tag>
                <Tag>Đoàn viên</Tag>
                <Tag>Hội nhà báo</Tag>
                <Tag>hội nhà văn</Tag>
              </div>
            </div>
            <Divider />
          </Col>
          <Col span={17} className="profile-content">
            <Tabs type="card">
              <TabPane tab={
                <span>
                  <AppleOutlined />
                Thông tin chung
              </span>
              } key="1" >
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"><ContactsOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />HỌ VÀ TÊN:</span>
                    <span className="profile-infor-user-content">
                      Nguyễn Văn A
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />BÚT DANH:</span>
                    <span className="profile-infor-user-content">
                      Nguyễn Văn A
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <ContactsOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />NĂM SINH:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />GIỚI TÍNH:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />NƠI SINH:</span>
                    <span className="profile-infor-user-content">
                      Bệnh viện Cần Giuộc, huyện Cần Giuộc, tỉnh Long An
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <ContactsOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />QUÊ QUÁN</span>
                    <span className="profile-infor-user-content">
                      Ấp hoà thuậ II, thị trấn Cần Giuộc, huyện Cần Giuộc, tỉnh
                      Long An
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />DÂN TỘC</span>
                    <span className="profile-infor-user-content">Kinh</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <ContactsOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />TÔN GIÁO:</span>
                    <span className="profile-infor-user-content">Không có</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />
                      BỘ PHẬN CÔNG TÁC:
                    </span>
                    <span className="profile-infor-user-content">
                      Phòng công nghệ thông tin
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <ContactsOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />CHỨC VỤ:</span>
                    <span className="profile-infor-user-content">
                      Nhân viên phòng công nghệ thông tin
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />
                      NGÀY BỔ NHIỆM:
                    </span>
                    <span className="profile-infor-user-content">
                      24/01/1999
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />
                      HỘ KHẨU THƯỜNG TRÚ:
                    </span>
                    <span className="profile-infor-user-content">
                      60A Hoàng Văn Thụ, quận Phú Nhuận, HCM
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <ContactsOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />
                      NƠI Ở HIỆN NAY:
                    </span>
                    <span className="profile-infor-user-content">
                      60A Hoàng Văn Thụ, quận Phú Nhuận, HCM
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />
                      SỐ CMND/THẺ CĂN CƯỚC CÔNG DÂN:
                    </span>
                    <span className="profile-infor-user-content">
                      301616354
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <ContactsOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />
                      SỐ THẺ NHÀ BÁO:
                    </span>
                    <span className="profile-infor-user-content">
                      12/01/1999
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title-right"> <HomeOutlined twoToneColor="#eb2f96" style={{marginRight:'5px'}} />
                      ĐỐI TƯỢNG LAO ĐỘNG:
                    </span>
                    <span className="profile-infor-user-content">
                      CHÍNH THỨC
                    </span>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab={
                <span>
                  <AppleOutlined />
                Quá trình công tác
              </span>
              } key="2" >
                Content of Tab 2
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">NGÀY VÀO BÁO:</span>
                    <span className="profile-infor-user-content">
                      12/11/1998
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">NGÀY HỢP ĐỒNG LAO ĐỘNG</span>
                    <span className="profile-infor-user-content">
                      12/11/1998
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">NGÀY HỢP ĐỒNG TẬP SỰ</span>
                    <span className="profile-infor-user-content">
                      12/11/1998
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">NGÀY TUYỂN DỤNG CHÍNH THỨC</span>
                    <span className="profile-infor-user-content">
                      12/11/1998
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">DIỄN BIẾN QUÁ TRÌNH CÔNG TÁC</span>
                    <span className="profile-infor-user-content">
                      12/11/1998
                    </span>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab={
                <span>
                  <AppleOutlined />
                Trình độ
              </span>
              } key="3" >
                Content of Tab 3
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">VĂN HOÁ</span>
                    <span className="profile-infor-user-content">
                      12/12
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">CHUYÊN MÔN: </span>
                    <span className="profile-infor-user-content">
                      Kỹ sư
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">CHÍNH TRỊ</span>
                    <span className="profile-infor-user-content">
                      Cao cấp
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">NGOẠI NGỮ:</span>
                    <span className="profile-infor-user-content">
                      Tiếng anh
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">TRÌNH ĐỘ NGOẠI NGỮ:</span>
                    <span className="profile-infor-user-content">
                      Bằng A
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">CHỨNG CHỈ KHÁC:</span>
                    <span className="profile-infor-user-content">
                      Không có
                    </span>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab={
                <span>
                  <AppleOutlined />
                Thông tin thêm
              </span>
              } key="4" >
                Content of Tab 4
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">ĐI NƯỚC NGOÀI:</span>
                    <span className="profile-infor-user-content">
                      NHẬT BẢN
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">Chi tiết:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">Chi tiết:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">Chi tiết:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">Chi tiết:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">Chi tiết:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">Chi tiết:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">Chi tiết:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span className="profile-infor-user-title">Chi tiết:</span>
                    <span className="profile-infor-user-content">
                      Không có gì để nói
                    </span>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
