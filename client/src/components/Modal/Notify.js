import {Form, Input, Modal,Button,message } from "antd";
import axiosConfig from "../../apis/axios";
import React, { Component } from 'react'

export default class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reasonDeny:null,
        }
    }
    onFinish = async (values) => {
        await axiosConfig
          .put(`/api/profiles/${this.props.pro_id}`, {
            user_id: idUser,
            reject: 1,
            action:"confirm",
            notify_content:values.reasonDeny
          })
          .then((res) => {
            console.log(res);
            if (res.message) {
              message.success("Từ chối thông tin nhân sự thành công");
              window.location.href="hhttp://erp.tuoitre.vn/crm/admin/user"
            }
          });
      };
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
    render() {
        return (
            <div>
            <Modal
              title="Lý do từ chối"
              // visible={props.actionModal}
              visible="true"
              onOk={this.onSubmitModal}
              onCancel={this.hideModal}
              okText=" "
              cancelText="Đóng form"
              width={600}
            >
              <Form
                style={{ width: "100%" }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                method="post"
              >
                <ul style={{ marginLeft: "23px",width: "100%" }}>
                  <li className="tabs-main-left-li">
                    <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                    <Form.Item
                          label="Mời bạn nhập lý do từ chối hồ sơ nhân viên"
                          name="reasonDeny"
                          rules={[{ required: true, message: 'Bạn hãy nhập lý do từ chối hồ sơ' }]}
                      >
                        <Input
                        name="reasonDeny"
                        onChange={this.onChange}
                        placeholder="Lý do từ chối"
                      />
                      </Form.Item>
                      <Form.Item >
                          <Button type="primary" htmlType="submit">
                          Gửi lời từ chối
                          </Button>
                      </Form.Item>
                    </div>
                  </li>
                </ul>
              </Form>
            </Modal>
          </div>
        )
    }
}

