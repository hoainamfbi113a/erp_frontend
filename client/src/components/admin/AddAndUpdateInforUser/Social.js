import React, { useState } from "react";
import { Input, Button } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Modal } from "antd";
import { Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Space, Tag } from "antd";
const { Option } = Select;
import { Popconfirm } from "antd";
const { TextArea } = Input;
let fakeData = [
  {
    id: 1,
    title: "Ông nội",
    name: "Nguyễn Thị C",
    job: "Giáo Viên",
    content: "",
  },
  {
    id: 2,
    title: "Bà nội",
    name: "Nguyễn Thị D",
    job: "Kỹ sư cầu đường",
    content: "",
  },
  {
    id: 3,
    title: "Ông ngoại",
    name: "Nguyễn Văn E",
    job: "Đi bán hàng bông",
    content: "",
  },
  {
    id: 4,
    title: "Bà ngoại",
    name: "Nguyễn Văn E",
    job: "Đi bán hàng bông",
    content: "",
  },
];
const Social = () => {
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
  const handleChange = (value) =>{
    if (value == "1") {
      dataItem.title = "Ông nội"
    }
    if (value == "2") {
      dataItem.title = "Bà nội"
    }
    if (value == "3") {
      dataItem.title ="Ông ngoại"
    }
    if (value == "4") {
      dataItem.title = "Bà ngoại"
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
    if (dataItem.title == "Ông nội") {
      value = "1";
    }
    if (dataItem.title == "Bà nội") {
      value = "2";
    }
    if (dataItem.title == "Ông ngoại") {
      value = "3";
    }
    if (dataItem.title == "Bà ngoại") {
      value = "4";
    }
  }
  const onSubmit = () => {};
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
        <div className="personal-history-title">Quan hệ xã hội</div>
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
          // onSubmit={this.onSubmit}
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
                  <Option value="1">Ông nội </Option>
                  <Option value="2">Bà nội</Option>
                  <Option value="3">Ông ngoại</Option>
                  <Option value="4">Bà ngoại</Option>
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
export default Social;
