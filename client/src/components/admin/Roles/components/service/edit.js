import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import * as ApiHelper from '../../Helper';

function Create(props) {
    const [data, setData] = useState({});
    const [id, setId] = useState({});
    useEffect(function () {
        setData({
            name: props.data.name,
            description: props.data.description,
            slug: props.data.slug,
            domain: props.data.domain,
        })
        setId(props.data.id)
    },[])
    const handleSubmitEdit = (e) => {
        ApiHelper.callAxios(props.urlGetListService +'/'+id, 'PUT', {}, data)
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

    const handleDomainChange = (e) => {
        setData({
            ...data,
            domain: e.target.value
        });
    }

    const handleDescriptionChange = (e) => {
        setData({
            ...data,
            description: e.target.value
        });
    }
    return (
        <Modal show={props.isShowEdit} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập Nhật Service</Modal.Title>
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
                        <Form.Label>Mô Tả</Form.Label>
                        <Form.Control onChange={(e) => handleDescriptionChange(e)} value={data.description} rows={3} as="textarea" placeholder="Nhập mô tả" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Domain</Form.Label>
                        <Form.Control onChange={(e) => handleDomainChange(e)} value={data.domain} type="text" placeholder="Nhập domain" />
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