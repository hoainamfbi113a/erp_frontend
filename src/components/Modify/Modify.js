import React, { Component } from 'react'
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import { Form, Input, Select, DatePicker } from 'antd';
import { Button, Tabs } from "antd";

import "./Modify.css"
const { TabPane } = Tabs;
export default class Modify extends Component {
  onClose = () => {
    this.props.onCloseModify()
  }
  render() {
    return (
      <Drawer
        title="Create a new account"
        width={720}
        onClose={this.onClose}
        visible={this.props.visibleModify}
        bodyStyle={{ paddingBottom: 80 }}
        placement="right"
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
            name="school"
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
                    <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                  >
                    <Input placeholder="Bạn hãy nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="url"
                    label="Bút danh"
                    rules={[{ required: true, message: 'Bạn hãy nhập bút danh' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Bạn hãy nhập bút danh"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="owner"
                    label="Ngày sinh"
                    rules={[{ required: true, message: 'Bạn hãy nhập năm sinh' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Giới tính"
                    rules={[{ required: true, message: 'Bạn hãy chọn giới tính' }]}
                  >
                    <Select placeholder="Please choose the type">
                      <Option value="private">Nam</Option>
                      <Option value="public">Nữ</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="approver"
                    label="Quê quán"
                    rules={[{ required: true, message: 'Bạn hãy nhập quê quán' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Bạn hãy nhập bút danh"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateTime"
                    label="Ngày bổ nhiệm"
                    rules={[{ required: true, message: 'Bạn hãy chọn ngày bổ nhiệm' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}

                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Mô tả chi tiết"
                    rules={[
                      {
                        required: true,
                        message: 'Bạn nhập mô tả chi tiết nhân viên',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="Bạn nhập mô tả chi tiết nhân viên" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="Quá trình công tác" key="2">
            Content of Tab 2
                    <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                  >
                    <Input placeholder="Bạn hãy nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="url"
                    label="Bút danh"
                    rules={[{ required: true, message: 'Bạn hãy nhập bút danh' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Bạn hãy nhập bút danh"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="owner"
                    label="Ngày sinh"
                    rules={[{ required: true, message: 'Bạn hãy nhập năm sinh' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}

                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Giới tính"
                    rules={[{ required: true, message: 'Bạn hãy chọn giới tính' }]}
                  >
                    <Select placeholder="Please choose the type">
                      <Option value="private">Nam</Option>
                      <Option value="public">Nữ</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="approver"
                    label="Quê quán"
                    rules={[{ required: true, message: 'Bạn hãy nhập quê quán' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Bạn hãy nhập bút danh"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateTime"
                    label="Ngày bổ nhiệm"
                    rules={[{ required: true, message: 'Bạn hãy chọn ngày bổ nhiệm' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}

                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Mô tả chi tiết"
                    rules={[
                      {
                        required: true,
                        message: 'Bạn nhập mô tả chi tiết nhân viên',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="Bạn nhập mô tả chi tiết nhân viên" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="Trình độ" key="3">
            Content of Tab 3
                    <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                  >
                    <Input placeholder="Bạn hãy nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="url"
                    label="Bút danh"
                    rules={[{ required: true, message: 'Bạn hãy nhập bút danh' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Bạn hãy nhập bút danh"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="owner"
                    label="Ngày sinh"
                    rules={[{ required: true, message: 'Bạn hãy nhập năm sinh' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}

                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Giới tính"
                    rules={[{ required: true, message: 'Bạn hãy chọn giới tính' }]}
                  >
                    <Select placeholder="Please choose the type">
                      <Option value="private">Nam</Option>
                      <Option value="public">Nữ</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="approver"
                    label="Quê quán"
                    rules={[{ required: true, message: 'Bạn hãy nhập quê quán' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Bạn hãy nhập bút danh"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateTime"
                    label="Ngày bổ nhiệm"
                    rules={[{ required: true, message: 'Bạn hãy chọn ngày bổ nhiệm' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Mô tả chi tiết"
                    rules={[
                      {
                        required: true,
                        message: 'Bạn nhập mô tả chi tiết nhân viên',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="Bạn nhập mô tả chi tiết nhân viên" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="Thông tin thêm" key="4">
            Content of Tab 3
                    <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                  >
                    <Input placeholder="Bạn hãy nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="url"
                    label="Bút danh"
                    rules={[{ required: true, message: 'Bạn hãy nhập bút danh' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Bạn hãy nhập bút danh"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="owner"
                    label="Ngày sinh"
                    rules={[{ required: true, message: 'Bạn hãy nhập năm sinh' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}

                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Giới tính"
                    rules={[{ required: true, message: 'Bạn hãy chọn giới tính' }]}
                  >
                    <Select placeholder="Please choose the type">
                      <Option value="private">Nam</Option>
                      <Option value="public">Nữ</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="approver"
                    label="Quê quán"
                    rules={[{ required: true, message: 'Bạn hãy nhập quê quán' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Bạn hãy nhập bút danh"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateTime"
                    label="Ngày bổ nhiệm"
                    rules={[{ required: true, message: 'Bạn hãy chọn ngày bổ nhiệm' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}

                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Mô tả chi tiết"
                    rules={[
                      {
                        required: true,
                        message: 'Bạn nhập mô tả chi tiết nhân viên',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="Bạn nhập mô tả chi tiết nhân viên" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
        </Tabs>
      </Drawer>
    )
  }
}
