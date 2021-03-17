import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import * as ApiHelper from '../../Helper';
import Button from "react-bootstrap/Button";
import Create from "../table/create";
import Edit from "../table/edit";
import Toast from "react-bootstrap/Toast";
function Index(props) {
    const [list, setList] = useState([]);
    const [data, setData] = useState({});
    const [isShow, setIsShow] = useState(false);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [isShowAssign, setIsShowAssign] = useState(false);
    const [isShowToast, setIsShowToast] = useState(false);
    const [toast, setToast] = useState('');
    const getListTable = () => {
        ApiHelper.callAxios(props.urlGetListTable,'GET', {})
            .then(data => {
                setList(data.data)
            })
    }
    useEffect(function () {
        getListTable();
    },[])
    const handleRemove = (e, id) => {
        ApiHelper.callAxios(props.urlGetListTable + '/' + id, 'DELETE', {}, data)
            .then(res => {
                setIsShowToast(true);
                setToast('Xoá thành công!');
                const newList = list.filter(x=> x.id != id);
                setList(newList);
            })
    }
    const handleShow = (e) => {
        setIsShow(true)
    }
    const handleShowEdit = (e, item) => {
        if(item !== undefined) setData(item);
        setIsShowEdit(true)
    }
    const handleClose = () => {
        setIsShow(false)
        setIsShowEdit(false)
        setIsShowAssign(false)
    }
    const handleAfterEdit = (e, item) => {
        getListTable();
        setIsShowToast(true);
        setToast('Cập nhật thành công!');
        handleClose()
    }
    const handleAfterSubmit = (e, item) => {
        getListTable();
        setIsShowToast(true);
        setToast('Tạo thành công!');
        handleClose()
    }
    const handleShowAssign = () => {
        setIsShowAssign(true)
    }
    return (
      <div>
          {
              isShow === true &&
              <Create
                  isShow={isShow}
                  handleClose={handleClose}
                  urlGetListTable={props.urlGetListTable}
                  urlGetListService={props.urlGetListService}
                  urlGetListAction={props.urlGetListAction}
                  handleAfterSubmit={handleAfterSubmit}
              />
          }
          <Button variant='primary' style={{float:'left', marginBottom:'10px'}} onClick={(e) => handleShow(e)}>Tạo</Button>
          {
              isShowEdit === true &&
              <Edit
                  isShowEdit={isShowEdit}
                  handleClose={handleClose}
                  data={data}
                  urlGetListTable={props.urlGetListTable}
                  urlGetListService={props.urlGetListService}
                  urlGetListAction={props.urlGetListAction}
                  handleAfterEdit={handleAfterEdit}
              />
          }
          {/*{*/}
          {/*    isShowAssign === true &&*/}
          {/*    <AssignAction*/}
          {/*        isShowAssign={isShowAssign}*/}
          {/*        handleClose={handleClose}*/}
          {/*        data={data}*/}
          {/*        urlGetListTable={props.urlGetListTable}*/}
          {/*        urlGetListService={props.urlGetListService}*/}
          {/*        urlGetListAction={props.urlGetListAction}*/}
          {/*        handleAfterEdit={handleAfterEdit}*/}
          {/*    />*/}
          {/*}*/}
          <Toast onClose={() => setIsShowToast(false)} show={isShowToast} delay={3000} autohide>
              <Toast.Header>
                  {toast}
              </Toast.Header>
          </Toast>
          <Table striped bordered hover>
              <thead>
              <tr>
                  <th>Id</th>
                  <th>Tên</th>
                  <th>Service</th>
                  <th>Slug</th>
                  <th>Tình Trạng</th>
                  <th>Ngày Tạo Mới</th>
                  <th>Ngày Cập Nhật</th>
                  <th>Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {
                  list.length > 0 && list.map(function (item, index) {
                      return(
                          <tr key={index}>
                             <td>{item.id}</td>
                             <td>{item.name}</td>
                             <td>{item.service_name}</td>
                             <td>{item.slug}</td>
                             <td>{item.status}</td>
                             <td>{item.created_at}</td>
                             <td>{item.updated_at}</td>
                              <td>
                                  <Button variant='success' onClick={(e) => handleShowEdit(e, item)}>Sửa</Button>
                                  <Button onClick={(e) => handleRemove(e, item.id)} variant='danger'>Xoá</Button>
                              </td>
                          </tr>
                      )
                  })
              }
              </tbody>
          </Table>
      </div>
    );
}
export default Index;