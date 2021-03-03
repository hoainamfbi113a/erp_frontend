import React, { useState } from "react";
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Radio, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Table, Space, Tag, Avatar } from "antd";
import { Popconfirm, message } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const PersonalHistory = (props) => {
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
        <div className="personal-history-title">
          Quá trình học tập và làm việc
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
                Học sinh Trường Tiểu Học Nguyễn Hữu A
              </p>
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
              <p className="personal-history-content">
                Học sinh Trường Tiểu Học Nguyễn Hữu A
              </p>
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
              <p className="personal-history-content">
                Học sinh Trường Tiểu Học Nguyễn Hữu A
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
              onSubmit={onSubmit}
              method="post"
            >
              <ul>
                <li className="tabs-main-left-li tabs-main-left-li-row">
                  <span className="tabs-user-infor-top">Thông tin</span>
                  <div className="tabs-user-infor-bottom">
                  <p>Lịch sử bản thân</p>
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
      </div>
    </div>
  );
};
export default PersonalHistory;
