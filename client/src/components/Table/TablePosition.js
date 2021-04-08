import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import {
  ValidateField,
  objCheckPermission,
  checkVisible,
} from "helpers/FuncHelper";
import usePrevious from "../../hooks/usePrevious";
import "../../App/App.css";
import "./Table.css";
import {} from "antd";
import {
  Layout,
  Table,
  Space,
  Tag,
  Input,
  Modal,
  Popconfirm,
  message,
} from "antd";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { getListPosition } from "apis/positionApi";
import { checkPermission } from "../../apis/checkPermission";
import PermissionContext from "../../context/PermissionContext";
const { Content } = Layout;

const TablePosition = (props) => {
  const dispatch = useDispatch();
  const { permissions, domain, slug } = useContext(PermissionContext);
  const lastValue = usePrevious(props.valueSearch);
  const [isCreate, setIsCreate] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [pos_name, setPosName] = useState("");
  const [pos_note, setPosNote] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(async () => {
    if (props.valueSearch !== lastValue) {
      dispatch(showLoading());
      let resListPos = await getListPosition("all");
      let listPosSearch = resListPos.data.filter((pos) => {
        return (
          pos.pos_name
            .toLowerCase()
            .indexOf(props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        meta: {
          pagination: listPosSearch.length,
        },
        data: listPosSearch,
      };
      setData(obj);
      props.totalPosition(obj.meta.pagination);
      dispatch(hideLoading());
    }
  }, [props.valueSearch]);

  const fetchData = async () => {
    let data = await getListPosition(1);
    setData(data);
    props.totalPosition(data.meta.pagination.total);
  };

  const onSubmit = async () => {
    let err_name = await ValidateField(pos_name, 8, 50, "Chức vụ");
    setErr(err_name);
    if (err_name === "") {
      hideModal();
      dispatch(showLoading());
      if (id === "") {
        hideModal();
        let res = await checkPermission(
          objCheckPermission(
            permissions,
            slug,
            domain,
            "create",
            "api/positions",
            null,
            { pos_name, pos_note },
            null
          )
        );
        if (res.message === "Success!. Stored") {
          message.success("Thêm chức vụ thành công");
          fetchData();
        } else {
          message.error("Thêm chức vụ thất bại");
        }
      } else {
        hideModal();
        let res = await checkPermission(
          objCheckPermission(
            permissions,
            slug,
            domain,
            "update",
            "api/positions/{position}",
            "{position}",
            { pos_name, pos_note },
            id
          )
        );
        setId("");
        if (res.message === "Success!. Updated") {
          message.success("Cập nhật chức vụ thành công");
          fetchData();
        } else {
          message.error("Cập nhật chức vụ thất bại");
        }
      }
      dispatch(hideLoading());
    }
  };
  const hideModal = () => {
    props.hideModal();
    setIsCreate(false);
    setPosName("");
    setPosNote("");
    setErr("");
  };
  const showModal = (id) => {
    let position = data.data.filter((item) => {
      return item.id == id;
    });
    setIsCreate(true);
    setId(position[0].id);
    setPosName(position[0].pos_name);
    setPosNote(position[0].pos_note);
    props.showModal();
  };

  const confirm = async (id) => {
    dispatch(showLoading());
    let res = await checkPermission(
      objCheckPermission(
        permissions,
        slug,
        domain,
        "delete",
        "api/positions/{position}",
        "{position}",
        "",
        id
      )
    );
    if (res.message === "Success!. Deleted") {
      fetchData();
      message.success("Ẩn chức vụ thành công");
    } else {
      message.error("Ẩn chức vụ thất bại");
    }
    dispatch(hideLoading());
  };

  const cancel = (e) => {
    message.error("Không ẩn");
  };
  const handlePagination = async (pagination) => {
    let data = await getListPosition(pagination);
    setData(data);
  };

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
    checkVisible(permissions, "delete", "api/positions/{position}") ||
    checkVisible(permissions, "update", "api/positions/{position}")
      ? {
          title: "Hành động",
          key: "operation",
          dataIndex: "id",
          fixed: "right",
          render: (text, row) => (
            <Space size="middle">
              <Popconfirm
                title="Bạn có muốn ẩn không?"
                onConfirm={() => confirm(text)}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                {checkVisible(
                  permissions,
                  "delete",
                  "api/positions/{position}"
                ) && (
                  <Tag color="volcano" className="table-action">
                    Ẩn
                  </Tag>
                )}
              </Popconfirm>
              {checkVisible(
                permissions,
                "update",
                "api/positions/{position}"
              ) && (
                <Tag
                  onClick={() => showModal(text)}
                  color="geekblue"
                  className="table-action"
                >
                  Cập nhật
                </Tag>
              )}
            </Space>
          ),
        }
      : {},
  ];
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
      </Content>
      <Modal
        title={!isCreate ? "Tạo chức vụ" : "Cập nhật chức vụ"}
        visible={props.showModalPosition}
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
