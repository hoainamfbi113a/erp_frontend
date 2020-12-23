import React, { Component } from 'react'
import { Select } from 'antd';
const { Option } = Select;
export default class Month extends Component {
    onChange =(value) => {
        this.props.onChangeMonthBirthDay(value);
     }
    render() {
        return (
            <div>
                <Select style={{ width: 100 }}
                 showSearch
                 placeholder="Tháng"
                 optionFilterProp="children"
                 onChange={this.onChange}
                 filterOption={(input, option) =>
                   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                 }
                >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                </Select>
            </div>
        )
    }
}
