import React, { Component } from 'react'
import App from './App'
export default class ManergerRole extends Component {
    render() {
        return (
            <div>
        <App
         urlGetListAction = 'https://employee.tuoitre.vn/api/action'
         urlGetListService = 'https://employee.tuoitre.vn/api/service-management'
         urlGetListTable = 'https://employee.tuoitre.vn/api/table-management'
         urlGetListActionTable = 'https://employee.tuoitre.vn/api/list/table-management/fe'
         urlGetListActionTableTarget =
           'https://employee.tuoitre.vn/api/table-management/actions/fe'
         urlStoreActionTable = 'https://employee.tuoitre.vn/api/table-management/actions'
         urlRemoveActionTable =
           'https://employee.tuoitre.vn/api/table-management/actions/remove'
        ></App>
            </div>
        )
    }
}
