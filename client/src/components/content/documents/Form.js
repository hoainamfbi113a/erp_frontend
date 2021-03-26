import React, { Component } from "react";
import classes from "classnames";

import axios from "axios";
import { Steps } from "antd";
const { Step } = Steps;
import RenderInputPreview from "./Input";
import { connect } from "react-redux";
import { showLoading, hideLoading} from "reduxToolkit/features/uiLoadingSlice"
import docCookies from "doc-cookies";
import axiosConfig from "apis/axios";
import { bindActionCreators } from "redux";
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listInputs: [],
      inputsData: [],
      documentData: {},
      create: true,
      valueRadio: 1,
      showModal: false,
      dataForm: null,
      dataWorkFlow: null,
      currentProcess: 0,
    };
  }
  componentDidMount = () => {
    this.props.uiActionCreatorsS();
    const id = this.props.match.params.id;
    try {
      if (this.state.create === false) {
        axios
          .get(`/api/document-process/get?process_id=${id}`)
          .then((res) => {
            let incr = 0;
            this.setState({
              currentProcess: res.data.current_step.id,
            });
          })
          .catch((err) => {});
        axios
          .get(`/api/document/get?id=${id}`)
          .then((res) => {
            this.setState({
              listInputs: res.data.inputs,
              inputsData: res.data.inputs,
            });
            axios
              .get(`/api/workflow/detail?type_id=${res.data.document_type.id}`)
              .then((res) => {
                this.setState({
                  dataWorkFlow: res.data,
                });
              })
              .catch((err) => {});
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let params = {
          type_id: 2,
        };
        axios
          .get(`/api/document-template/get?type_id=${id}`)
          .then((data) => {
            if (data.data.inputs.length === 0) {
              alert("Template chưa được tạo");
              this.props.history.push(`/notification/create`);
            }
            this.setState({
              listInputs: data.data.inputs,
            });
            axios
              .get(`/api/workflow/detail?type_id=${data.data.document_type.id}`)
              .then((res) => {
                this.setState({
                  dataWorkFlow: res.data,
                });
                this.props.uiActionCreatorsH();
              })
              .catch((err) => {});
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {}
    
    
  };
  handleCheckboxChange = (e, inputId) => {
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
      // tìm thấy
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
    if (currentUrl.indexOf(checkUrl) !== -1) {
      this.setState({
        create: false,
      });
    }
  }

  handleSubmit = (e) => {
    if (this.state.create === true) {
      this.props.uiActionCreatorsS();
      let params = {
        document_type_id: this.props.match.params.id,
        user_id: docCookies.getItem("user_id"),
        dataWorkFlow:this.state.dataWorkFlow,
        inputsData: this.state.inputsData,
        // targets: targets,
      };
      axiosConfig
        .post("/api/document/store", params)
        .then((data) => {
          console.log(data)
          if(data === "success") {
            alert("gửi tài liệu thành công")
          } else {
            alert("gửi tài liệu thất bại")
          }
        })
        .catch((err) => {
          console.log(err);
        });
      
    } else {
      let arrValueInput = [];
      for (let item of this.state.inputsData) {
        if (item.value === null) {
          item.value = "null";
        }
        let obj = {
          id: item.id,
          value: item.value,
        };
        arrValueInput.push(obj);
      }
      let data = {
        document_id: this.props.match.params.id,
        user_id: 1,
        inputs: arrValueInput,
      };
      axios
        .post("https://document.tuoitre.vn/api/document/update", data)
        .then((res) => {
          alert("update document thành công");
          this.props.uiActionCreatorsH();
        })
        .catch((err) => {
          console.log(err);
          alert("update thất bại");
          this.props.uiActionCreatorsH();
        });
    }
    this.props.uiActionCreatorsH();

    // }
  };
  renderWorkflow = () => {
    if (this.state.dataWorkFlow && this.state.dataWorkFlow.steps) {
      return this.state.dataWorkFlow.steps.map((item) => {
        return <Step key={item.id} title={item.description} />;
      });
    } else {
    }
    // return ""
  };
  render() {
    const { listInputs, inputsData } = this.state;
    return (
      <div>
        <div className="row">
          <Steps current={0} size="small" className="process-work-flow">
            {this.renderWorkflow()}
            <Step title="Tài liệu sẵn sàng" />
          </Steps>
       
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
          <div className="col-md-2" style={{ margin: "26px" }}>
            {this.state.create === true && (
              <span
                className="btn-add-user"
                onClick={(e) => this.handleSubmit(e)}
              >
                Gửi tài liệu
              </span>
            )}
            <span
              className="btn-add-user"
              onClick={() => this.props.history.goBack()}
            >
              Trở về
            </span>
          </div>
        </div>
        
        {/* <ModalForm dataForm = {this.state.dataForm} idWorkflow ={this.props.match.params.id} show ={this.state.showModal} hideModal = {()=>{
          this.setState({
            showModal:false
          })
        }}
        /> */}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  uiActionCreatorsS: bindActionCreators(showLoading, dispatch),
  uiActionCreatorsH: bindActionCreators(hideLoading, dispatch),
});
export default connect(null, mapDispatchToProps)(Create);
