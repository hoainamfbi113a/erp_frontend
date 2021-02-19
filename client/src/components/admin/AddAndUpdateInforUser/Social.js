import React, { useState } from "react";
import { Input,Button } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Modal } from "antd";
import { Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Space, Tag } from "antd";
const { Option } = Select;
import { Popconfirm } from "antd";
const { TextArea } = Input;
const Social = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const onSubmit = () => {};
  return (
    <div className="edit-infor-form">
      <div className="tabs-main personal-history">
        <div className="personal-history-title">Quan hệ xã hội</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">
            <li>
              <div className="personal-history-time">Ông nội</div>
              <Space size="middle">
                <Popconfirm
                  title="Are you sure hide this user?"
                  okText="Yes"
                  cancelText="No"
                >
                  <Tag color="volcano" className="table-action">
                    Xoá
                  </Tag>
                </Popconfirm>
                <Tag color="geekblue" className="table-action">
                  Update{" "}
                </Tag>
              </Space>
              <p className="personal-history-content">
                Nguyễn Văn A sinh năm 1975
              </p>
            </li>
            <li>
              <div className="personal-history-time">Bà Nội</div>
              <Space size="middle">
                <Popconfirm
                  title="Are you sure hide this user?"
                  okText="Yes"
                  cancelText="No"
                >
                  <Tag color="volcano" className="table-action">
                    Xoá
                  </Tag>
                </Popconfirm>
                <Tag color="geekblue" className="table-action">
                  Update{" "}
                </Tag>
              </Space>
              <p className="personal-history-content">
                Nguyễn Thị C Sinh ngày 20/11/1998 quê HCM, Nghề ngiệp học sinh
                trường thpt Cần Giuộc
              </p>
            </li>
            <li>
              <div className="personal-history-time">Ông</div>
              <Space size="middle">
                <Popconfirm
                  title="Are you sure hide this user?"
                  okText="Yes"
                  cancelText="No"
                >
                  <Tag color="volcano" className="table-action">
                    Xoá
                  </Tag>
                </Popconfirm>
                <Tag color="geekblue" className="table-action">
                  Update{" "}
                </Tag>
              </Space>
              <p className="personal-history-content">
                Nguyễn Văn C Sinh ngày 20/11/1998 quê HCM, Nghề ngiệp học sinh
                trường thpt Cần Giuộc
              </p>
            </li>
          </ul>
          <Button
            onClick={showModal}
            className="btn-add-detail"
            icon={<PlusCircleOutlined />}
          >
            Thêm
          </Button>
        </div>
      </div>
      <Modal
        title="Nhập thông tin"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="OK"
        cancelText="Cancel"
        width={577}
      >
        <form
          style={{ width: "100%" }}
          className="tabs-main"
          noValidate
          // onSubmit={this.onSubmit}
          method="post"
        >
          <ul>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                <Select
                  className="modal-selection"
                  defaultValue="educate"
                  style={{ width: 527 }}
                  // onChange={handleChange}
                >
                  <Option value="jack">Nhà</Option>
                  <Option value="lucy">Gia đình</Option>
                  <Option value="disabled">Quan hệ gia đình</Option>
                  <Option value="educate">Quan hệ xã hội</Option>
                </Select>
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Từ ngày</span>
              <div className="tabs-user-infor-bottom">
                <RangePicker
                  className="modal-ranPicker"
                  placeholder="Chọn ngày"
                />
              </div>
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top"></span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  placeholder="Mời bạn nhập chi tiết"
                  autoSize={{ minRows: 7, maxRows: 15 }}
                />
              </div>
            </li>
          </ul>
        </form>
      </Modal>
    </div>
  );
};
export default Social;
