import React, { useState, useEffect } from "react";
import StepWizard from "react-step-wizard";
import Step from "./Step";
import { Modal, Button, message } from "react-bootstrap";
import axios from "axios";

export default function ModalForm(props) {
  let [dataWorkFlow, setDataWorkFlow] = useState({ steps: [] });
  let [step, setStep] = useState(null);
  let [targets, setTargets] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        `/api/workflow/detail?type_id=${props.idWorkflow}`
      );
      response = await response.json();
      setDataWorkFlow(response);
      setStep(response.steps.find((item) => (item.is_first = true)));
    }
    fetchMyAPI();
  }, []);
  const dataChild = (value) => {
    let arr = targets;
    for (let item of arr) {
      if (item.step_id === value.step_id) {
        item = value;
        value = {};
        break;
      }
    }
    arr.push(value);
    setTargets(arr);
  };
  const handleCreateIssue = () => {
    targets = targets.filter((value) => Object.keys(value).length !== 0);
    let params = {
      document_type_id: props.idWorkflow,
      user_id: 1,
      targets: targets,
    };
    axios
      .post("/api/issue/store", params)
      .then((res1) => {
        let paramsDocs = props.dataForm;
        paramsDocs.issue_id = res1.data.id;
        axios
          .post("/api/document/store", paramsDocs)
          .then((data) => {
            let params = {
              document_id: data.data.id,
              issue_id: res1.data.id,
            };

            axios
              .post("/api/document-process/store", params)
              .then((res3) => {
                message.success("Tạo tài liệu thành công!")
                props.hideModal();
              })
              .catch((err) => {
                console.log(err);
                message.error("Tạo tài liệu thất bại");
                props.hideModal();
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal show={props.show} onHide={props.hideModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin tạo issue</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "hidden" }}>
          <StepWizard>
            {dataWorkFlow.steps.length &&
              dataWorkFlow.steps.map((_, index) => (
                <Step
                  step={step}
                  setStep={setStep}
                  key={index}
                  data={dataWorkFlow}
                  dataChild={dataChild}
                />
              ))}
          </StepWizard>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCreateIssue();
            }}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
