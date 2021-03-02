import React from 'react'

import { TTFormBuilder } from '@tuoitre/form-builder'
import '@tuoitre/form-builder/dist/index.css'

const FormBuilder = () => {
  return (
    <div>
    <TTFormBuilder 
    urlGetListTypeDoc='https://document.tuoitre.vn/api/document-type/get-document-types'
    apiKey=''
    urlCreate='https://document.tuoitre.vn/api/document-template/store'
    urlDelete='http://tthr.local/api/profiles/'
    urlGetForm='https://document.tuoitre.vn/api/document-template/get'
    />
  </div>
  )

}
export default FormBuilder;