import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ValidateField } from "helpers/FuncHelper";
import usePrevious from "../../hooks/usePrevious";
import "../../App/App.css";
import "./Table.css";
import {  } from "antd";
import { Layout, Table, Space, Tag, Input, Modal, Popconfirm, message } from "antd";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  getListPosition,
} from "apis/positionApi";
import axiosConfig from "apis/axios";
const { Content } = Layout;

const TablePosition = (props) => {

  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [dataPermission, setDataPermission] = useState(null);
  const [arrOption, setArrOption] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    let data = await getListPosition(1);
    await axiosConfig
      .get("/api/permission?page=all")
      .then((res) => {
        setDataPermission(res.data)
        let arrOption = [];
        for (let item of res.data) {
          let obj = {
            label: item.name,
            value: item.id,
          };
          arrOption.push(obj);
        }
        setArrOption(arrOption)
      })
      .catch((err) => {
        console.log(err);
      });
    // let dataPermission = await getListPosition(1);
    setData(data)
    // props.totalPosition(data.meta.pagination.total);
  };

  const handlePagination = async (pagination) => {
    let data = await getListPosition(pagination);
    setData(data);
  };

  const showModal = () =>{
    setIsShowModal(true);
  }
  const handleCancel = () =>{
    setIsShowModal(false)
  }
  const columns = [
    {
      title: "Tên chức vụ",
      dataIndex: "pos_name",
      key: "pos_name",
    },
    {
      title: "Ghi chú",
      dataIndex: "pos_note",
      key: "pos_note",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text == 1)
          return (
            <Tag color="geekblue" className="table-action">
              ACTIVE
            </Tag>
          );
        return (
          <Tag color="geekblue" className="table-action">
            HIDE
          </Tag>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created",
    },

    {
      title: "Hành động",
      key: "operation",
      dataIndex: "id",
      fixed: "right",
      render: (text, row) => (
        <Space size="middle">
          <Tag
            onClick={() => showModal(text)}
            color="geekblue"
            className="table-action"
          >
            Gán quyền
          </Tag>
        </Space>
      ),
    },
  ];
  const onChange = (selected) =>{
    setSelected(selected)
  }
  const options = arrOption;
    // const { selected } = this.state;
  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
            <Table
              style={{ minHeight: "70vh" }}
              dataSource={data ? data.data : ""}
              columns={columns}
              className="table-content"
              rowKey="id"
              pagination={{
                onChange: handlePagination,
                pageSize: 15,
                total: data ? data.meta.pagination.total : 0,
              }}
            />
          </div>
        </div>
        <Modal
          destroyOnClose={true}
          width={800}
          title="Gán quyền cho chức vụ phòng ban"
          visible = {isShowModal}
          // visible={this.props.showModalRoles}
          // onOk={this.handleOk}
          onCancel={handleCancel}
          //   className="modal-transfer-grant-permission"
        >
          <div className="select-grant-role">
          </div>
          <DualListBox
            options={options}
            selected={selected}
            onChange={onChange}
          />
        </Modal>
      </Content>
    </div>
  );
}

export default TablePosition;
