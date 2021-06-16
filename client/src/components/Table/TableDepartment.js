import { Input, Layout, Modal, Table } from "antd";
import { checkVisible } from "helpers/FuncHelper";
import React from "react";
import "../../App/App.css";
import "./Table.css";
const { Content } = Layout;

const TableDepartment = ({
  permissions,
  loading,
  data,
  columns,
  handlePagination,
  isCreate,
  showModalData,
  onSubmit,
  hideModal,
  depart,
  onChange,
  err,
}) => {
  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
            {checkVisible(permissions, "list", "api/departments") ? (
              <Table
                style={{ minHeight: "70vh" }}
                loading={loading}
                dataSource={data ? data.data : ""}
                columns={columns}
                className="table-content"
                rowKey="id"
                pagination={{
                  onChange: handlePagination,
                  //pageSize: 10,
                  current: data ? data.meta.pagination.current_page : 1,
                  total: data ? data.meta.pagination.total : 0,
                  showSizeChanger: true,
                }}
              />
            ) : (
              ""
            )}

            {/* {!data ? "ko co data" : "co data"} */}
          </div>
        </div>
      </Content>
      <Modal
        title={isCreate ? "Tạo phòng ban" : "Cập nhật phòng ban"}
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
                Tên phòng ban<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={depart.dep_name}
                  name="dep_name"
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
              <span className="tabs-user-infor-top">
                Địa chỉ phòng ban<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={depart.dep_address}
                  name="dep_address"
                  onChange={onChange}
                />
              </div>
              {err.err_address !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_address}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">
                Số điện thoại phòng ban<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={depart.dep_phone}
                  name="dep_phone"
                  onChange={onChange}
                />
              </div>
              {err.err_phone !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_phone}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Ghi chú phòng ban</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={depart.dep_note}
                  name="dep_note"
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

export default TableDepartment;
