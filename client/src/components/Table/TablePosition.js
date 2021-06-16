import { Input, Layout, Modal, Table } from "antd";
import { checkVisible } from "helpers/FuncHelper";
import React from "react";
import "../../App/App.css";
import "./Table.css";
const { Content } = Layout;

const TablePosition = ({
  permissions,
  loading,
  data,
  columns,
  handlePagination,
  isCreate,
  showModalData,
  onSubmit,
  hideModal,
  pos_name,
  setPosName,
  err,
  pos_note,
  setPosNote
}) => {
  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
            {checkVisible(permissions, "list", "api/positions") ? (
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
        title={!isCreate ? "Tạo chức vụ" : "Cập nhật chức vụ"}
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
          // onSubmit={this.onSubmit}
          method="post"
        >
          <ul style={{ marginLeft: "23px" }}>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">
                Tên chức vụ<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={pos_name}
                  name="pos_name"
                  onChange={(e) => setPosName(e.target.value)}
                />
              </div>
              {err !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Ghi chú chức vụ</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={pos_note}
                  name="pos_note"
                  onChange={(e) => setPosNote(e.target.value)}
                />
              </div>
            </li>
          </ul>
        </form>
      </Modal>
    </div>
  );
};

export default TablePosition;
