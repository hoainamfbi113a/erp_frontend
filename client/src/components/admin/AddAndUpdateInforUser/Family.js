import React from "react";
import { Input } from "antd";
import { Button, DatePicker } from "antd";
import { Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";

import { Space, Tag } from "antd";
const { Option } = Select;
import { Popconfirm } from "antd";

const { TextArea } = Input;

const Family = ({
  dataFamily,
  showModal,
  hideModal,
  handleUpdate,
  visible,
  dataItem,
  onChange,
  setRem,
  handleOk,
  handleDelete,
  rem_relationship,
  namination,
}) => {
  const renderData = () => {
    if (dataFamily.length) {
      return dataFamily.map((item) => {
        return (
          <li key={item.id}>
            <div className="personal-history-time">
              {item.rem_relationship} : {item.rem_full_name}
            </div>
            <Space size="middle">
              <Popconfirm
                title="Are you sure hide this user?"
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
            <p className="personal-history-content">{item.rem_job}</p>
            <p className="personal-history-content">{item.rem_note}</p>
          </li>
        );
      });
    } else {
      null;
    }
  };
  // if (dataFamily.length) {
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
        <div className="personal-history-title">{namination}</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData()}</ul>
        </div>
      </div>

      <Modal
        title={!rem_relationship ? "Thêm thông tin" : "Chỉnh sửa thông tin"}
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
          // onSubmit={this.onSubmit}
          method="post"
        >
          <ul>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                {namination === "Gia đình" ? (
                  <Select
                    placeholder="Chọn quan hệ"
                    className="modal-selection"
                    value={rem_relationship}
                    style={{ width: "35%" }}
                    onChange={setRem}
                  >
                    <Option key="1" value="Vợ">
                      Vợ
                    </Option>
                    <Option key="2" value="Chồng">
                      Chồng
                    </Option>
                    <Option key="3" value="Con">
                      Con
                    </Option>
                  </Select>
                ) : namination === "Quan hệ thân tộc" ? (
                  <Select
                    placeholder="Chọn quan hệ"
                    className="modal-selection"
                    value={rem_relationship}
                    style={{ width: "35%" }}
                    onChange={setRem}
                  >
                    <Option key="1" value="Cha">
                      Cha
                    </Option>
                    <Option key="2" value="Mẹ">
                      Mẹ
                    </Option>
                    <Option key="3" value="Anh trai">
                      Anh trai
                    </Option>
                    <Option key="4" value="Chị gái">
                      Chị gái
                    </Option>
                    <Option key="5" value="Em trai">
                      Em trai
                    </Option>
                    <Option key="6" value="Em gái">
                      Em gái
                    </Option>
                  </Select>
                ) : (
                  <Select
                    placeholder="Chọn quan hệ"
                    className="modal-selection"
                    value={rem_relationship}
                    style={{ width: "35%" }}
                    onChange={setRem}
                  >
                    <Option key="1" value="Ông">
                      Ông
                    </Option>
                    <Option key="2" value="Bà">
                      Bà
                    </Option>
                    <Option key="3" value="Cô">
                      Cô
                    </Option>
                    <Option key="4" value="Dì">
                      Dì
                    </Option>
                    <Option key="5" value="Chú">
                      Chú
                    </Option>
                    <Option key="6" value="Bác">
                      Bác
                    </Option>
                  </Select>
                )}
              </div>
            </li>
            <li style={{ width: "387px" }}
              className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Họ và tên:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  onChange={onChange}
                  name="rem_full_name"
                  value={dataItem.rem_full_name}
                  placeholder="Họ và tên"
                />
              </div>
            </li>

            <li style={{ width: "143px" }}
              className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Sinh năm</span>
              <div className="tabs-user-infor-bottom">
                <DatePicker
                  style={{width: "100%"}}
                  picker="year"
                  placeholder={"Chọn năm"}
                  // value={
                  //   dataItem.his_work_from
                  //     ?
                  //         moment(dataItem.his_work_from, dateFormatList[0])
                  //     : null
                  // }
                  className="modal-ranPicker"
                  // format={dateFormatList}
                  // onChange={(date, dateString) =>
                  //   onChangeRange(
                  //     date,
                  //     dateString,
                  //     "deg_begin_study",
                  //     "deg_end_study"
                  //   )
                  // }
                />
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Nghề nghiệp:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="rem_job"
                  onChange={onChange}
                  value={dataItem.rem_job}
                  placeholder="Nghề nghiệp"
                />
              </div>
            </li>

            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Nơi công tác:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  // name="rem_job"
                  // onChange={onChange}
                  // value={dataItem.rem_job}
                  // placeholder="Nghề nghiệp"
                />
              </div>
            </li>

            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Đặc điểm lịch sử:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  // name="rem_job"
                  // onChange={onChange}
                  // value={dataItem.rem_job}
                  // placeholder="Nghề nghiệp"
                />
              </div>
            </li>

            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Hiện đang làm gì:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  // name="rem_job"
                  // onChange={onChange}
                  // value={dataItem.rem_job}
                  // placeholder="Nghề nghiệp"
                />
              </div>
            </li>

            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Nơi cư trú:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  // name="rem_job"
                  // onChange={onChange}
                  // value={dataItem.rem_job}
                  // placeholder="Nghề nghiệp"
                />
              </div>
            </li>

            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Ghi chú:</span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  name="rem_note"
                  onChange={onChange}
                  value={dataItem.rem_note}
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
  // }
  // return (
  // null
  // );
};
export default Family;
