import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import * as ApiHelper from '../../Helper';

function Create(props) {
    console.log(props)
    const [data, setData] = useState({});
    const [listService, setListService] = useState({});
    const [id, setId] = useState({});
    useEffect(function () {
        let { name, slug, service_management_id, status } = props.data
        setData({
            name,
            slug,
            service_management_id,
            status,
        })
        ApiHelper.callAxios(props.urlGetListService,'GET', {})
            .then(data => {
                setListService(data.data)
            })
        setId(props.data.id)
    },[])
    const handleSubmitEdit = (e) => {
        ApiHelper.callAxios(props.urlGetListTable +'/'+id, 'PUT', {}, data)
            .then(res => {
                props.handleAfterEdit(e, res.data);
            })
    }
    const handleNameChange = (e) => {
        setData({
            ...data,
            name: e.target.value,
            slug: ApiHelper.convertNameToSlug(e.target.value)
        });
    }

    const handleSlugChange = (e) => {
        setData({
            ...data,
            slug: e.target.value
        });
    }

    const handleServiceChange = (e) => {
        setData({
            ...data,
            service_management_id: e.target.value
        });
    }
    // const handleChange = (e)=>{
    //     // console.log(e.target.value)
    //     setData({
    //         ...data,
    //         status:+e.target.value
    //     })
    // }
    const handleIsDisplay = (e)=>{
        setData({
            ...data,
            is_display:+e.target.value
        })
    }
    return (
        <Modal show={props.isShowEdit} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập Nhật</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tên*</Form.Label>
                        {/* {console.log(data.status)} */}
                        {/* {console.log(data.name)} */}
                        <Form.Control onChange={(e) => handleNameChange(e)} value={data.name} type="text" placeholder="Nhập tên service" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Slug*</Form.Label>
                        <Form.Control onChange={(e) => handleSlugChange(e)} value={data.slug} type="text" placeholder="Nhập slug" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Service*</Form.Label>
                        <Form.Control onChange={(e) => handleServiceChange(e)} as="select">
                            {
                                listService.length > 0 && listService.map(function (item, index) {
                                    return (
                                        <option key={index} value={item.id} selected={item.id === data.service_management_id}>{item.name}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Hiện*</Form.Label>
                        <Form.Control onChange={(e) => handleIsDisplay(e)} as="select">
                            <option value="1" selected={data.is_display === "1" ? true: false } >TRUE</option>
                            <option value="0" selected={data.is_display === "1" ? true: false } >FALSE</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={(e) => handleSubmitEdit(e)}>
                        Xác nhận
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default Create;