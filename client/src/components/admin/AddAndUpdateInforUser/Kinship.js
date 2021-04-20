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
  const [refresh, setRefresh] = useState(true);
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
  const handleChange = (value) =>{
    if (value == "1") {
      dataItem.title = "Cha"
    }
    if (value == "2") {
      dataItem.title = "Mẹ"
    }
    if (value == "3") {
      dataItem.title = "Em gái"
      
    }
    if (value == "4") {
      dataItem.title ="Em trai"
      
    }
    if (value == "5") {
      dataItem.title = "Chị gái"
      
    }
    if ( value == "6") {
      dataItem.title = "Anh trai"
     
    }
    if (value == "7") {
      dataItem.title = "Bác"
    }
    if (value == "8") {
      dataItem.title = "Chú"
      
    }
    if (value == "9") {
      dataItem.title = "Cô"
      
    }
    if ( value == "10") {
      dataItem.title = "Cậu"
    }
    if (value == "11") {
      dataItem.title = "Dì"
    }
    setDataItem(dataItem);
    setRefresh(!refresh)
  }
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
    if (dataItem.title == "Bác") {
      value = "7";
    }
    if (dataItem.title == "Chú") {
      value = "8";
    }
    if (dataItem.title == "Cô") {
      value = "9";
    }
    if (dataItem.title == "Cậu") {
      value = "10";
    }
    if (dataItem.title == "Dì") {
      value = "11";
    }

  }
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
        width={631}
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
                  value={value}
                  className="modal-selection"
                  style={{ width: 527 }}
                  onChange={handleChange}
                >
                  <Option value="1">Cha </Option>
                  <Option value="2">Mẹ</Option>
                  <Option value="3">Em gái</Option>
                  <Option value="4">Em trai</Option>
                  <Option value="5">Chị gái</Option>
                  <Option value="6">Anh trai</Option>
                  <Option value="7">Bác</Option>
                  <Option value="8">Chú</Option>
                  <Option value="9">Cô</Option>
                  <Option value="10">Cậu</Option>
                  <Option value="11">Dì</Option>
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
