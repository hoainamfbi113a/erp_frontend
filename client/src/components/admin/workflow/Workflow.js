import React from 'react'

import '@tuoitre/flowchart-builder/dist/index.css'
import { TTFlow } from '@tuoitre/flowchart-builder'

const Workflow = () => {
  return <TTFlow urls={{
    workflowTypesUrl : 'https://workflow.tuoitre.vn/api/workflow/get-workflow-types',
    storeStepsUrl:'https://workflow.tuoitre.vn/api/workflow/store',
    workflowDetailUrl:'https://workflow.tuoitre.vn/api/workflow/detail?type=',
    targetTypeUrl : 'https://workflow.tuoitre.vn/api/step/get-action-target-types',
    actionTypeUrl : 'https://workflow.tuoitre.vn/api/step/get-action-types',
  }} />
}

export default Workflow
