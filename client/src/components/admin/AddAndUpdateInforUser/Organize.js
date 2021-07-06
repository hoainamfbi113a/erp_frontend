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

const Organize = (props) => {
  const { org_name,
    org_headquarters_where,
    org_position,
    org_youth_team,
    org_youth_group,
    org_type,
    org_time_from,
    org_time_to,
    org_note
  } = props.dataItem
  const valueOrg = (value) => {
    if (value == 1)
      return "1";

    if (value == 2)
      return "2";

    if (value == 3)
      return "3";

    if (value == 4)
      return "4";

  }
  const renderType = (type) =>{
    if(type == 1) {
      return (
        <div style= {{margin:"19px"}} >
        <b>Đội thiếu niên Tiền Phong TP.HCM</b>
        </div>
      )
    }
    if(type == 2) {
      return (
        <div style= {{margin:"19px"}}>
        <b>Đoàn thanh niên cộng sản TP.HCM</b>
        </div>
      )
    }
    if(type == 3) {
      return (
        <div style= {{margin:"19px"}}>
        <b>Các hội nghề nghiệp</b>
        </div>
      )
    }
    if(type == 4) {
      return (
        <div style= {{margin:"19px"}}>
        <b>Các tổ chức chính trị xã hội khác (trong và ngoài nước)</b>
        </div>
      )
    }
  }
  const renderData = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <li key={item.id}>
            <div className="personal-history-time">
            Ngày tham gia: {formatDateNumber(item.org_time_from, dateFormatList[0])} {" "}
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
            {renderType(item.org_type)}
            { item.org_youth_team && <p className="personal-history-content">Vào đội thiếu niên: {item.org_youth_team}</p> }
           { item.org_youth_group && <p className="personal-history-content">Vào đoàn thanh niên: {item.org_youth_group}</p> }
           { item.org_name && <p className="personal-history-content">Tên tố chức: {item.org_name}</p> }
           { item.org_headquarters_where && <p className="personal-history-content">Trụ sở ở đâu: {item.org_headquarters_where}</p> }
           { item.org_position && <p className="personal-history-content">Giữ chức danh/chức vụ  trong tổ chức: {item.org_position}</p> }
           { item.org_note && <p className="personal-history-content">Ghi chú: {item.org_note}</p> }
          </li>
        );
      });
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
        <div className="personal-history-title">
          Tham gia các tổ chức chính trị, xã hội:
        </div>
        <div>
          <div className="edit-infr-vertical-line"></div>
          <ul className="personal-history-list">
            {renderData(props.dataOrg)}
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
            <li className="tabs-main-left-li tabs-main-left-li-row">
              <span className="tabs-user-infor-top">Ngày tham gia</span>
              <div className="tabs-user-infor-bottom">
              <DatePicker
                          format={dateFormatList}
                          placeholder="Ngày bắt đầu"
                          value={
                            org_time_from ?
                            moment(
                              org_time_from,
                              dateFormatList[0]
                            ): null
                          }
                          onChange={(date, dateString) =>
                            props.onChangeRange(
                              date,
                              dateString,
                              "deg_begin_study"
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
                  value={valueOrg(org_type)}
                  style={{ width: 527 }}
                >
                  <Option value="1">Đội thiếu niên TIền Phong TP.HCM</Option>
                  <Option value="2">Đoàn thanh niên cộng sản TP.HCM</Option>
                  <Option value="3">Các hội nghề nghiệp</Option>
                  <Option value="4">Các tổ chức chính trị xã hội khác (trong và ngoài nước)</Option>
                </Select>
              </div>
            </li>
            {(org_type == 3 || org_type == 4) &&
              <div> <li style={{ width: "265px" }} className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
                <span className="tabs-user-infor-top">Tên tố chức</span>
                <div className="tabs-user-infor-bottom">
                  <Input
                    style={{ width: "100%" }}
                    name="org_name"
                    value={org_name}
                    onChange={props.onChange}
                    placeholder="Tên tố chức"
                  />
                </div>
              </li>
                <li style={{ width: "265px" }} className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
                  <span className="tabs-user-infor-top">Trụ sở ở đâu</span>
                  <div className="tabs-user-infor-bottom">
                    <Input
                      style={{ width: "100%" }}
                      name="org_headquarters_where"
                      value={org_headquarters_where}
                      onChange={props.onChange}
                      placeholder="Trụ sở ở đâu"
                    />
                  </div>
                </li>
                <li style={{ width: "265px" }} className="tabs-main-left-li tabs-main-left-li-row-three  tabs-main-left-li-row">
                  <span className="tabs-user-infor-top">Giữ chức vụ/ chức danh </span>
                  <div className="tabs-user-infor-bottom">
                    <Input
                      style={{ width: "100%" }}
                      name="org_position"
                      value={org_position}
                      onChange={props.onChange}
                      placeholder="Giữ chức vụ/ chức danh"
                    />
                  </div>
                </li>
              </div>
            }
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Chi tiết hoạt động</span>
              <div className="tabs-user-infor-bottom">
                <TextArea
                  onChange={props.onChange}
                  value={org_note}
                  name="org_note"
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

export default Organize;
