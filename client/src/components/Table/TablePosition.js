import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import {
  ValidateField,
  objCheckPermission,
  checkVisible,
} from "helpers/FuncHelper";
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
import { getListPosition, searchPosition } from "apis/positionApi";
import { checkPermission } from "../../apis/checkPermission";
import PermissionContext from "../../context/PermissionContext";
import { simpleDate } from "../../helpers/FuncHelper";
const { Content } = Layout;

const TablePosition = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [sizeOpt, setSizeOt] = useState(10);
  const { permissions, domain, slug } = useContext(PermissionContext);
  const [isCreate, setIsCreate] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [pos_name, setPosName] = useState("");
  const [pos_note, setPosNote] = useState("");
  const [err, setErr] = useState("");

  useEffect(async () => {
    setLoading(true);
    if(props.valueSearch !== "") {
      fetchSearch(1, sizeOpt);
    } else {
      fetchData(1, sizeOpt);
    }
  }, [props.valueSearch])

  const fetchSearch = async (page, per_page) => {
    let data = await searchPosition(props.valueSearch, page, per_page);
    if (!data.err) {
      setData(data);
      props.total(data.meta.pagination.total);
      setLoading(false);
    } else {
      message.error("search fail");
    }
  }

  const fetchData = async (page, per_page) => {
    let data = await getListPosition(page,per_page);
    if (!data.err) {
      setData(data);
      props.total(data.meta.pagination.total);
      setLoading(false);
    } else {
      message.error("search fail");
    }
    dispatch(hideLoading());
  };

  const onSubmit = async () => {
    let err_name = await ValidateField(pos_name, 5, 50, "Chức vụ");
    setErr(err_name);
    if (err_name === "") {
      hideModal();
      setLoading(true);
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
          fetchData(1, sizeOpt);
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
          fetchData(1, sizeOpt);
        } else {
          message.error("Cập nhật chức vụ thất bại");
        }
      }
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
    setLoading(true);
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
      fetchData(1, sizeOpt);
      message.success("Ẩn chức vụ thành công");
    } else {
      message.error("Ẩn chức vụ thất bại");
    }
    setLoading(false);
  };

  const cancel = (e) => {
    message.error("Không ẩn");
  };

  const handlePagination = async (page, pageSize) => {
    setSizeOt(pageSize);
    setLoading(true);
    if(props.valueSearch === "") {
      fetchData(page, pageSize);
    } else {
      fetchSearch(page, pageSize)
    }
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
  useEffect(() => {
    if (data && data.data) {
      data.data.map(el => {
          el.created_at = simpleDate(el.created_at);
        })
    }
  }, [data])
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
                  showSizeChanger: true
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
        visible={props.showModalData}
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
