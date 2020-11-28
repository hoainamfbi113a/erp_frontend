import React, { Component } from 'react'
import { Drawer, List, Avatar, Divider, Col, Row, Tabs } from 'antd';
const { TabPane } = Tabs;
import "./Profile.css"
export default class Profile extends Component {
  onClose = () => {
    this.props.onCloseProfile();
  }
  render() {
    const DescriptionItem = ({ title, content }) => (
      <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
      </div>
    );
    return (
      <Drawer
        width={840}
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={this.props.visible}
      >
        <p className="site-description-item-profile-p profile-infor-user" style={{ marginBottom: 24 }}>
          Thông tin nhân viên
          </p>
        {/* <p className="site-description-item-profile-p">Cá nhân</p> */}
        <Row>
          <Col span={12}>
            {/* <DescriptionItem title="Họ và tên" content="Nguyễn Văn A" /> */}
            <span className="profile-infor-user-title" >
              Họ và tên:
              </span>
            <span className="profile-infor-user-content" >
              Nguyễn Văn A
              </span>
          </Col>
          <Col span={12}>
            <span className="profile-infor-user-title" >
              Bút danh:
              </span>
            <span className="profile-infor-user-content" >
              Nguyễn Văn A
              </span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>

            <span className="profile-infor-user-title" >
              Năm sinh:
              </span>
            <span className="profile-infor-user-content" >
              1997
              </span>
          </Col>
          <Col span={12}>
            <span className="profile-infor-user-title" >
              Giới tính:
              </span>
            <span className="profile-infor-user-content" >
              Nam
              </span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span className="profile-infor-user-title" >
              Nơi sinh:
              </span>
            <span className="profile-infor-user-content" >
              Bệnh viện Cần giuộc, tỉnh Long An
              </span>
          </Col>
          <Col span={12}>
            <span className="profile-infor-user-title" >
              Quê quán:
              </span>
            <span className="profile-infor-user-content" >
              Cần giuộc, tỉnh Long An
              </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span className="profile-infor-user-title" >
              Chi tiết:
              </span>
            <span className="profile-infor-user-content" >
              Không có gì để nói
              </span>
          </Col>
        </Row>
        <Divider />
        <Tabs>
          <TabPane tab="Thông tin chung" key="1">
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    HỌ VÀ TÊN:
                    </span>
                  <span className="profile-infor-user-content" >
                    Nguyễn Văn A
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    BÚT DANH:
                    </span>
                  <span className="profile-infor-user-content" >
                    Nguyễn Văn A
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    NĂM SINH:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    GIỚI TÍNH:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    NƠI SINH:
                    </span>
                  <span className="profile-infor-user-content" >
                    Bệnh viện Cần Giuộc, huyện Cần Giuộc, tỉnh Long An
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    QUÊ QUÁN
                    </span>
                  <span className="profile-infor-user-content" >
                    Ấp hoà thuậ II, thị trấn Cần Giuộc, huyện Cần Giuộc, tỉnh Long An
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    DÂN TỘC
                    </span>
                  <span className="profile-infor-user-content" >
                    Kinh
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    TÔN GIÁO:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    BỘ PHẬN CÔNG TÁC:
                    </span>
                  <span className="profile-infor-user-content" >
                    Phòng công nghệ thông tin
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    CHỨC VỤ:
                    </span>
                  <span className="profile-infor-user-content" >
                    Nhân viên phòng công nghệ thông tin
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    NGÀY BỔ NHIỆM:
                    </span>
                  <span className="profile-infor-user-content" >
                    12/01/1999
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    HỘ KHẨU THƯỜNG TRÚ:
                    </span>
                  <span className="profile-infor-user-content" >
                    60A Hoàng Văn Thụ, quận Phú Nhuận, HCM
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    NƠI Ở HIỆN NAY:
                    </span>
                  <span className="profile-infor-user-content" >
                  60A Hoàng Văn Thụ, quận Phú Nhuận, HCM
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    SỐ CMND/THẺ CĂN CƯỚC CÔNG DÂN:
                    </span>
                  <span className="profile-infor-user-content" >
                    301616354
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    SỐ THẺ NHÀ BÁO:
                    </span>
                  <span className="profile-infor-user-content" >
                    12/01/1999
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    ĐỐI TƯỢNG LAO ĐỘNG:
                    </span>
                  <span className="profile-infor-user-content" >
                    CHÍNH THỨC
                    </span>
                </Col>
            </Row>
          </TabPane>
          <TabPane tab="Quá trình công tác" key="2">
            Content of Tab 2
            <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
                  </TabPane>
          <TabPane tab="Trình độ" key="3">
            Content of Tab 3
            <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
                  </TabPane>
          <TabPane tab="Thông tin thêm" key="4">
            Content of Tab 3
            <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
              <Row>
                <Col span={24}>
                  <span className="profile-infor-user-title" >
                    Chi tiết:
                    </span>
                  <span className="profile-infor-user-content" >
                    Không có gì để nói
                    </span>
                </Col>
            </Row>
                  </TabPane>
        </Tabs>
        {/* <p className="site-description-item-profile-p">Company</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Position" content="Programmer" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Responsibilities" content="Coding" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Department" content="XTech" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                }
              />
            </Col>
          </Row> */}
      </Drawer>
    )
  }
}
