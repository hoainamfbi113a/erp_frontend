import React from 'react'

import '@tuoitre/flowchart-builder/dist/index.css'
import { TTFlow } from '@tuoitre/flowchart-builder'

const Workflow = () => {
  return <TTFlow urls={{
    workflowTypesUrl : '/api/workflow/get-workflow-types',
    storeStepsUrl:'/api/workflow/store',
    workflowDetailUrl:'/api/workflow/detail?type=',
    targetTypeUrl : '/api/step/get-action-target-types',
    actionTypeUrl : '/api/step/get-action-types',
  }} />
}

export default Workflow
