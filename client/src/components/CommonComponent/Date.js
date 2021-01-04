import React, { Component } from 'react'
import { Select } from 'antd';

const { Option } = Select;
  
export default class Date extends Component {
     onChange =(value) => {
         this.props.onChangeDateBirthDay(value);
      }
    render() {
        return (
            <div>
                <Select style={{ width: 100 }}
                 showSearch
                 placeholder="Ngày"
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
                    <Option value="13">13</Option>
                    <Option value="14">14</Option>
                    <Option value="15">15</Option>
                    <Option value="16">16</Option>
                    <Option value="17">17</Option>
                    <Option value="18">18</Option>
                    <Option value="19">19</Option>
                    <Option value="20">20</Option>
                    <Option value="21">21</Option>
                    <Option value="22">22</Option>
                    <Option value="23">23</Option>
                    <Option value="24">24</Option>
                    <Option value="25">25</Option>
                    <Option value="26">26</Option>
                    <Option value="27">27</Option>
                    <Option value="28">28</Option>
                    <Option value="29">29</Option>
                    <Option value="30">30</Option>
                    <Option value="31">31</Option>
                </Select>
            </div>
        )
    }
}
