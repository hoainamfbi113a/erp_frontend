import { PlusCircleOutlined, CloudDownloadOutlined } from "@ant-design/icons";
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
import { triggerBase64Download } from 'react-base64-downloader';
import { formatDateNumber } from "../../../helpers/FuncHelper";
const { RangePicker } = DatePicker;

const { Option } = Select;
const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const Bonus = (props) => {
  const {
    type,
    rew_content,
    rew_decision_number,
    rew_time_from,
    rew_time_to,
    rew_formality,
    resource,
    id,
  } = props.reward;
  const { err_content, err_number } = props.err;
  const renderData = (data) => {
    return data.map((item) => {
      return (
        <li key={item.id}>
          <div className="personal-history-time">
            {formatDateNumber(item.rew_time_from, dateFormatList[0])} -{" "}
            <span>
              {" "}
              {formatDateNumber(item.rew_time_to, dateFormatList[0])}
            </span>
          </div>
          <Space size="middle">
            <Popconfirm
              title="Are you sure hide this user?"
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
          <div>
            <div>
              <p
                style={{ marginTop: "4px" }}
                className="personal-history-content"
              >
                Nội dung, hình thức{" "}
                {item.type == "1" ? "khen thưởng" : "kĩ luật"} :{" "}
                {item.rew_content}
              </p>
              <p className="personal-history-content">
                Số cấp quyết định: {item.rew_decision_number}
              </p>
              <p className="personal-history-content">
                Ghi chú: {item.rew_formality}
              </p>
              {/* {item.resource && (
                <img 
                  style={{ maxWidth: "400px", maxHeight: "200px", marginBottom: "20px" }}
                  src={`data:image/jpeg;base64,${item.resource.content}`}
                  alt=""
                />
              )} */}
                <br />
               {item.resource &&
                <div onClick={() => triggerBase64Download(`data:image/jpeg;base64,${item.resource.content}`,
                item.resource.name )}>
                  <CloudDownloadOutlined style={{ fontSize: '23px', marginRight:"5px"}} 
                  
                  />
                  <span>{item.resource.name}</span>
                </div>
            }
            </div>
          </div>
        </li>
      );
    });
  };
  const renderInputFile = (id, resource) => {
    if (id == "" || id == "undefined" || id == undefined) {
      return (
        <input  
        type="file"
         name="file" onChange={props.onChangeImage}></input>
      );
    } else {
      return (
        <div>
          <div style= {{marginBottom:"15px", color:"red"}}>
            Ảnh hiện tại :
            {resource ? resource.name :""}
          </div>
          <input
          style = {{marginBottom:"10px"}}
          type="file"
         name="file" onChange={props.onChangeImage}></input>
        </div>
      )
    }
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
        <div className="personal-history-title">Khen thưởng</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">
            {renderData(props.dataReward)}
          </ul>
        </div>
      </div>
      <div className="tabs-main personal-history">
        <div className="personal-history-title">Kỷ luật:</div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">
            {renderData(props.dataDiscipline)}
          </ul>
        </div>
      </div>
      <Modal
        title="Nhập thông tin"
        visible={props.visible}
        onOk={() => {
          props.handleOk(id);
        }}
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
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Từ ngày</span>
              <div className="tabs-user-infor-bottom">
                <RangePicker
                  placeholder={["Từ ngày", "Đến ngày"]}
                  value={
                    rew_time_from
                      ? [
                          moment(rew_time_from, dateFormatList[0]),
                          moment(rew_time_to, dateFormatList[0]),
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
                  value={type == 1 ? "1" : "2"}
                  style={{ width: 527 }}
                >
                  <Option value="1">Khen thưởng</Option>
                  <Option value="2">Kỷ luật</Option>
                </Select>
              </div>
            </li>
            <li
              style={{ width: "265px" }}
              className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row"
            >
              <span className="tabs-user-infor-top">
                Nội dung, hình thức {type == "1" ? "khen thưởng" : "kĩ luật"}
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  style={{ width: "100%" }}
                  name="rew_content"
                  value={rew_content}
                  onChange={props.onChange}
                  placeholder= { type == "1" ? "Nội dung, hình thức khen thưởng" : 
                  "Nội dung, hình thức kĩ luật"}
                />
              </div>
              {err_content !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    position: "absolute"
                  }}
                >
                  {err_content}
                </span>
              ) : null}
            </li>
            <li
              style={{ width: "265px" }}
              className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row"
            >
              <span className="tabs-user-infor-top">
                Số cấp quyết định {type == "1" ? "khen thưởng" : "kĩ luật"}
              </span>
              <div className="tabs-user-infor-bottom">
                <Input
                  style={{ width: "100%" }}
                  name="rew_decision_number"
                  value={rew_decision_number}
                  onChange={props.onChange}
                  placeholder="Số cấp quyết định "
                />
              </div>
              {err_number !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    position: "absolute"
                  }}
                >
                  {err_number}
                </span>
              ) : null}
            </li>
            <div>{renderInputFile(id, resource)}</div> 
            <div></div>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top" style = {{marginBottom: "5px", marginTop: "5px"}} >
                Ghi chú {type == "1" ? "khen thưởng" : "kĩ luật"}
              </span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  onChange={props.onChange}
                  value={rew_formality}
                  name="rew_formality"
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
