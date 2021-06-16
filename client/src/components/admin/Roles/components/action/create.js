import React, {Fragment, useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import * as ApiHelper from "../../Helper";
function Create(props) {
    const [data, setData] = useState({});
    const handleSubmit = (e) => {
        ApiHelper.callAxios(props.urlGetListAction, 'POST', {}, data)
            .then(res => {
                props.handleAfterSubmit(e, res.data);
            })
    }
    const handleNameChange = (e) => {
        setData({
            ...data,
            name: e.target.value
        });
    }

    const handleNoteChange = (e) => {
        setData({
            ...data,
            note: e.target.value
        });
    }
    return (
        <div>
        <Modal show={props.isShow} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Action</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tên*</Form.Label>
                        <Form.Control required onChange={(e) => handleNameChange(e)} value={data.name} type="text" placeholder="Nhập tên action" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control onChange={(e) => handleNoteChange(e)} value={data.note} rows={3} as="textarea" placeholder="Nhập ghi chú" />
                    </Form.Group>
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>
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
        </div>
    );
}
export default Create;