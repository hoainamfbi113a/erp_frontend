import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import * as ApiHelper from '../../Helper';

function Create(props) {
    const [data, setData] = useState({});
    const [listService, setListService] = useState({});
    const [id, setId] = useState({});
    useEffect(function () {
        setData({
            name: props.data.name,
            slug: props.data.slug,
            service_management_id: props.data.service_management_id,
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
    return (
        <Modal show={props.isShowEdit} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập Nhật</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tên*</Form.Label>
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