import React, { useState } from "react";
import { Input } from "antd";
import { Button, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";

import { Space, Tag } from "antd";
const { Option } = Select;
import { Popconfirm, message } from "antd";
const { TextArea } = Input;
let fakeData = [
  {
    id: 1,
    title: "Cha",
    name: "Nguyễn Thị C",
    job: "Giáo Viên",
    content: "",
  },
  {
    id: 2,
    title: "Mẹ",
    name: "Nguyễn Thị D",
    job: "Kỹ sư cầu đường",
    content: "",
  },
  {
    id: 2,
    title: "Em trai",
    name: "Nguyễn Văn E",
    job: "Học sinh",
    content: "",
  },
];
const Family = () => {
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const showModal = () => {
    setDataItem({});
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    setDataItem(value);
  };
  const onSubmit = () => {};
  const renderData = () => {
    return fakeData.map((item) => {
      return (
        <li key={item.id}>
          <div className="personal-history-time">
            {item.title} : {item.name}
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
            <Tag
              color="geekblue"
              className="table-action"
              onClick={() => handleUpdate(item)}
            >
              Update
            </Tag>
          </Space>
          <p className="personal-history-content">
            {item.job}
            <p>{item.content}</p>
          </p>
        </li>
      );
    });
  };
  let value = "1";
  if (dataItem && dataItem.title) {
    if (dataItem.title == "Cha") {
      value = "1";
    }
    if (dataItem.title == "Mẹ") {
      value = "2";
    }
    if (dataItem.title == "Em gái") {
      value = "3";
    }
    if (dataItem.title == "Em trai") {
      value = "4";
    }
    if (dataItem.title == "Chị gái") {
      value = "5";
    }
    if (dataItem.title == "Anh trai") {
      value = "6";
    }
  }
  // console.log(value)
  return (
    <div className="edit-infor-form">
      <div className="tabs-main personal-history">
        <div className="btn-btn-profile">
          <Button
            onClick={showModal}
            className="btn-add-detail"
            icon={<PlusCircleOutlined />}
          >
            Thêm
          </Button>
        </div>
        <div className="personal-history-title">Quan hệ thân tộc</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData()}</ul>
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
          onSubmit={onSubmit}
          method="post"
        >
          <ul>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                <Select
                  // value={value}
                  defaultValue={value}
                  className="modal-selection"
                  style={{ width: 527 }}
                  // onChange={handleChange}
                >
                  <Option value="1">Cha </Option>
                  <Option value="2">Mẹ</Option>
                  <Option value="3">Em gái</Option>
                  <Option value="4">Em trai</Option>
                  <Option value="5">Chị gái</Option>
                  <Option value="6">Anh trai</Option>
                </Select>
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Họ và tên:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value={dataItem.name}
                  // defaultValue={ state.pro_religion }
                  placeholder="Họ và tên"
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Nghề nghiệp:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value={dataItem.job}
                  // defaultValue={ state.pro_religion }
                  placeholder="Nghề nghiệp"
                />
              </div>
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top"></span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  value={dataItem.content}
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

export default Family;
