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

const History = ({
  dataHistory,
  showModal,
  hideModal,
  handleUpdate,
  visible,
  dataItem,
  onChange,
  handleOk,
  handleDelete,
  onChangeRange,
  namination,
}) => {
  const renderData = () => {
    if (dataHistory.length) {
      return dataHistory.map((item) => {
        return (
          <li key={item.id}>
            <div className="personal-history-time">
              {formatDateNumber(item.his_work_from, dateFormatList[0])} -{" "}
              <span>
                {" "}
                {formatDateNumber(item.his_work_to, dateFormatList[0])}
              </span>
            </div>
            <Space size="middle">
              <Popconfirm
                title="Bạn có muốn xóa không ?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDelete(item.id)}
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
                Cập nhật
              </Tag>
            </Space>
            <p className="personal-history-content">{item.his_work_place}</p>
            <p className="personal-history-content">
              {item.his_working_process}
            </p>
            <p className="personal-history-content">{item.his_note}</p>
          </li>
        );
      });
    } else {
      null;
    }
  };
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
        <div className="personal-history-title">
          Quá trình {namination}
        </div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData()}</ul>
        </div>
      </div>
      <Modal
        title="Nhập thông tin"
        visible={visible}
        onOk={handleOk}
        onCancel={hideModal}
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
            {/* <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                <Select
                  onChange={handleChange}
                  className="modal-selection"
                  value={reward.type == 1 ? "1" : "2"}
                  style={{ width: 527 }}
                >
                  <Option value="1">Khen thưởng</Option>
                  <Option value="2">Kỷ luật</Option>
                </Select>
              </div>
            </li> */}
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Nơi {namination}</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="his_work_place"
                  onChange={onChange}
                  value={dataItem.his_work_place}
                  placeholder="Mời bạn nhập trường học"
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Từ ngày</span>
              <div className="tabs-user-infor-bottom">
                <RangePicker
                  placeholder={["Từ ngày", "Đến ngày"]}
                  value={
                    dataItem.his_work_from
                      ? [
                          moment(dataItem.his_work_from, dateFormatList[0]),
                          moment(dataItem.his_work_to, dateFormatList[0]),
                        ]
                      : null
                  }
                  className="modal-ranPicker"
                  format={dateFormatList}
                  onChange={(date, dateString) =>
                    onChangeRange(
                      date,
                      dateString,
                      "deg_begin_study",
                      "deg_end_study"
                    )
                  }
                />
              </div>
            </li>

            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Quá trình {namination}</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="his_working_process"
                  onChange={onChange}
                  value={dataItem.his_working_process}
                  placeholder="Mời bạn nhập quá trình học tập"
                />
              </div>
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Ghi chú</span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  name="his_note"
                  onChange={onChange}
                  value={dataItem.his_note}
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

export default History;
