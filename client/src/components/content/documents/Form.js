import React, { Component } from "react";
import classes from "classnames";
import * as Constant from "constant/ConstantDocument";
import * as ApiHelper from "helpers/ApiHelper";
import axios from "axios";
import { withRouter } from 'react-router-dom';
// import Button from "react-bootstrap/Button";

function RenderInputPreview(props) {
  var data = "";
  switch (props.data.type) {
    case Constant.INPUT_TYPE_TEXTFIELD:
      data = (
        <div className="form-group">
          <label className="control-label">{props.data.label}</label>
          <input
            type="text"
            name={props.data.name}
            placeholder={props.data.placeHolder}
            className="form-control"
            onChange={(event) => props.handleChange(event, props.data.id)}
            value={props.value}
          />
        </div>
      );
      break;
    case Constant.INPUT_TYPE_AREA:
      data = (
        <div className="form-group">
          <label className="control-label">{props.data.label}</label>
          <textarea
            rows="5"
            value={props.value}
            onChange={(event) => props.handleChange(event, props.data.id)}
            name={props.data.name}
            placeholder={props.data.placeHolder}
            className="form-control"
          />
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
            {typeof props.data.options !== "undefined" &&
              props.data.options.length > 0 &&
              props.data.options.map((item, index) => (
                <option value={item.value}>{item.option}</option>
              ))}
          </select>
        </div>
      );
      break;
    case Constant.INPUT_TYPE_RADIO:
      data = (
        <div className="form-group">
          <label className="control-label">{props.data.label}</label>
          {typeof props.data.options !== "undefined" &&
            props.data.options.length > 0 &&
            props.data.options.map((item, index) => (
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    checked={props.value === item.value}
                    // checked={props.data.options.findIndex(x => x.value === item.value) != -1}
                    onChange={(event) =>
                      props.handleChange(event, props.data.id)
                    }
                    type="radio"
                    className="form-check-input"
                    name={props.data.name}
                    value={item.value}
                  />
                  {item.option}
                </label>
              </div>
            ))}
        </div>
      );
      break;
    case Constant.INPUT_TYPE_CHECKBOX:
      data = (
        <div className="form-group">
          <label className="control-label">{props.data.label}</label>'
          {typeof props.data.options !== "undefined" &&
            props.data.options.length > 0 &&
            props.data.options.map((item, index) => (
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    checked={
                      props.value.length > 0 && props.value.includes(item.value)
                    }
                    onChange={(event) =>
                      props.handleCheckboxChange(event, props.data.id)
                    }
                    className="form-check-input"
                    name={props.data.name}
                    value={item.value}
                  />
                  {item.option}
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
          <label className="control-label">{props.data.label}</label>
          <input
            type="number"
            onChange={(event) => props.handleChange(event, props.data.id)}
            name={props.data.name}
            placeholder={props.data.placeHolder}
            className="form-control"
          />
        </div>
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
          <label className="control-label">{props.data.label}</label>
          <input
            type="date"
            onChange={(event) => props.handleChange(event, props.data.id)}
            name={props.data.name}
            className="form-control"
          />
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

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listInputs: [],
      inputsData: [],
      documentData: {},
    };
  }
  handleCheckboxChange = (e, inputId, isChecked) => {
    const stateInputsData = this.state.inputsData;
    var index = stateInputsData.findIndex((x) => x.id === inputId);
    if (index != -1) {
      let check = stateInputsData[index].value.includes(e.target.value);
      let index2 = stateInputsData[index].value.findIndex(
        (x) => x === e.target.value
      );
      if (check === false) {
        this.setState({
          inputsData: [
            ...stateInputsData.slice(0, index),
            {
              id: inputId,
              value: [...stateInputsData[index].value, e.target.value],
            },
            ...stateInputsData.slice(index + 1),
          ],
        });
      } else {
        this.setState({
          inputsData: [
            ...stateInputsData.slice(0, index),
            {
              id: inputId,
              value: [
                ...stateInputsData[index].value.slice(0, index2),
                ...stateInputsData[index].value.slice(index2 + 1),
              ],
            },
            ...stateInputsData.slice(index + 1),
          ],
        });
      }
    } else {
      this.setState({
        inputsData: [
          ...stateInputsData,
          {
            id: inputId,
            value: [e.target.value],
          },
        ],
      });
    }
  };
  handleChange = (e, inputId) => {
    this.setState({ [e.target.name]: e.target.value })
    const stateInputsData = this.state.inputsData;
    var index = stateInputsData.findIndex((x) => x.id === inputId);
    if (index != -1) {
      this.setState({
        inputsData: [
          ...stateInputsData.slice(0, index),
          {
            id: inputId,
            value: e.target.value,
          },
          ...stateInputsData.slice(index + 1),
        ],
      });
    } else {
      this.setState({
        inputsData: [
          ...stateInputsData,
          {
            id: inputId,
            value: e.target.value,
          },
        ],
      });
    }
  };
  // handleClick = (e) => {
  //   var data = {
  //     template_id: this.state.documentData.itemForm.id,
  //     inputs: this.state.listInputs,
  //   };
  // };
  componentWillMount() {
    this.setState({
      documentData: this.props.documentData,
    });
    if (
      this.props.inputsData !== undefined &&
      this.props.inputsData.length > 0
    ) {
      this.setState({
        inputsData: this.props.inputsData,
      });
    }
    if (this.props.data_document_id !== undefined) {
      let params = {
        id: this.props.data_document_id,
      };
      ApiHelper.callAxios(this.props.urlGetDataDoc, "get", params)
        .then((data) => {
          this.setState({
            inputsData: data.inputs,
            listInputs: data.inputs,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let params = {
        type_id: 2,
      };
      // ApiHelper.callAxios(this.props.urlGetForm, "get", params)
      const id = this.props.match.params.id
      axios.get(`https://document.tuoitre.vn/api/document-template/get?type_id=${id}`)
        .then((data) => {
          
          if(data.data.inputs.length === 0) {
            alert("Template chưa được tạo")
            this.props.history.push(`/notification/create`);
          }
          this.setState({
            listInputs: data.data.inputs,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  render() {
    const { listInputs, inputsData } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
          <button
              onClick={(e) => this.handleSubmit(e, this.props.action)}
              // variant="success"
            >
              Submits
            </button>
            <button
              style={{ marginLeft: 20 + "px" }}
              onClick={this.props.handleBackBtn}
              // variant="primary"
            >
              Back
            </button>
          </div>
          <div className="col-md-8"></div>
        </div>
        <div className="row">
          <div className="col-md-12 form-builder-area card gridify tiny dropTarget">
            {listInputs.length > 0 &&
              listInputs.map((item, index) => {
                var data = inputsData.find((x) => x.id == item.id);
                var data2 = inputsData.filter((x) => x.id == item.id);
                var value = "";
                if (data !== undefined) {
                  value = data.value;
                }

                return (
                  <div
                    className={classes({ preview: false })}
                    key={item.id}
                    style={{
                      width: "200px",
                      position: "absolute",
                      zIndex: 3,
                      top: item.y,
                      left: item.x,
                    }}
                    data-index={index}
                  >
                    <RenderInputPreview
                      data={item}
                      value={value}
                      value2={data2}
                      handleTextChange={this.handleTextChange}
                      handleChange={this.handleChange}
                      handleCheckboxChange={this.handleCheckboxChange}
                      // handleClick={this.handleClick}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
