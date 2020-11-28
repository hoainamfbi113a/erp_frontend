import React, { Component } from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default class Year extends Component {
    onChange =(value) => {
        this.props.onChangeYearBirthDay(value);
     }
    render() {
        return (
            <div>
                <Select  style={{ width: 100 }}
                 showSearch
                 placeholder="Năm"
                 optionFilterProp="children"
                 onChange={this.onChange}
                 filterOption={(input, option) =>
                   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                 }
                >
                    <Option value="2000">2000</Option>
                    <Option value="2001">2001</Option>
                    <Option value="2002">2002</Option>
                    <Option value="2003">2003</Option>
                    <Option value="2004">2004</Option>
                    <Option value="2005">2005</Option>
                    <Option value="2006">2006</Option>
                    <Option value="2007">2007</Option>
                    <Option value="2008">2008</Option>
                    <Option value="2009">2009</Option>
                    <Option value="2010">2010</Option>
                    <Option value="2011">2011</Option>
                    <Option value="2012">2012</Option>
                    <Option value="2013">2013</Option>
                    <Option value="2014">2014</Option>
                    <Option value="2015">2015</Option>
                    <Option value="2016">2016</Option>
                    <Option value="2017">2017</Option>
                    <Option value="2018">2018</Option>
                    <Option value="2019">2019</Option>
                    <Option value="2020">2020</Option>
                    <Option value="2021">2021</Option>
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select>
            </div>
        )
    }
}
