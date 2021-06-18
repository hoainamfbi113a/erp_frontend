import { Layout, Table } from "antd";
import { checkVisible } from "helpers/FuncHelper";
import React from "react";
import "../../App/App.css";
import "./Table.css";
const { Content } = Layout;

const TableUser = ({
  permissions,
  loading,
  columns,
  dataUser,
  handlePagination,
}) => {
  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
            {checkVisible(permissions, "list", "api/profiles") ? (
              <Table
                loading={loading}
                columns={columns}
                dataSource={dataUser ? dataUser.data : []}
                className="table-content"
                rowKey="id"
                pagination={{
                  onChange: handlePagination,
                  current:
                    dataUser && dataUser.pagination.current_page
                      ? dataUser.pagination.current_page
                      : dataUser && dataUser.pagination.currentPage
                      ? dataUser.pagination.currentPage
                      : 1,
                  total: dataUser ? dataUser.pagination.total : 0,
                  showSizeChanger: true,
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Content>
    </div>
  );
};
export default TableUser;
