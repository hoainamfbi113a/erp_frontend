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
        title="Tạo phiếu đề xuất"
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
              <span className="tabs-user-infor-top">Nội dung đề xuất</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
              <TextArea placeholder="Nội dung đề xuất" autoSize={{ minRows: 7, maxRows: 15 }} />
                {/* <Input
                  name="phone"
                  // defaultValue={ this.state.pro_resident }
                //   onChange={this.onChange}
                  // placeholder="Thuộc đảng bộ"
                /> */}
              </div>
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Lý do đề xuất</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
              <TextArea placeholder="Lý do đề xuất" autoSize={{ minRows: 4, maxRows: 15 }} />
                {/* <Input
                  name="email"
                  // defaultValue={ this.state.pro_resident }
                //   onChange={this.onChange}
                  // placeholder="Thuộc đảng bộ"
                /> */}
              </div>
            </li>
          </ul>
        </form>
      </Modal>
    </div>
  );
}

export default ProposalForm;
