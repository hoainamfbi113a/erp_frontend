import React, { Component } from "react";
import * as Constant from "constant/ConstantDocument";

import * as ApiHelper from "helpers/ApiHelper";
import { withRouter } from "react-router-dom";
import { Input } from 'antd';
import { Typography } from "antd";
import { Radio } from "antd";
const { Title } = Typography;
const { TextArea } = Input;
function RenderInputPreview(props) {
    var data = "";
    switch (props.data.type) {
      case Constant.INPUT_TYPE_HEADER:
        data = (
          <div className="form-group">
            {/* <Title level={props.data.subtype.slice(1, 2)}> */}
            <Title style={{textAlign:`center`}} level={3}>
              {props.data.label}
            </Title>
          </div>
        );
        break;
      case Constant.INPUT_TYPE_PARAGRAPH:
        data = (
          <div className="form-group">
            <p>{props.data.label}</p>
          </div>
        );
        break;
      case Constant.INPUT_TYPE_TEXTFIELD:
        data = (
          <div className="form-group">
            <label className="control-label">{props.data.label}: </label>
            {props.create == false && <span style={{fontWeight:'bold'}}> {props.value}</span>}
            {props.create == true && <Input
              disabled = {props.create == false ? true: false}
              type="text"
              name={props.data.name}
              placeholder={props.data.placeHolder}
              className="form-control"
              onChange={(event) => props.handleChange(event, props.data.id)}
              value={props.value}
            />}
            
          </div>
        );
        break;
      case Constant.INPUT_TYPE_AREA:
        data = (
          <div className="form-group">
            <label className="control-label">{props.data.label}: </label>
            {props.create == false && <span style={{fontWeight:'bold'}}> {props.value}</span>}
            {props.create == true &&  <TextArea
              disabled = {props.create == false ? true: false}
              rows="5"
              value={props.value}
              onChange={(event) => props.handleChange(event, props.data.id)}
              name={props.data.name}
              placeholder={props.data.placeHolder}
              className="form-control"
            />}
          </div>
        );
        break;
      case Constant.INPUT_TYPE_SELECT:
        data = (
          <div className="form-group">
            <label className="control-label">{props.data.label}</label>
            <select
              value={props.value}
              onChange={(event) => props.handleChange(event, props.data.id)}
              className="form-control"
              name={props.data.name}
            >
              {typeof props.data.values !== "undefined" &&
                props.data.values.length > 0 &&
                props.data.values.map((item, index) => (
                  <option value={item.value}>{item.label}</option>
                ))}
            </select>
          </div>
        );
        break;
      case Constant.INPUT_TYPE_RADIO:
        {
          var selectedRadio = "";
          for (let item of props.data.values) {
            if (item.selected === true) {
              selectedRadio = item.value;
            }
          }
        }
        data = (
          <div className="form-group">
            <label className="control-label">{props.data.label} </label>
            {console.log(props.data.value)}
            <Radio.Group
              style={{ display: "block" }}
              name={props.data.name}
              defaultValue={props.data.value ? props.data.value.toString():""}
              onChange={(event) => props.handleChange(event, props.data.id)}
            >
              {typeof props.data.values !== "undefined" &&
                props.data.values.length > 0 &&
                props.data.values.map((item, index) => (
                  <Radio style={{ display: "block" }} value={item.value}>
                    {item.label}
                  </Radio>
                ))}
            </Radio.Group>
          </div>
        );
        break;
      case Constant.INPUT_TYPE_CHECKBOX:
        data = (
          <div className="form-group">
            <label className="control-label">{props.data.label}: </label>
            {typeof props.data.values !== "undefined" &&
              props.data.values.length > 0 &&
              props.data.values.map((item, index) => (
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      // defaultChecked={item.selected}
                      checked={
                        props.value && props.value.length > 0 && props.value.includes(item.value)
                      }
                      onChange={(event) =>
                        props.handleCheckboxChange(event, props.data.id)
                      }
                      className="form-check-input"
                      name={props.data.name}
                      value={item.value}
                    />
                    {item.label}
                  </label>
                </div>
              ))}
          </div>
        );
        break;
      case Constant.INPUT_TYPE_EMAIL:
        data = (
          <div className="form-group">
            <label className="control-label">{props.data.label}</label>
            <input
              type="email"
              onChange={(event) => props.handleChange(event, props.data.id)}
              name={props.data.name}
              placeholder={props.data.placeHolder}
              className="form-control"
            />
          </div>
        );
        break;
      case Constant.INPUT_TYPE_NUMBER:
        data = (
          <div className="form-group">
          <label className="control-label">{props.data.label}: </label>
          {props.create == false && <span style={{fontWeight:'bold'}}> {props.value}</span>}
          {props.create == true &&
              <input
              type="number"
              onChange={(event) => props.handleChange(event, props.data.id)}
              name={props.data.name}
              placeholder={props.data.placeHolder}
              className="form-control"
              value={props.data.value}
          />}
        </div>
          // <div className="form-group">
          //   <label className="control-label">{props.data.label}: </label>
          //   <input
          //     type="number"
          //     onChange={(event) => props.handleChange(event, props.data.id)}
          //     name={props.data.name}
          //     placeholder={props.data.placeHolder}
          //     className="form-control"
          //     value={props.data.value}
          //   />
          // </div>
        );
        break;
      case Constant.INPUT_TYPE_PASSWORD:
        data = (
          <div className="form-group">
            <label className="control-label">{props.data.label}</label>
            <input
              type="password"
              onChange={(event) => props.handleChange(event, props.data.id)}
              name={props.data.name}
              placeholder={props.data.placeHolder}
              className="form-control"
            />
          </div>
        );
        break;
      case Constant.INPUT_TYPE_DATE:
        data = (
          <div className="form-group">
            <label className="control-label">{props.data.label}: </label>
            {props.create == false && <span style={{fontWeight:'bold'}}> {props.value}</span>}
            {props.create == true &&
            <input
              type="date"
              onChange={(event) => props.handleChange(event, props.data.id)}
              name={props.data.name}
              value ={props.data.value}
              disabled = {props.create == false ? true: false}
              className="form-control"
            />}
          </div>
        );
        break;
      // case Constant.INPUT_TYPE_BUTTON :
      //     data = <button onClick={props.handleClick} name={props.data.name} type="submit" className={props.data.btnClass}>{props.data.btnValue}</button>
      //     break;
      default:
    }
    return data;
  }
  export default RenderInputPreview
  