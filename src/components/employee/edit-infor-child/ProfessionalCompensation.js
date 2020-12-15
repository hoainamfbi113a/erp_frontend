import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Radio, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";

import { Table, Space, Tag, Avatar } from 'antd';
const { Option } = Select;
import { Popconfirm, message } from 'antd';
const { TextArea } = Input;
export default class ProfessionalCompensation extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
        <div className="edit-infor-form">
        <div className="tabs-main personal-history">
          <div className="personal-history-title">
          Đào tạo:
          </div>
          <div>
            <div className="edit-infr-vertical-line"></div>
            <ul className="personal-history-list">
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <Space size="middle">
                  <Popconfirm
                    title="Are you sure hide this user?"
                    // onConfirm={() => this.confirm(text)}
                    // onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tag color="volcano" className="table-action">
                      Xoá
                    </Tag>
                  </Popconfirm>
                    <Tag color="geekblue" className="table-action">
                      Sửa {" "}
                    </Tag>
                </Space>
                <p className="personal-history-content">
                CỬ NHÂN Quản Trị Kinh Doanh - Trường Đại Học Kinh tế - Văn bằng 2 - Học từ xa.
                </p>
                
              </li>
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <Space size="middle">
                  <Popconfirm
                    title="Are you sure hide this user?"
                    // onConfirm={() => this.confirm(text)}
                    // onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tag color="volcano" className="table-action">
                      Xoá
                    </Tag>
                  </Popconfirm>
                    <Tag color="geekblue" className="table-action">
                      Sửa {" "}
                    </Tag>
                </Space>
                <p className="personal-history-content">
                CHỨNG CHỈ Quản lý sản phẩm - Quản lý sản phẩm - Trung Tâm Phát Triển Trí Tuệ Việt - Học tập trung.
                </p>
               
              </li>
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <Space size="middle">
                  <Popconfirm
                    title="Are you sure hide this user?"
                    // onConfirm={() => this.confirm(text)}
                    // onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tag color="volcano" className="table-action">
                      Xoá
                    </Tag>
                  </Popconfirm>
                    <Tag color="geekblue" className="table-action">
                      Sửa {" "}
                    </Tag>
                </Space>
                <p className="personal-history-content">
                CỬ NHÂN Luật - Trường Đại Học Luật TP.HCM - Văn bằng 2 - Học từ xa.
                </p>
               
              </li>
            </ul>
            <Button
              onClick={this.showModal}
              className="btn-add-detail"
              icon={<PlusCircleOutlined />}
            >
              Thêm
            </Button>
          
          </div>
        </div>
        <div className="tabs-main personal-history">
          <div className="personal-history-title">
          Bồi dưỡng:
          </div>
          <div>
            <div className="edit-infr-vertical-line"></div>
            <ul className="personal-history-list">
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <Space size="middle">
                  <Popconfirm
                    title="Are you sure hide this user?"
                    // onConfirm={() => this.confirm(text)}
                    // onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tag color="volcano" className="table-action">
                      Xoá
                    </Tag>
                  </Popconfirm>
                    <Tag color="geekblue" className="table-action">
                      Sửa {" "}
                    </Tag>
                </Space>
                <p className="personal-history-content">
                Lớp học A
                </p>
              
              </li>
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <Space size="middle">
                  <Popconfirm
                    title="Are you sure hide this user?"
                    // onConfirm={() => this.confirm(text)}
                    // onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tag color="volcano" className="table-action">
                      Xoá
                    </Tag>
                  </Popconfirm>
                    <Tag color="geekblue" className="table-action">
                      Sửa {" "}
                    </Tag>
                </Space>
                <p className="personal-history-content">
                Lớp học B
                </p>
             
              </li>
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <Space size="middle">
                  <Popconfirm
                    title="Are you sure hide this user?"
                    // onConfirm={() => this.confirm(text)}
                    // onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tag color="volcano" className="table-action">
                      Xoá
                    </Tag>
                  </Popconfirm>
                    <Tag color="geekblue" className="table-action">
                      Sửa {" "}
                    </Tag>
                </Space>
                <p className="personal-history-content">
                Lớp học C
                </p>
               
              </li>
            </ul>
            <Button
              onClick={this.showModal}
              className="btn-add-detail"
              icon={<PlusCircleOutlined />}
            >
              Thêm
            </Button>
          
          </div>
        </div>
        <Modal
              title="Nhập thông tin"
              visible={this.state.visible}
              onOk={this.hideModal}
              onCancel={this.hideModal}
              okText="OK"
              cancelText="Cancel"
              width={577}
            >
              <form
                style={{ width: "100%" }}
                className="tabs-main"
                noValidate
                onSubmit={this.onSubmit}
                method="post"
              >
                <ul>
                  <li className="tabs-main-left-li tabs-main-left-li-row">
                    <span className="tabs-user-infor-top">Thông tin</span>
                    <div className="tabs-user-infor-bottom">
                      <Select
                        className="modal-selection"
                        defaultValue="jack"
                        style={{ width: 527 }}
                        // onChange={handleChange}
                      >
                        <Option value="jack">Lịch sử bản thân</Option>
                        <Option value="lucy">Gia nhập đảng cộng sản</Option>
                        <Option value="disabled">
                          Tham gia các tổ chức chính trị xã hội
                        </Option>
                        <Option value="educate">Đào tạo</Option>
                        <Option value="fostering">bồi dưỡng</Option>
                        <Option value="bonus">Khen thưởng</Option>
                        <Option value="discipline">Kỷ luật</Option>
                      </Select>
                    </div>
                  </li>
                  <li className="tabs-main-left-li tabs-main-left-li-row">
                    <span className="tabs-user-infor-top">Từ ngày</span>
                    <div className="tabs-user-infor-bottom">
                      <RangePicker className="modal-ranPicker"
                      placeholder="Chọn ngày" />
                    </div>
                  </li>
                  <li className="tabs-main-left-li">
                    <span className="tabs-user-infor-top"></span>
                    <div className="tabs-user-infor-bottom">
                    <TextArea placeholder="Mời bạn nhập chi tiết" autoSize={{ minRows: 7, maxRows: 15 }} />
                    </div>
                  </li>
                </ul>
              </form>
            </Modal>
      </div>
    );
  }
}
