import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../App/App.css";
import "./Table.css";
import {} from "antd";
import {
  Layout,
  Table,
  Space,
  Tag,
  Modal,
  message,
} from "antd";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { getListPosition, searchPosition } from "apis/positionApi";
import { allPermission } from "apis/permissionApi";
import axiosConfig from "apis/axios";
const { Content } = Layout;
import { RightOutlined, LeftOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { AllPermissionGroup } from "../../helpers/DataHelper";
const TablePosition = (props) => {
  const dispatch = useDispatch();
  const [sizeOpt, setSizeOt] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataPermission, setDataPermission] = useState(null);
  const [arrOption, setArrOption] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [permissionExist, setPermissionExist] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchDataPermission("all");
  }, []);

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
  };

  const fetchDataPermission = async (page) => {
    let data = await allPermission()      
    setArrOption(AllPermissionGroup(data))
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

  const showModal = (id) => {
    setId(id);
    axiosConfig
      .get(`/api/list/permission/work-formality/${id}`)
      .then((res) => {
        let arrPermission = [];
        for (const property in res) {
          for (const item of res[property].groups) {
            for (const itemChild of item.permissions) {
              // ArrSelected.push(itemChild.id);
              console.log(itemChild.id);
              arrPermission.push(itemChild.id);
            }
          }
        }
        setPermissionExist(arrPermission);
        setSelected(arrPermission);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsShowModal(true);
  };
  const handleCancel = () => {
    setIsShowModal(false);
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

  const handleOk = () => {
    setLoading(true);
    let arr1 = permissionExist;
    let arr2 = selected;

    let differenceDelete = arr1.filter((x) => !arr2.includes(x));
    console.log(differenceDelete);
    let differenceAdd = arr2.filter((x) => !arr1.includes(x));
    console.log(differenceAdd);
    let bodyAdd = {
      id: id,
      permissions: differenceAdd,
    };
    let bodyDelete = {
      id: id,
      permissions: differenceDelete,
    };
    console.log(bodyAdd);
    if (differenceAdd.length !== 0) {
      axiosConfig
        .post("/api/work-formality/permission", bodyAdd)
        .then((res) => {
          message.success("Gán quyền thành công");
          setIsShowModal(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (differenceDelete.length !== 0) {
      axiosConfig
        .post("/api/work-formality/permissiond", bodyDelete)
        .then((res) => {
          message.success("Gỡ quyền thành công");
          setIsShowModal(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(selected);
  };
  const onChange = (selected) => {
    setSelected(selected);
  };

  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
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
          </div>
        </div>
        <Modal
          destroyOnClose={true}
          width={800}
          title="Gán quyền cho chức vụ phòng ban"
          visible={isShowModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="select-grant-role"></div>
          <DualListBox
            options={arrOption}
            selected={selected}
            onChange={onChange}
            icons={{
              moveLeft:  <LeftOutlined />,
              moveAllLeft: [
                  <DoubleLeftOutlined />,
                  <span key={1} className="fa fa-chevron-left" />,
              ],
              moveRight: <RightOutlined />,
              moveAllRight: [
                <DoubleRightOutlined />,
                  <span key={1} className="fa fa-chevron-right" />,
              ],
          }}
          />
        </Modal>
      </Content>
    </div>
  );
};

export default TablePosition;
