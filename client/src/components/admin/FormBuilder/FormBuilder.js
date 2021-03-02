import React from 'react'

import { TTFormBuilder } from '@tuoitre/form-builder'
// import '@tuoitre/form-builder/dist/index.css'

const FormBuilder = () => {
  return (
    <div>
    <TTFormBuilder 
    urlGetListTypeDoc='/api/document-type/get-document-types'
    apiKey=''
    urlCreate='/api/document-template/store'
    urlDelete='http://tthr.local/api/profiles/'
    urlGetForm='/api/document-template/get'
    />
  </div>
  )

}
export default FormBuilder;