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
  fakeData,
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
  const renderData1 = () => {
    return fakeData.map((item) => {
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
              onClick={() => handleUpdate(item)}
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
    if (dataFamily) {
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
            // onClick={showModal}
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
        <div className="personal-history-title">{namination}</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData2()}</ul>
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
          // onSubmit={this.onSubmit}
          method="post"
        >
          <ul style={{ width: "100%" }}>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
              <span className="tabs-user-infor-top">Tên tài sản:</span>
              <div className="tabs-user-infor-bottom">
                <Input
                  value={dataItem.title}
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
                  value={dataItem.content}
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
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                {namination === "Gia đình" ? (
                  <Select
                    placeholder="Chọn quan hệ"
                    className="modal-selection"
                    value={rem_relationship}
                    style={{ width: 527 }}
                    onChange={setRem}
                  >
                    <Option key="1" value="Vợ">
                      Vợ
                    </Option>
                    <Option key="2" value="Con">
                      Con
                    </Option>
                  </Select>
                ) : (
                  <Select
                    placeholder="Chọn quan hệ"
                    className="modal-selection"
                    value={rem_relationship}
                    style={{ width: 527 }}
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
                )}
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row-clear">
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
};
export default Family;
