import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { Button, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { getUserFamily, addUserFamily} from "../../../apis/UserProfile/familyApi";

import { Space, Tag } from "antd";
const { Option } = Select;
import { Popconfirm } from "antd";
import docCookies from "doc-cookies";
const { TextArea } = Input;
let fakeData1 = [
  {
    id: 1,
    title: "Nhà",
    content: "123 Phạm Văn Đồng Gò Vấp giá trị 3 tỉ đồng",
  },
];
const Family = () => {
  const user_id = docCookies.getItem("user_id");
  const [visible, setVisible] = useState(false);
  const [dataItem1, setDataItem1] = useState({});
  const [dataItem2, setDataItem2] = useState({});
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async() => {
    const data = await getUserFamily(user_id);
    console.log(data.data);
    setData(data.data)
  }

  const showModal = () => {
    setVisible(true);
    setDataItem1({});
    setDataItem2({});
  };

  const hideModal = () => {
    setVisible(false);
  };
  const [visible1, setVisible1] = useState(false);
  const showModal1 = () => {
    setVisible1(true);
  };
  const handleUpdate1 = (value) => {
    setVisible1(true);
    setDataItem1(value);
  };
  const handleUpdate2 = (value) => {
    setVisible(true);
    setDataItem2(value);
  };

  const hideModal1 = () => {
    setVisible1(false);
  };

  const renderData1 = () => {
    return fakeData1.map((item) => {
      return (
        <li key={item.id}>
          <div className="personal-history-time">{item.title}</div>
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
              onClick={() => handleUpdate1(item)}
            >
              Update
            </Tag>
          </Space>
          <p className="personal-history-content">{item.content}</p>
        </li>
      );
    });
  };
  const renderData2 = () => {
    if(data) {
      return data.map((item) => {
        return (
          <li>
            <div className="personal-history-time">
              {item.rem_relationship} : {item.rem_full_name}
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
                onClick={() => handleUpdate2(item)}
              >
                Update
              </Tag>
            </Space>
            <p className="personal-history-content">
              {item.rem_job}
            </p>
          </li>
        );
      });
    } else {
      null
    }
  };

  return (
    <div className="edit-infor-form">
      <div className="tabs-main personal-history">
      <div className="btn-btn-profile">
          <Button
            onClick={showModal1}
            className="btn-add-detail"
            icon={<PlusCircleOutlined />}
          >
            Thêm
          </Button>
        </div>
        <div className="personal-history-title">Tài sản</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData1()}</ul>
        </div>
      </div>
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
        <div className="personal-history-title">Gia đình</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData2()}</ul>
        </div>
      </div>
      <Modal
        title="Nhập thông tin"
        visible={visible1}
        onOk={hideModal1}
        onCancel={hideModal1}
        okText="OK"
        cancelText="Cancel"
        width={631}
      >
        <form
          style={{ width: "100%" }}
          className="tabs-main"
          noValidate
          // onSubmit={this.onSubmit}
          method="post"
        >
          <ul style = {{width:"100%"}}>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Tên tài sản:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  value = {dataItem1.title} 
                  name="pro_religion"
                  style={{ width: "100%" }}
                  // defaultValue={ state.pro_religion }
                  placeholder=""
                />
              </div>
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top"></span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  value = {dataItem1.content} 
                  style={{ width: "100%" }}
                  placeholder="Mời bạn nhập chi tiết"
                  autoSize={{ minRows: 7, maxRows: 15 }}
                />
              </div>
            </li>
          </ul>
        </form>
      </Modal>
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
          // onSubmit={this.onSubmit}
          method="post"
        >
          <ul>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                <Select
                  value={dataItem2.title == "Con" ? "2": "1"}
                  className="modal-selection"
                  style={{ width: 527 }}
                  // onChange={handleChange}
                >
                  <Option value="1">Vợ </Option>
                  <Option value="2">Con</Option>
                </Select>
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Họ và tên:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value = {dataItem2.name}
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
                  value = {dataItem2.job}
                  // defaultValue={ state.pro_religion }
                  placeholder="Nghề nghiệp"
                />
              </div>
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top"></span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  value = {dataItem2.content}
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
