import React, { Component } from "react";
import classes from "classnames";

import axios from "axios";
import { Steps } from "antd";
const { Step } = Steps;
import RenderInputPreview from "./Input";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import docCookies from "doc-cookies";
import axiosConfig from "apis/axios";
import { bindActionCreators } from "redux";
import { Modal, Button } from "antd";
import { Input } from "antd";
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
      stepDataFlow:[],
      currentProcess: 0,
      note: "Không có ý kiến",
      user_id:"",
      view: false,
      isProcessed: false,
      isModalVisible: false,
    };
  }
  getDetailIssue = (type_id) =>{
      let params = {
        type_id,
        nested: "1",
      };
      console.log(params)
      axiosConfig.get("/api/issue/detail",{params})
      .then(res=>{
        this.setState({
          stepDataFlow:res
        })
        let i = 0;
        console.log(this.state.currentProcess)
        for(let item of res) {
          i++;
          if(item.id === this.state.currentProcess) {
            this.setState({
              currentProcess:i -1
            })
            break;
          } 
        }
      })
      .catch(err=>{
        console.log(err);
      })
  }
  componentDidMount = () => {
    this.props.uiActionCreatorsS();
    const id = this.props.match.params.id;

    axios
    .get(`/api/document-process/get?id=${id}`)
    .then((res) => {
      let arrTarget = res.data.targets;
      let userLogin = docCookies.getItem("user_id");
      for(let item of arrTarget) {
        if(item.target_id === userLogin) {
          this.setState({
            view:true
          })
          break;
        }
      }
      if (res.data.status === "processed") {
          this.setState({
            view:true,
            isProcessed:true,
          })
      }
      if(res.data.status === "processed") {
        this.setState({
          isProcessed:true,
          currentProcess: res.data.current_step.id -1,
        })
      } else {
        this.setState({
          currentProcess: res.data.current_step.id ,
        });
      }
    })
    .catch((err) => {});
    try {
      if (this.state.create === false) {
        axios
          .get(`/api/document/get?id=${id}`)
          .then((res) => {
            this.setState({
              listInputs: res.data.inputs,
              inputsData: res.data.inputs,
              user_id:res.data.user_id
            });
            this.getDetailIssue(res.data.document_type.id);
            axios
              .get(`/api/workflow/detail?type_id=${res.data.document_type.id}`)
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
            this.getDetailIssue(data.data.document_type.id);
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
        dataWorkFlow: this.state.dataWorkFlow,
        inputsData: this.state.inputsData,
        // targets: targets,
      };
      axiosConfig
        .post("/api/document/store", params)
        .then((data) => {
          this.props.uiActionCreatorsH();
          if (data === "success") {
            alert("gửi tài liệu thành công");
          } else {
            alert("gửi tài liệu thất bại");
          }
          this.props.history.goBack();
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
          this.props.uiActionCreatorsH();
          alert("update document thành công");
        })
        .catch((err) => {
          console.log(err);
          this.props.uiActionCreatorsH();
          alert("update thất bại");
        });
    }
    // this.props.uiActionCreatorsH();

    // }
  };
  handleAccept = () => {
    if(this.state.user_id == docCookies.getItem("user_id")) {
      this.handleOk ();
    } else {
      this.setState({
        isModalVisible: true,
      });
    }
  
  };
  handleOk = () => {
    axiosConfig
      .get(`/api/document-process/get?id=${this.props.match.params.process_id}`)
      .then((res) => {
        if (res.targets[0].target_id == docCookies.getItem("user_id")) {
          this.setState({
            view:true,
          })
          let body = {
            process_id: +this.props.match.params.process_id,
            user_id: +docCookies.getItem("user_id"),
            status: "pass",
            note: this.state.note,
          };
          axiosConfig
            .post("/api/document-process/process", body)
            .then((res) => {
              console.log(res)
              alert("Xác nhận thành công");
              this.setState({ isModalVisible: false });
              this.props.history.goBack()
            })
            .catch((err) => {
              console.log("err");
            });
        }
      })
      .catch((err) => {
        console.log("err");
      });
  };
  renderWorkflow = () => {
    if (this.state.stepDataFlow) {
      return this.state.stepDataFlow.map((item) => {
        return <Step key={item.id} title={item.name} />;
      });
    } else {
    }
    // return ""
  };
  onChange = (e) => {
    this.setState({
      note: e.target.value,
    });
  };
  render() {
    const { listInputs, inputsData } = this.state;
    return (
      <div>
        <div className="row">
          <Steps current={this.state.currentProcess} size="small" className="process-work-flow">
            {this.renderWorkflow()}
            <Step title="Tài liệu đã duyệt hoàn tất" />
          </Steps>

          <div className="col-md-8"></div>
        </div>
        <div className="row" style ={{justifyContent:"center"}}>
          <div className="col-md-7 form-builder-area card gridify tiny dropTarget">
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
                      create = {this.state.create}
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
          <div style={{ width: "100%" }}>
            {this.state.create === true && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span
                  className="btn-add-user"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Gửi tài liệu
                </span>
                <span
                  className="btn-add-user"
                  onClick={() => this.props.history.goBack()}
                >
                  Trở về
                </span>
              </div>
            )}

            {this.state.create === false && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {this.state.view === false &&
                <span
                  className="btn-add-user"
                  onClick={(e) => this.handleAccept()}
                >
                  Xác nhận
                </span>
                }
                <span
                  className="btn-add-user"
                  onClick={() => this.props.history.goBack()}
                >
                  Trở về
                </span>
              </div>
            )}
          </div>
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.isModalVisible}
          onOk={()=>{this.handleOk()}}
          onCancel={() => {
            this.setState({ isModalVisible: false });
          }}
        >
          <Input
            value={this.state.note}
            name="note"
            onChange={this.onChange}
            placeholder="Nhập phản hồi của bạn"
          />
        </Modal>
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
