import React, { useState } from "react";
import { Input } from "antd";
import { Button, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";

import { Space, Tag } from "antd";
const { Option } = Select;
import { Popconfirm } from "antd";
const { TextArea } = Input;
const Bonus = (props) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
      setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const onSubmit = () =>{
    
  }
  return (
    <div className="edit-infor-form">
      <div className="tabs-main personal-history">
        <div className="personal-history-title">Khen thưởng</div>
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
              <p className="personal-history-content">Lao Động Tiên Tiến</p>
            </li>
            <li>
              <div className="personal-history-time">
                05/09/1990 - 10/05/1995
              </div>
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
              <p className="personal-history-content">Lao Động Xuất Sắc</p>
            </li>
            <li>
              <div className="personal-history-time">
                05/09/1990 - 10/05/1995
              </div>
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
              <p className="personal-history-content">Lao Động Xuất Sắc</p>
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
      <div className="tabs-main personal-history">
        <div className="personal-history-title">Kỷ luật:</div>
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
              <p className="personal-history-content">Kỷ luật 1</p>
            </li>
            <li>
              <div className="personal-history-time">
                05/09/1990 - 10/05/1995
              </div>
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
              <p className="personal-history-content">Kỷ luật 2</p>
            </li>
            <li>
              <div className="personal-history-time">
                05/09/1990 - 10/05/1995
              </div>
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
              <p className="personal-history-content">Kỷ luật 3</p>
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
          // onSubmit={onSubmit}
          method="post"
        >
          <ul>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                <Select
                  className="modal-selection"
                  defaultValue="bonus"
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
                <RangePicker
                  className="modal-ranPicker"
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

export default Bonus;