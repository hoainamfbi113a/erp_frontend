import React, { Component } from "react";
import classes from "classnames";
import * as Constant from "constant/ConstantDocument";
import * as ApiHelper from "helpers/ApiHelper";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Typography } from 'antd';

const { Title } = Typography;

function RenderInputPreview(props) {
  var data = "";
  switch (props.data.type) {
    case Constant.INPUT_TYPE_HEADER:
      data = (
        <div className="form-group">
          <Title level={props.data.subtype.slice(1, 2)}>{props.data.label}</Title>
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
            // value={props.value}
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
      data = (
        <div className="form-group">
          <label className="control-label">{props.data.label}</label>
          {typeof props.data.values !== "undefined" &&
            props.data.values.length > 0 &&
            props.data.values.map((item, index) => (
              <div className="form-check">
                <label className="form-check-label">
                  {console.log(item.selected)}
                  <input
                    checked={item.selected}
                    // checked={props.data.options.findIndex(x => x.value === item.value) != -1}
                    onChange={(event) =>
                      props.handleChange(event, props.data.id)
                    }
                    // {item.selected == true ? "checked": ""}
                    type="radio"
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
    case Constant.INPUT_TYPE_CHECKBOX:
      data = (
        <div className="form-group">
          <label className="control-label">{props.data.label}</label>
          {typeof props.data.values !== "undefined" &&
            props.data.values.length > 0 &&
            props.data.values.map((item, index) => (
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    checked = {item.selected}
                    // checked={
                    //   props.value.length > 0 && props.value.includes(item.value)
                    // }
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
      create: true,
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
    this.setState({ [e.target.name]: e.target.value });
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
  componentWillMount() {
    let currentUrl = window.location.href;
    let checkUrl = "form-document-view";
    if(currentUrl.indexOf(checkUrl) !== -1) {
      this.setState({
        create:false
      })
    }
  }
  componentDidMount = ()=>{
    const id = this.props.match.params.id;
    if (this.state.create === false) {
      axios
        .get(`https://document.tuoitre.vn/api/document/get?id=${id}`)
        .then((res) => {
          this.setState({
            listInputs: res.data.inputs,
            inputsData: res.data.inputs,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let params = {
        type_id: 2,
      };
      axios
        .get(
          `https://document.tuoitre.vn/api/document-template/get?type_id=${id}`
        )
        .then((data) => {
          if (data.data.inputs.length === 0) {
            alert("Template chưa được tạo");
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
  handleSubmit = (e) => {
    // alert(this.state.create === true)
    if(this.state.create === true){
      let data = {
        template_id: this.props.match.params.template_id,
        user_id: 1,
        inputs: this.state.inputsData,
      };
      // ApiHelper.callAxios(this.props.urlCreate, "post", {}, data)
      axios
        .post("https://document.tuoitre.vn/api/document/store", data)
        .then((data) => {
          alert("Tạo tài liệu thành công!");
        })
        .catch((err) => {
          console.log(err);
          alert("Tạo tài liệu thất bại!");
        });
    } else {
      let arrValueInput = []
      for( let item of this.state.inputsData){
        if(item.value === null){
          item.value = "null"
        }
        let obj = {
          id:item.id,
          value:item.value
        } 
        arrValueInput.push(obj)
      }
      let data = {
        document_id: this.props.match.params.id,
        user_id: 1,
        inputs: arrValueInput,
      }
      axios.post("https://document.tuoitre.vn/api/document/update", data)
      .then(res=>{
        alert("update document thành công")
      })
      .catch(err=>{
        console.log(err)
        alert("update thất bại")
      })
    }
  
    // }
  };
  render() {
    const { listInputs, inputsData } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <button
              onClick={(e) => this.handleSubmit(e)}
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
                var value = "";
                if (data !== undefined) {
                  value = data.value;
                }

                return (
                  <div
                    className={classes({ preview: false })}
                    key={item.id}
                    // style={{
                    //   width: "200px",
                    //   position: "absolute",
                    //   zIndex: 3,
                    //   top: item.y,
                    //   left: item.x,
                    // }}
                    data-index={index}
                  >
                    <RenderInputPreview
                      data={item}
                      value={value}
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
