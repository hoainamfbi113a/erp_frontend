import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Radio, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Table, Space, Tag, Avatar } from "antd";
import { Popconfirm, message } from "antd";
const { Option } = Select;
const { TextArea } = Input;
import moment from "moment";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const PersonalHistory = (props) => {
  let [fakeData, setFakeData] = useState([
    {
      id: 1,
      dateStart: "05/09/1990",
      dateEnd: "05/09/1990",
      content: "Học sinh Trường Tiểu Học Nguyễn Hữu A",
    },
    {
      id: 2,
      dateStart: "05/09/1990",
      dateEnd: "05/09/1990",
      content: "Học sinh Trường Tiểu Học Nguyễn Hữu A",
    },
    {
      id: 3,
      dateStart: "05/09/1990",
      dateEnd: "05/09/1990",
      content: "Học sinh Trường Tiểu Học Nguyễn Hữu A",
    },
  ]);
  let [content, setContent] = useState("");
  let [date, setDate] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const showModal = () => {
    setVisible(true);
    setDataItem({});
  };
  useEffect(() => {}, []);
  const hideModal = () => {
    setVisible(false);
  };

  //Xóa
  const confirmDelete = async (id) => {
    const params = {
      id,
    };

  }

  const onDateSubmit = (value) => {
    setDate(value);
  }

  const onSubmit = () => {
    if(date) {
      setFakeData([
        ...fakeData,
        {
          id: 4,
          dateStart: moment(date[0]).format("DD/MM/YYYY"),
          dateEnd: moment(date[1]).format("DD/MM/YYYY"),
          content: content,
        },
      ]);
    }   
  };
  const handleUpdate = (value) => {
    setVisible(true);
    setDataItem(value);
  };
  const renderData = () => {
    return fakeData.map((item) => {
      return (
        <li key={item.id}>
          <div className="personal-history-time">
            {item.dateStart} - <span> {item.dateEnd}</span>
          </div>
          <Space size="middle">
            <Popconfirm
              title="Are you sure hide this user?"
              okText="Yes"
              cancelText="No"
              onConfirm={confirmDelete}
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
          Quá trình học tập và làm việc
        </div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">{renderData()}</ul>

          <Modal
            title="Nhập thông tin"
            visible={visible}
            onOk={onSubmit}
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
                <li className="tabs-main-left-li tabs-main-left-li-row">
                  <span className="tabs-user-infor-top">Thông tin</span>
                  <div className="tabs-user-infor-bottom">
                    <p>Lịch sử bản thân</p>
                  </div>
                </li>
                <li className="tabs-main-left-li tabs-main-left-li-row">
                  <span className="tabs-user-infor-top">Từ ngày</span>
                  <div className="tabs-user-infor-bottom">
                    <RangePicker
                      placeholder={["Từ ngày", "Đến ngày"]}
                      onChange={onDateSubmit}
                      format={dateFormatList[0]}
                      className="modal-ranPicker"
                    />
                  </div>
                </li>
                <li className="tabs-main-left-li">
                  <span className="tabs-user-infor-top"></span>
                  <div className="tabs-user-infor-bottom">
                    <TextArea
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
export default PersonalHistory;
