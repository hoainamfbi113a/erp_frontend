import React from "react";
import { Input, Modal } from "antd";
const { TextArea } = Input;
function ProposalForm(props) {
   const hideModal = () => {
        props.hideModal()
   };
   const onSubmit = () =>{

   }
  return (
    <div>
      <Modal
        title={props.title}
        visible={props.showProposal}
        onOk={onSubmit}
        onCancel={hideModal}
        okText="OK"
        cancelText="Cancel"
        width={600}
      >
        <form
          style={{ width: "100%" }}
          className="tabs-main tabs-main-modal"
          noValidate
          onSubmit={onSubmit}
          method="post"
        >
          <ul style={{ marginLeft: "23px",width: "100%" }}>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Nội dung {props.title}</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
              <TextArea placeholder="`Nội dung" autoSize={{ minRows: 7, maxRows: 15 }} />
               
              </div>
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Lý do {props.title}</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
              <TextArea placeholder="Lý do tạo !!" autoSize={{ minRows: 4, maxRows: 15 }} />
              
              </div>
            </li>
          </ul>
        </form>
      </Modal>
    </div>
  );
}

export default ProposalForm;
