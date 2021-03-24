import React from 'react'

import '@tuoitre/flowchart-builder/dist/index.css'
import { TTFlow } from '@tuoitre/flowchart-builder'

const Workflow = () => {
  return <TTFlow urls={{
    get_list_document_types: 'https://document.tuoitre.vn/api/document-type/get-document-types',
    get_one_document_type: 'https://document.tuoitre.vn/api/document-type/get',
    get_workflow_detail: 'https://workflow.tuoitre.vn/api/workflow/detail',
    store_work_flow: 'https://workflow.tuoitre.vn/api/workflow/store',
    get_list_departments: 'https://employee.tuoitre.vn/api/departments?per_page=100',
    get_list_positions: 'https://employee.tuoitre.vn/api/positions?per_page=100',
    get_list_actions: 'https://employee.tuoitre.vn/api/list/actions/dep/pos/tab'

    // get_list_document_types: '/api/document-type/get-document-types',
    // get_one_document_type: '/api/document-type/get',
    // get_workflow_detail: '/api/workflow/detail',
    // store_work_flow: '/api/workflow/store',
    // get_list_departments: '/api/departments?page=all',
    // get_list_positions: '/api/positions?page=all',
    // get_list_actions: '/api/list/actions/dep/pos/tab'
  }}tableId={11} />
}

export default Workflow
