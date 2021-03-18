import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import IndexAction from './components/action'
import IndexTable from './components/table'
import IndexService from './components/service'
import AssignAction from './components/action-table/assign-action'

import './style.css'
function App(props) {
  const [currentComponent, setCurrentComponent] = useState('Service')
  const [isShow, setIsShow] = useState(false)

  const listComponents = ['Service', 'Table', 'Action']
  const urlGetListAction = props.urlGetListAction
  const urlGetListService = props.urlGetListService
  const urlGetListTable = props.urlGetListTable
  const urlGetListActionTable = props.urlGetListActionTable
  const urlGetListActionTableTarget = props.urlGetListActionTableTarget
  const urlStoreActionTable = props.urlStoreActionTable
  const urlRemoveActionTable = props.urlRemoveActionTable

  const handleClick = (e, item) => {
    setCurrentComponent(item)
  }

  const handleShow = (e) => {
    setIsShow(true)
  }
  const handleClose = () => {
    setIsShow(false)
  }
  return (
    <div className='App service-management'>
      <Container fluid>
        <Row>
          <Col md={12}>
            <Breadcrumb>
              {listComponents.length > 0 &&
                listComponents.map(function (item, index) {
                  return (
                    <Breadcrumb.Item
                      key={index}
                      onClick={(e) => handleClick(e, item)}
                      active={currentComponent === item}
                    >
                      {item}
                    </Breadcrumb.Item>
                  )
                })}
              <Breadcrumb.Item onClick={(e) => handleShow(e)}>
                Gán Action Cho Table
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {currentComponent === 'Action' && (
              <IndexAction urlGetListAction={urlGetListAction} />
            )}
            {currentComponent === 'Service' && (
              <IndexService urlGetListService={urlGetListService} />
            )}
            {currentComponent === 'Table' && (
              <IndexTable
                urlGetListTable={urlGetListTable}
                urlGetListService={urlGetListService}
                urlGetListAction={urlGetListAction}
              />
            )}
            {
              <AssignAction
                urlGetListTable={urlGetListTable}
                urlGetListService={urlGetListService}
                urlGetListAction={urlGetListAction}
                urlGetListActionTable={urlGetListActionTable}
                urlGetListActionTableTarget={urlGetListActionTableTarget}
                urlStoreActionTable={urlStoreActionTable}
                urlRemoveActionTable={urlRemoveActionTable}
                handleClose={handleClose}
                isShow={isShow}
              />
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
