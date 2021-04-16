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
import { RightOutlined, LeftOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import axios from 'axios'
const TablePosition = (props) => {

  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [dataPermission, setDataPermission] = useState(null);
  const [arrOption, setArrOption] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [permissionExist, setPermissionExist] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    let arrOption = [];
    let data = await getListPosition(1);
    console.log(data)
    axios
      .get(
        "/api/permission/positions/except"
      )
      .then((res) => {
        let dataPermission = res.data;
        for (let item of dataPermission) {
          for (let itemGroup of item.groups) {
            let arrOptionChild = [];
            for (let itemPermission of itemGroup.permissions) {
              let objP = {
                label: itemPermission.name,
                value: itemPermission.id,
              };
              arrOptionChild.push(objP);
            }
            let obj = {
              label: itemGroup.name,
              options: arrOptionChild,
            };
            arrOption.push(obj)
          }
        }
      })
      .catch((err) => {
        console.log("err");
      });
      setArrOption(arrOption)
    // await axiosConfig
    //   .get("/api/permission?page=all")
    //   .then((res) => {
    //     setDataPermission(res.data)
    //     let arrOption = [];
    //     for (let item of res.data) {
    //       let obj = {
    //         label: item.name,
    //         value: item.id,
    //       };
    //       arrOption.push(obj);
    //     }
    //     setArrOption(arrOption)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // let dataPermission = await getListPosition(1);
    setData(data)
    // props.totalPosition(data.meta.pagination.total);
  };

  const handlePagination = async (pagination) => {
    let data = await getListPosition(pagination);
    setData(data);
  };

  const showModal = (id) =>{
    setId(id);
    //get exist permission
    axiosConfig.get(`/api/list/permission/work-formality/${id}`)
    .then(res=>{
      setPermissionExist(res.data)
      console.log(res)
      let arrPermission = [];
      // for(let item of res) {
      //   for(let itemChild of item.groups) {
      //     for(let itemChild2 of itemChild.permissions) {
      //       arrPermission.push(itemChild2.id)
      //     }
      //   }
      // }
      for (const property in res) {
        for (const item of res[property].groups) {
          for (const itemChild of item.permissions) {
            // ArrSelected.push(itemChild.id);
            console.log(itemChild.id)
            arrPermission.push(itemChild.id)
          }
        }
      }
      console.log(arrPermission)
      setPermissionExist(arrPermission)
      setSelected(arrPermission);
    })
    .catch(err=>{
      console.log(err)
    })
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
  const handleOk = () =>{
    let arr1 = permissionExist;
    let arr2 = selected;
  
    let differenceDelete = arr1.filter((x) => !arr2.includes(x));
    console.log(differenceDelete)
    let differenceAdd = arr2.filter((x) => !arr1.includes(x));
    console.log(differenceAdd)
    let bodyAdd = {
      id: id,
      permissions:differenceAdd
    }
    let bodyDelete = {
      id:id,
      permissions:differenceDelete
    }
    console.log(bodyAdd)
    if(differenceAdd.length!==0) {
      axiosConfig.post("/api/work-formality/permission",bodyAdd)
      .then(res=>{
        message.success("Gán quyền thành công")
        setIsShowModal(false)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    if(differenceDelete.length!==0) {
      axiosConfig.post("/api/work-formality/permissiond",bodyDelete)
      .then(res=>{
        message.success("Gỡ quyền thành công")
        setIsShowModal(false)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    console.log(selected)
  }
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
          onOk={handleOk}
          onCancel={handleCancel}
          //   className="modal-transfer-grant-permission"
        >
          <div className="select-grant-role">
          </div>
          <DualListBox
            options={options}
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
}

export default TablePosition;
