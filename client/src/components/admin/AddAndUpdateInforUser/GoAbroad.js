import {
  PlusCircleOutlined,
  LikeTwoTone,
  DislikeTwoTone,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tag,
  Radio,
} from "antd";
import moment from "moment";
import React, { Fragment } from "react";
import { formatDateNumber, convertCurrency } from "../../../helpers/FuncHelper";
import NumericInput from "../../../helpers/NumericInput";
const { RangePicker } = DatePicker;
const { Option } = Select;

const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const GoAbroad = ({
  dataAbroad,
  showModal,
  hideModal,
  err,
  handleUpdate,
  visible,
  dataItem,
  onChange,
  handleOk,
  handleDelete,
  onChangeRange,
  go_purpose,
  setPurpose,
  go_expense,
  setExpense,
}) => {

  const onChangeNum = (value) => {
    setExpense(value);
  };

  const renderData = () => {
    if (dataAbroad.length) {
      return dataAbroad.map((item) => {
        return (
          <li key={item.id}>
            <div
              className="personal-history-time"
              style={{ marginBottom: "1rem", fontSize: "large" }}
            >
              Từ ngày {formatDateNumber(item.go_time, dateFormatList[0])} đến
              ngày {formatDateNumber(item.go_time_comeback, dateFormatList[0])}
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
            <p className="personal-history-content">
              Mục đích chuyến đi: {item.go_purpose}
            </p>
            {item.go_purpose === "Công tác" ? (
              <div>
                <p className="personal-history-content">
                  Đơn vị mời: {item.go_inviting_unit}
                </p>
                <p className="personal-history-content">
                  Nội dung chuyến đi: {item.go_content}
                </p>
              </div>
            ) : null}
            <p className="personal-history-content">
              Địa điểm đến: {item.go_destination_country}
            </p>

            <p className="personal-history-content">
              Kinh phí chuyến đi: {convertCurrency(item.go_expense)}
            </p>
            <p className="personal-history-content">
              Báo cáo chuyến đi:{" "}
              {item.go_is_reported === 1 ? (
                <Fragment>
                  Đã báo cáo <LikeTwoTone twoToneColor="#52c41a" />
                </Fragment>
              ) : (
                <Fragment>
                  Chưa báo cáo <DislikeTwoTone twoToneColor="#eb2f96" />
                </Fragment>
              )}
            </p>
            <p className="personal-history-content">Ghi chú: {item.go_note}</p>
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
        <div className="personal-history-title">Thêm thông tin</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData()}</ul>
        </div>
      </div>
      <Modal
        title="Nhập thông tin"
        visible={visible}
        onOk={handleOk}
        onCancel={() => {
          hideModal();
          setExpense("");
        }}
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
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thời gian đi</span>
              <div className="tabs-user-infor-bottom">
                <RangePicker
                  placeholder={["Từ ngày", "Đến ngày"]}
                  value={
                    dataItem.go_time
                      ? [
                          moment(dataItem.go_time, dateFormatList[0]),
                          moment(dataItem.go_time_comeback, dateFormatList[0]),
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
              <span className="tabs-user-infor-top">Mục đích chuyến đi</span>
              <div className="tabs-user-infor-bottom">
                {/* <Input
                  style={{ width: "100%" }}
                  name="go_purpose"
                  onChange={onChange}
                  value={dataItem.go_purpose}
                  placeholder="Mời bạn nhập mục đích chuyến đi"
                /> */}
                <Select
                  placeholder="Chọn mục đích chuyến đi"
                  className="modal-selection"
                  value={go_purpose}
                  style={{ width: 527 }}
                  onChange={setPurpose}
                  // onSelect={(value) => setKey(value)}
                >
                  <Option key="1" value="Công tác">
                    Công tác
                  </Option>
                  <Option key="2" value="Du lịch">
                    Du lịch
                  </Option>
                  <Option key="3" value="Thăm thân nhân">
                    Thăm thân nhân
                  </Option>
                  <Option key="4" value="Chữa bệnh">
                    Chữa bệnh
                  </Option>
                </Select>
              </div>
              {err.err_purpose !== "" && !go_purpose ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_purpose}
                </span>
              ) : null}
            </li>

            {go_purpose === "Công tác" ? (
              <div>
                <li className="tabs-main-left-li">
                  <span className="tabs-user-infor-top">Đơn vị mời</span>
                  <div className="tabs-user-infor-bottom">
                    <Input
                      style={{ width: "100%" }}
                      name="go_inviting_unit"
                      onChange={onChange}
                      value={dataItem.go_inviting_unit}
                      placeholder="Mời bạn nhập đơn vị mời"
                    />
                  </div>
                  {err.err_inviting_unit !== "" ? (
                    <span
                      style={{
                        color: "red",
                        fontStyle: "italic",
                      }}
                    >
                      {err.err_inviting_unit}
                    </span>
                  ) : null}
                </li>

                <li className="tabs-main-left-li">
                  <span className="tabs-user-infor-top">
                    Nội dung chuyến đi
                  </span>
                  <div className="tabs-user-infor-bottom">
                    <Input
                      style={{ width: "100%" }}
                      name="go_content"
                      onChange={onChange}
                      value={dataItem.go_content}
                      placeholder="Mời bạn nhập nội dung chuyến đi"
                    />
                  </div>
                  {err.err_content !== "" ? (
                    <span
                      style={{
                        color: "red",
                        fontStyle: "italic",
                      }}
                    >
                      {err.err_content}
                    </span>
                  ) : null}
                </li>
              </div>
            ) : null}

            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Địa điểm đến</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="go_destination_country"
                  onChange={onChange}
                  value={dataItem.go_destination_country}
                  placeholder="Mời bạn nhập nước đến"
                />
              </div>
              {err.err_destination_country !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_destination_country}
                </span>
              ) : null}
            </li>

            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Kinh phí</span>
              <div className="tabs-user-infor-bottom">
                <NumericInput
                  style={{ width: "100%" }}
                  value={go_expense}
                  onChange={onChangeNum}
                  placeholder="Mời bạn nhập kinh phí chuyến đi"
                  suffix="VND"
                />
              </div>
              {err.err_expense !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_expense}
                </span>
              ) : null}
            </li>

            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Báo cáo chuyến đi</span>
              <div className="tabs-user-infor-bottom">
                <Radio.Group
                  name="go_is_reported"
                  onChange={onChange}
                  value={dataItem.go_is_reported}
                >
                  <Radio value={1}>Đã báo cáo</Radio>
                  <Radio value={0}>Chưa báo cáo</Radio>
                </Radio.Group>
              </div>
              {/* {err.err_destination_country !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_destination_country}
                </span>
              ) : null} */}
            </li>

            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Ghi chú</span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  name="go_note"
                  onChange={onChange}
                  value={dataItem.go_note}
                  placeholder="Mời bạn nhập ghi chú"
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

export default GoAbroad;
