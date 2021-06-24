import React, { useState } from "react";
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import {  Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";

import { Space, Tag } from "antd";
const { Option } = Select;
import { Popconfirm } from "antd";
const { TextArea } = Input;
import moment from "moment";
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
let fakeData1 = [
  {
    id: 1,
    category:1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "CỬ NHÂN Quản Trị Kinh Doanh - Trường Đại Học Kinh tế - Văn bằng 2 - Học từ xa.",
  },
  {
    id: 2,
    category:1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "CHỨNG CHỈ Quản lý sản phẩm - Quản lý sản phẩm - Trung Tâm Phát Triển Trí Tuệ Việt - Học tập trung.",
  },
  {
    id: 3,
    category:1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "CỬ NHÂN Luật - Trường Đại Học Luật TP.HCM - Văn bằng 2 - Học từ xa.",
  },
];
let fakeData2 = [
  {
    id: 1,
    category:2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Lớp học A",
  },
  {
    id: 2,
    category:2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Lớp học B",
  },
  {
    id: 3,
    category:2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Lớp học C",
  },
];
const ProfessionalCompensation = () => {
    const [visible, setVisible] = useState(false);
    const [dataItem, setDataItem] = useState({})
    // const [dataItem2, setDataItem2] = useState({})
    const showModal = (value) => {
      console.log(value)
      if(value == 1){
        setDataItem({category:1})
      }
      else {
        setDataItem({category:2})
      }
      setVisible(true);
    };

   const hideModal = () => {
      setVisible(false);
    };
    const onSubmit = () =>{
    
    }
    const handleUpdate = (value) => {
      setVisible(true);
      setDataItem(value)
    };
    const renderData1 = () =>{
      return fakeData1.map((item)=>{
        return(
        <li key = {item.id}>
        <div className="personal-history-time">
         {item.dateStart} - <span> {item.dateStart}</span>
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
            onClick={()=>handleUpdate(item)}
          >
            Update
          </Tag>
        </Space>
        <p className="personal-history-content">
          {item.content}
        </p>
      </li> 
      )
      })
    }
    const renderData2 = () =>{
      return fakeData2.map((item)=>{
        return(
        <li key = {item.id}>
        <div className="personal-history-time">
         {item.dateStart} - <span> {item.dateStart}</span>
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
            onClick={()=>handleUpdate(item)}
          >
            Update
          </Tag>
        </Space>
        <p className="personal-history-content">
          {item.content}
        </p>
      </li> 
      )
      })
    }
  return (
    <div className="edit-infor-form">
      <div className="tabs-main personal-history">
      <div className="btn-btn-profile">
          <Button
            onClick={()=>showModal(1)}
            className="btn-add-detail"
            icon={<PlusCircleOutlined />}
          >
            Thêm
          </Button>
        </div>
        <div className="personal-history-title">Đào tạo:</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">
          {renderData1()}
          </ul>
        </div>
      </div>
      <div className="tabs-main personal-history">
        <div className="personal-history-title">Bồi dưỡng:</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">
          {renderData2()}
          </ul>
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
                {/* {console.log(dataItem.category)} */}
                <Select
                  className="modal-selection"
                  value={dataItem.category === 2 ? "2": "1"}
                  style={{ width: 527 }}
                  // onChange={handleChange}
                >
                  <Option value="1">Đào tạosdfjkdsf </Option>
                  <Option value="2">Bồi dưỡng</Option>

                </Select>
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Tên trường</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value={dataItem.job}
                  placeholder="Tên trường"
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Địa chỉ</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value={dataItem.job}
                  placeholder="Địa chỉ"
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Chuyên ngành</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value={dataItem.job}
                  placeholder="Tên trường"
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Chuyên ngành</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value={dataItem.job}
                  placeholder="Tên trường"
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Chế độ học </span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value={dataItem.job}
                  placeholder="Chế độ học"
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Văn bằng</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="pro_religion"
                  value={dataItem.job}
                  placeholder="Chứng chỉ"
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Từ ngày</span>
              <div className="tabs-user-infor-bottom">
                <RangePicker
                format={dateFormatList}
                placeholder = {["Từ ngày", "Đến ngày"]}
                 value={dataItem.dateStart ? [moment(
                  dataItem.dateStart,
                  dateFormatList[0]
                ),moment(
                  dataItem.dateEnd,
                  dateFormatList[0]
                )] : null}
                  className="modal-ranPicker"
                />
              </div>
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top"></span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  value = {dataItem.content} 
                  placeholder="Mời bạn nhập chi tiết"
                  autoSize={{ minRows: 7, maxRows: 15 }}
                />
              </div>
            </li>
          </ul>
        </form>
      </Modal>
    </div>
    // <div>sdfsdfsdf</div>
  );
};
export default ProfessionalCompensation;


