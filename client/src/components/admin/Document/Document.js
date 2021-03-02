import React, { Component } from 'react'

import {TTDocument} from '@tuoitre/document-fe'
import '@tuoitre/document-fe/dist/index.css'

class Document extends Component {
  render() {
      return <TTDocument
    urlGetDataDoc='https://document.tuoitre.vn/api/document/get'
    urlGetForm='https://document.tuoitre.vn/api/document-template/get'
    urlGetList='https://document.tuoitre.vn/api/document/list'
    urlGetListTypeDoc='https://document.tuoitre.vn/api/document-type/get-document-types'
    urlCreate='https://document.tuoitre.vn/api/document/store'
    urlUpdate='https://document.tuoitre.vn/api/document/update'
    urlDelete='https://document.tuoitre.vn/api/document/delete/'
    user_id={1}
    />

  }
}
export default Document