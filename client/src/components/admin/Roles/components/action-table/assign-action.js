import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import * as ApiHelper from '../../Helper';
import Card from 'react-bootstrap/Card';
import TreeTransfer from "./transfer";
import TreeTransferTarget from "./transfer_target";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AssignAction(props) {
    const [listTable, setListTable] = useState({});
    const [listActionTableTarget, setListActionTableTarget] = useState({});
    const [data, setData] = useState([]);
    const [dataTarget, setDataTarget] = useState([]);

    const getListActionTableTarget = () => {
        ApiHelper.callAxios(props.urlGetListActionTableTarget,'GET', {})
            .then(data => {
                setListActionTableTarget(data)
            });
    }
    const getListActionTable = () => {
        ApiHelper.callAxios(props.urlGetListActionTable,'GET', {})
            .then(data => {
                setListTable(data)
            });
    }
    useEffect(function () {
        getListActionTable();
        getListActionTableTarget();
    },[])

    const handleChangeTableCheckboxTarget = (e, actions) => {
        const index = dataTarget.findIndex(x=> x.id === parseInt(e.target.value))
        console.log(index)
        if(index === -1){
            setDataTarget([
                    ...dataTarget,
                    {
                        id: parseInt(e.target.value),
                        actions: convertListActions(actions)
                    }
                ]
            )
            e.target.parentNode.parentNode.nextSibling.classList.remove('hidden-transfer')
            e.target.parentNode.parentNode.childNodes[0].classList.add('down')
        }else{
            setDataTarget([
                    ...dataTarget.slice(0, index),
                    ...dataTarget.slice(index + 1)
                ]
            )
            e.target.parentNode.parentNode.nextSibling.classList.add('hidden-transfer')
            e.target.parentNode.parentNode.childNodes[0].classList.remove('down')
        }
    }
    console.log(dataTarget)
    const handleChangeActionCheckboxTarget = (e, indexParent, idParent) => {
        if(indexParent !== -1){
            const indexAction = dataTarget[indexParent].actions.findIndex(x => x === parseInt(e.target.value));
            if(indexAction === -1){
                setDataTarget(
                    [
                        ...dataTarget.slice(0, indexParent),
                        {
                            ...dataTarget[indexParent],
                            actions: [
                                ...dataTarget[indexParent].actions,
                                parseInt(e.target.value)
                            ]
                        },
                        ...dataTarget.slice(indexParent + 1),
                    ]
                )
            }else{
                setDataTarget(
                    [
                        ...dataTarget.slice(0, indexParent),
                        {
                            ...dataTarget[indexParent],
                            actions: [
                                ...dataTarget[indexParent].actions.slice(0, indexAction),
                                ...dataTarget[indexParent].actions.slice(indexAction + 1),
                            ]
                        },
                        ...dataTarget.slice(indexParent + 1),
                    ]
                )
            }
        }else{
            setDataTarget([
                    ...data,
                    {
                        id: idParent,
                        actions: [parseInt(e.target.value)]
                    }
                ]
            )
        }
        // console.log(e.target.value)
    }

    const convertListActions = (actions) => {
        return actions.map(function (item, index) {
            return item.id
        })
    }

    const handleChangeTableCheckbox = (e, actions) => {
        const index = data.findIndex(x=> x.id === parseInt(e.target.value))
        console.log()
        if(index === -1){
            setData([
                    ...data,
                    {
                        id: parseInt(e.target.value),
                        actions: convertListActions(actions)
                    }
                ]
            )
            e.target.parentNode.parentNode.nextSibling.classList.remove('hidden-transfer')
            e.target.parentNode.parentNode.childNodes[0].classList.add('down')
        }else{
            setData([
                    ...data.slice(0, index),
                    ...data.slice(index + 1)
                ]
            )
            e.target.parentNode.parentNode.nextSibling.classList.add('hidden-transfer')
            e.target.parentNode.parentNode.childNodes[0].classList.remove('down')
        }
    }
    const handleChangeActionCheckbox = (e, indexParent, idParent) => {
        if(indexParent !== -1){
            const indexAction = data[indexParent].actions.findIndex(x => x === parseInt(e.target.value));
            if(indexAction === -1){
                setData(
                    [
                        ...data.slice(0, indexParent),
                        {
                            ...data[indexParent],
                            actions: [
                                ...data[indexParent].actions,
                                parseInt(e.target.value)
                            ]
                        },
                        ...data.slice(indexParent + 1),
                    ]
                )
            }else{
                setData(
                    [
                        ...data.slice(0, indexParent),
                        {
                            ...data[indexParent],
                            actions: [
                                ...data[indexParent].actions.slice(0, indexAction),
                                ...data[indexParent].actions.slice(indexAction + 1),
                            ]
                        },
                        ...data.slice(indexParent + 1),
                    ]
                )
            }
        }else{
            setData([
                    ...data,
                    {
                        id: idParent,
                        actions: [parseInt(e.target.value)]
                    }
                ]
            )
        }
        // console.log(e.target.value)
    }
    const handleAssign = (e) => {
        ApiHelper.callAxios(props.urlStoreActionTable, 'POST', {}, {'table_managements': data})
            .then(res => {
                console.log(res)
                getListActionTable()
                setData([])
                getListActionTableTarget()
            })
    }
    const handleRemove = (e) => {
        ApiHelper.callAxios(props.urlRemoveActionTable, 'DELETE', {}, {'table_managements': dataTarget})
            .then(res => {
                console.log(res)
                getListActionTable()
                setDataTarget([])
                getListActionTableTarget()
            })
    }
    return(
        <div>
            <Modal size="lg" show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Gán Action Cho Table Management</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row style={{marginLeft:'10px'}}>
                            <Col md={5}>
                                <Card border="primary" style={{ width: '20rem', height:'30rem', overflow:'scroll' }}>
                                    <Card.Header>Danh sách chưa được gán action</Card.Header>
                                    <Card.Body>
                                        <TreeTransfer
                                            handleChangeTableCheckbox={handleChangeTableCheckbox}
                                            handleChangeActionCheckbox={handleChangeActionCheckbox}
                                            handleAssign={handleAssign}
                                            listSourceTable={listTable}
                                            data={data}
                                            direction='left'
                                        >
                                        </TreeTransfer>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={1}>
                                <div className="btn-group-assign" style={{marginTop:'11rem', marginLeft:'15px'}}>
                                    <Button onClick={handleAssign} variant='primary' style={{marginBottom:'5px', width:'45px', padding:'5px'}}>Gán</Button>
                                    <Button onClick={handleRemove} variant='dark' style={{width:'45px', padding:'5px'}}>Gỡ</Button>
                                </div>
                            </Col>
                            <Col md={5}>
                                <Card border="dark" style={{ width: '20rem', height:'30rem', overflow:'scroll' }}>
                                    <Card.Header>Danh sách đã được gán action</Card.Header>
                                    <Card.Body>
                                        <TreeTransferTarget
                                            handleChangeTableCheckboxTarget={handleChangeTableCheckboxTarget}
                                            handleChangeActionCheckboxTarget={handleChangeActionCheckboxTarget}
                                            handleAssign={handleAssign}
                                            listSourceTable={listActionTableTarget}
                                            dataTarget={dataTarget}
                                            direction='right'
                                        >
                                        </TreeTransferTarget>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AssignAction;