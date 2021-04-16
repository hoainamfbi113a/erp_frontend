import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Modal, Popconfirm, Select, Space, Tag } from "antd";
import moment from "moment";
import React, { useState } from "react";
const { RangePicker } = DatePicker;

const { Option } = Select;
const { TextArea } = Input;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
let fakeData1 = [
  {
    id: 1,
    category: 1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "Lao Động Tiên Tiến",
  },
  {
    id: 2,
    category: 1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "Lao Động Khá",
  },
  {
    id: 3,
    category: 1,
    dateStart: "05/09/1990",
    dateEnd: "10/05/1995",
    content: "Lao Động Xuất Sắc",
  },
];
let fakeData2 = [
  {
    id: 1,
    category: 2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Kỷ luật 1",
  },
  {
    id: 2,
    category: 2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Kỷ luật 2",
  },
  {
    id: 3,
    category: 2,
    dateStart: "05/09/1990",
    dateEnd: "05/09/1990",
    content: "Kỷ luật 3",
  },
];
const Bonus = (props) => {
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [refresh, setRefresh] = useState(true);
  const showModal = (value) => {
    if (value == 1) {
      setDataItem({ category: 1 });
    } else {
      setDataItem({ category: 2 });
    }
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const handleUpdate = (value) => {
    setVisible(true);
    setDataItem(value);
  };
  const onChangeRange = (e, dateString, name1, name2) => {
    dataItem.dateStart = dateString[0]
    dataItem.dateEnd = dateString[1]
    setDataItem(dataItem)
    setRefresh(!refresh)
  };
  const handleChange = (value) =>{
    dataItem.category = value;
    setDataItem(dataItem);
    console.log(dataItem)
    setRefresh(!refresh)
  }
  const renderData1 = () => {
    return fakeData1.map((item) => {
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
  const renderData2 = () => {
    return fakeData2.map((item) => {
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
            onClick={()=>showModal(1)}
            className="btn-add-detail"
            icon={<PlusCircleOutlined />}
          >
            Thêm
          </Button>
        </div>
        <div className="personal-history-title">Khen thưởng</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData1()}</ul>
        </div>
      </div>
      <div className="tabs-main personal-history">
        <div className="personal-history-title">Kỷ luật:</div>
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
        width={577}
      >
        <form
          style={{ width: "100%" }}
          className="tabs-main"
          noValidate
          method="post"
        >
          <ul>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Thông tin</span>
              <div className="tabs-user-infor-bottom">
                <Select
                  onChange={handleChange}
                  className="modal-selection"
                  value={dataItem.category == 1 ? "1" : "2"}
                  style={{ width: 527 }}
                >
                  <Option value="1">Khen thưởng</Option>
                  <Option value="2">Kỷ luật</Option>
                </Select>
              </div>
            </li>
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Từ ngày</span>
              <div className="tabs-user-infor-bottom">
                <RangePicker
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

export default Bonus;
