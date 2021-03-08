import React from 'react'

import { TTFormBuilder } from '@tuoitre/form-builder'
import '@tuoitre/form-builder/dist/index.css'

const FormBuilder = () => {
  return (
    <div>
    {/* <TTFormBuilder 
    urlGetListTypeDoc='/api/document-type/get-document-types'
    apiKey=''
    urlCreate='/api/document-template/store'
    urlDelete='http://tthr.local/api/profiles/'
    urlGetForm='/api/document-template/get'
    /> */}
     <div>
      <TTFormBuilder 
      urlSearchTypeDoc='https://document.tuoitre.vn/api/document-type/search'
      urlGetListTypeDoc='https://document.tuoitre.vn/api/document-type/get-document-types'
      apiKey=''
      urlCreate='https://document.tuoitre.vn/api/document-template/store'
      urlDelete='http://tthr.local/api/profiles/'
      urlGetForm='https://document.tuoitre.vn/api/document-template/get'
      />
    </div>
  </div>
  )

}
export default FormBuilder;