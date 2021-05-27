import { Input, Layout, Modal, Select, Table } from "antd";
import { checkVisible } from "helpers/FuncHelper";
import React from "react";
import "../../App/App.css";
import "./Table.css";
const { Content } = Layout;

const TableParts = ({
  permissions,
  loading,
  data,
  columns,
  handlePagination,
  isCreate,
  showModalData,
  onSubmit,
  hideModal,
  part,
  handleChangeDepart,
  renderDepartment,
  err,
  onChange
}) => {
  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
            {checkVisible(permissions, "list", "api/parts") ? (
              <Table
                loading={loading}
                style={{ minHeight: "70vh" }}
                dataSource={data ? data.data : ""}
                columns={columns}
                className="table-content"
                rowKey="id"
                pagination={{
                  onChange: handlePagination,
                  current: data ? data.meta.pagination.current_page : 1,
                  total: data ? data.meta.pagination.total : 0,
                  showSizeChanger: true,
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Content>
      <Modal
        title={isCreate ? "Tạo tổ" : "Cập nhật tổ"}
        visible={showModalData}
        onOk={onSubmit}
        onCancel={hideModal}
        okText="OK"
        cancelText="Cancel"
        width={600}
      >
        <form
          style={{ width: "100%" }}
          className="tabs-main tabs-main-modal"
          noValidate
          method="post"
        >
          <ul style={{ marginLeft: "23px" }}>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">
                Chọn phòng ban<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                <Select
                  value={part.dep_id}
                  style={{ width: 450 }}
                  onChange={handleChangeDepart}
                >
                  {renderDepartment()}
                </Select>
              </div>
              {err.err_dep !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_dep}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">
                Tên tổ<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={part.part_name}
                  name="part_name"
                  onChange={onChange}
                />
              </div>
              {err.err_name !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_name}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Ghi chú tổ</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={part.part_note}
                  name="part_note"
                  onChange={onChange}
                />
              </div>
            </li>
          </ul>
        </form>
      </Modal>
    </div>
  );
};
export default TableParts;
