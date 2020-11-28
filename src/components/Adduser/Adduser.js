import React, { Component } from 'react'
import {connect} from "react-redux";
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import {  Form, Input, Select, DatePicker } from 'antd';
import { Button,Tabs} from "antd";
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userAction';
import "./Adduser.css"
const { TabPane } = Tabs;
class Adduser extends Component {
    state = {
      name: this.props.userEditing? this.props.userEditing.name: null,
      position: this.props.userEditing? this.props.userEditing.position: null,
      email: this.props.userEditing? this.props.userEditing.email: null,
      phone: this.props.userEditing? this.props.userEditing.phone:null,
      sex: this.props.userEditing? this.props.userEditing.sex:null,
      birthday: this.props.userEditing? this.props.userEditing.birthday:null,
      lever: this.props.userEditing? this.props.userEditing.lever:null,
      school: this.props.userEditing? this.props.userEditing.school:null
    }
    onClose = () =>{
        this.props.onCloseAdduser()
    }
    onFinish = (values) => {
      const { userActionCreator } = this.props;
      const { addUser } = userActionCreator;
      addUser(values);
      this.onClose();
    };
    onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <Drawer
            title="Create a new account"
            height={720}
            onClose={this.onClose}
            visible={this.props.visibleAdduser}
            bodyStyle={{ paddingBottom: 80 }}
            placement="top"
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.onClose} type="primary">
                  Submit
                </Button>
              </div>
            }
          >
           <Form

      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="name"
        defaultValue={ this.state.name }
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="position"
        defaultValue={ this.state.position }
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="email"
        defaultValue={ this.state.email }
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="phone"
        defaultValue={ this.state.phone }
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="sex"
        defaultValue={ this.state.sex }
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="birthday"
        defaultValue={ this.state.birthday }
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="lever"
        defaultValue={ this.state.lever }
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="school"
        name="school"
        defaultValue={ this.state.school }
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
            <Tabs>
                  <TabPane tab="Thông tin chung" key="1">
                    Content of Tab 1
                  </TabPane>
                  <TabPane tab="Quá trình công tác" key="2">
                    Content of Tab 2
                  </TabPane>
                  <TabPane tab="Trình độ" key="3">
                    Content of Tab 3
                  </TabPane>
                  <TabPane tab="Thông tin thêm" key="4">
                    Content of Tab 3
                  </TabPane>
            </Tabs>
          </Drawer>
        )
    }
}
const mapStateToProps = (state) =>({
  user: state.userReducer.listUser,
  userEditing: state.userReducer.userEditing
})
const mapDispatchToProps = (dispatch) => ({
  userActionCreator: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Adduser)
