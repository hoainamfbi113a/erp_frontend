import React, { useState } from "react";
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Space, Tag } from "antd";
const { Option } = Select;
import { Popconfirm } from "antd";
const { TextArea } = Input;
import moment from "moment";
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
let fakeData = [
  {
    id: 1,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1992",
    content: "Học sinh Trường Tiểu Học Nguyễn Hữu A",
  },
  {
    id: 2,
    dateStart: "05/09/1994",
    dateEnd: "05/09/1997",
    content: "Học sinh Trường Tiểu Học Nguyễn Hữu A",
  },
  {
    id: 3,
    dateStart: "05/09/1997",
    dateEnd: "05/09/2008",
    content: "Học sinh Trường Tiểu Học Nguyễn Hữu A",
  },
];
const JoinTCTTXH = () => {
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const showModal = () => {
    setDataItem({});
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const onSubmit = () => {};
  const handleUpdate = (value) => {
    setDataItem(value);
    setVisible(true);
  };
  const renderData = () => {
    return fakeData.map((item) => {
      return (
        <li key={item.id}>
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
          Tham gia các tổ chức chính trị, các hội nghề nghiệp:
        </div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData()}</ul>
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
                    Tham gia các tổ chức chính trị, các hội nghề nghiệp:
                  </div>
                </li>
                <li className="tabs-main-left-li tabs-main-left-li-row">
                  <span className="tabs-user-infor-top">Từ ngày</span>
                  <div className="tabs-user-infor-bottom">
                    <RangePicker 
                    format={dateFormatList}
                    placeholder = {["Từ ngày", "Đến ngày"]}
                      value={
                        dataItem.dateStart
                          ? [
                              moment(dataItem.dateStart, dateFormatList[0]),
                              moment(dataItem.dateEnd, dateFormatList[0]),
                            ]
                          : null
                      }
                      className="modal-ranPicker"
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
      </div>
    </div>
  );
};
export default JoinTCTTXH;
