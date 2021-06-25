import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tag,
} from "antd";
import moment from "moment";
import React from "react";
import { formatDateNumber } from "../../../helpers/FuncHelper";
const { RangePicker } = DatePicker;

const { Option } = Select;
const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const Training = (props) => {
  const { tra_type, tra_time_from, tra_time_to, tra_note,
     tra_school_name, tra_study_time, tra_majors, tra_study_mode, tra_diploma, tra_address } = props.dataItem;
  const renderData = (data) => {
    return data.map((item) => {
      return (
        <li key={item.id}>
          <div className="personal-history-time">
            {formatDateNumber(item.tra_time_from, dateFormatList[0])} -{" "}
            <span>
              {" "}
              {formatDateNumber(item.tra_time_to, dateFormatList[0])}
            </span>
          </div>
          <Space size="middle">
            <Popconfirm
              title="Bạn có muốn xóa không ?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => props.handleOkDelete(item)}
            >
              <Tag color="volcano" className="table-action">
                Xoá
              </Tag>
            </Popconfirm>
            <Tag
              color="geekblue"
              className="table-action"
              onClick={() => props.handleUpdate(item)}
            >
              Cập nhật
            </Tag>
          </Space>
          <p style = {{marginTop:"4px"}} className="personal-history-content">Tên trường: {item.tra_school_name}</p>
          <p className="personal-history-content">Địa chỉ: {item.tra_address}</p>
          <p className="personal-history-content">Chuyên ngành: {item.tra_majors}</p>
          <p className="personal-history-content">Chế độ học: {item.tra_study_mode}</p>
          <p className="personal-history-content">Văn bằng, chứng chỉ: {item.tra_diploma}</p>
          <p className="personal-history-content">Ghi chú: {item.tra_note}</p>
        </li>
      );
    });
  };
  return (
    <div className="edit-infor-form">
      <div className="tabs-main personal-history">
        <div className="btn-btn-profile">
          <Button
            onClick={() => props.showModal(1)}
            className="btn-add-detail"
            icon={<PlusCircleOutlined />}
          >
            Thêm
          </Button>
        </div>
        <div className="personal-history-title">Đào tạo</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">
            {renderData(props.dataTraining)}
          </ul>
        </div>
      </div>
      <div className="tabs-main personal-history">
        <div className="personal-history-title">Bồi dưỡng</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">
            {renderData(props.dataTraining2)}
          </ul>
        </div>
      </div>
      <Modal
        title="Nhập thông tin"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.hideModal}
        okText="OK"
        cancelText="Cancel"
        width={631}
      >
        <form
          style={{ width: "100%" }}
          className="tabs-main"
          noValidate
          method="post"
        >
          <ul>
          <li  className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Từ ngày</span>
              <div className="tabs-user-infor-bottom">
                <RangePicker
                  separator
                  placeholder={["Từ ngày", "Đến ngày"]}
                  value={
                    tra_time_from
                      ? [
                          moment(
                            tra_time_from,
                            dateFormatList[0]
                          ),
                          moment(tra_time_to, dateFormatList[0]),
                        ]
                      : null
                  }
                  className="modal-ranPicker"
                  format={dateFormatList}
                  onChange={(date, dateString) =>
                    props.onChangeRange(
                      date,
                      dateString,
                      "deg_begin_study",
                      "deg_end_study"
                    )
                  }
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                <Select
                  onChange={props.handleChange}
                  className="modal-selection"
                  value={tra_type == 1 ? "1" : "2"}
                  style={{ width: 527 }}
                >
                  <Option value="1">Đào tạo</Option>
                  <Option value="2">Bồi dưỡng</Option>
                </Select>
              </div>
            </li>
            <li style={{ width: "265px" }} className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Tên trường</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="tra_school_name"
                  value = {tra_school_name}
                  onChange={props.onChange}
                  placeholder="Tên trường"
                />
              </div>
            </li>
            <li style={{ width: "265px" }} className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Địa chỉ</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="tra_address"
                  value = {tra_address}
                  onChange={props.onChange}
                  placeholder="Địa chỉ"
                />
              </div>
            </li>
            <li style={{ width: "265px" }} className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Chuyên ngành</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="tra_majors"
                  value = {tra_majors}
                  onChange={props.onChange}
                  placeholder="Chuyên ngành"
                />
              </div>
            </li>
            <li style={{ width: "265px" }} className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Chế độ học </span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="tra_study_mode"
                  value = {tra_study_mode}
                  onChange={props.onChange}
                  placeholder="Chế độ học"
                />
              </div>
            </li>
            <li style={{ width: "265px" }} className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Văn bằng/ chứng chỉ</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="tra_diploma"
                  value = {tra_diploma}
                  onChange={props.onChange}
                  placeholder="Văn bằng, chứng chỉ"
                />
              </div>
            </li>
        
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Chi tiết</span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  onChange={props.onChange}
                  value={tra_note}
                  name="tra_note"
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

export default Training;
