import express from "express";
import axios from "axios";
const router = express.Router();
router.get("/document-type/get-document-types", async (req, res) => {
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-type/get-document-types`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
router.get("/document-template/get", async (req, res) => {
  let { type_id } = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-template/get?type_id=${type_id}`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
router.post("/document-template/store", async (req, res) => {
  try {
    let { data } = await axios.post(
      `${process.env.apiFormBuilder}/api/document-template/store`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
router.get("/document/get", async (req, res) => {
  let { id } = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document/get?id=${id}`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/document/list", async (req, res) => {
  let { page, per_page, user_id } = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document/list?page=${page}&per_page=${per_page}&user_id=${user_id}`
    );
    res.send(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/document-type/get-document-types", async (req, res) => {
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-type/get-document-types`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
let getTarget = async (pos_id, dep_id, step_id, action_id) => {
  console.log(dep_id, pos_id)
  let target = [];
  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/departments/positions/list-user/${dep_id}?order=asc&pos_id=${pos_id}`
  );
  const object = data;
  for (const property in object.data) {
    let obj = {
      target_id: object.data[property].id,
      target_name: object.data[property].full_name,
      step_id,
      action_id,
    };
    target.push(obj);
  }
  return target;
};

router.post("/document/store", async (req, res) => {
  let resEnd = res;
  let { document_type_id, user_id, dataWorkFlow, inputsData } = req.body;
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let pos_idUser, dep_idUser;

  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/fe/profiles/users/${user_id}`,
    config
  );

  dep_idUser = data.data.department.data.dep_id;
  pos_idUser = data.data.department.data.pos_id;
  let target = [];
  let targetBegin = {
    target_id: user_id ,
    target_name: data.data.pro_name,
    step_id:1,
    action_id:1,
  }
  target.push(targetBegin)
  for (let item of dataWorkFlow.steps) {
    if(item.id == 1) {
      break
    }
    let pos_id, dep_id;
    dep_id =
      item.actions[0].department_id == null
        ? dep_idUser
        : item.actions[0].department_id;
    pos_id =
      item.actions[0].position_id == null
        ? pos_idUser
        : item.actions[0].position_id;
    let arrChild = await getTarget(pos_id, dep_id, item.id, item.actions[0].id);
    target = [...target, ...arrChild];
  }
  let paramsIssue = {
    document_type_id,
    user_id,
    targets: target,
  };
  axios
    .post(`${process.env.apiWorkflow}/api/issue/store`, paramsIssue)
    .then((res1) => {
      let dataForm = {
        type_id: document_type_id,
        user_id: user_id,
        inputs: inputsData,
      };
      dataForm.issue_id = res1.data.id;
      axios
        .post(`${process.env.apiFormBuilderLocal}/api/document/store`, dataForm)
        .then((res) => {
          let params = {
            document_id: res.data.id,
            issue_id: res1.data.id,
          };

          axios
            .post(
              `${process.env.apiFormBuilderLocal}/api/document-process/store`,
              params
            )
            .then((res3) => {
              // console.log("success2");
              resEnd.send("success")
            })
            .catch((err) => {
              console.log("err1");
              resEnd.send("failed 3")
            });
        })
        .catch((err) => {
          resEnd.send("failed 2")
          // console.log("err")
        });
    })
    .catch((err) => {
      resEnd.send("failed 1")
      console.log(err);
    });
  // console.log(isSuccess);
  // if (isSuccess === true) {
  //   res.send("success");
  // } else {
  //   res.send("failed");
  // }
});

router.post("/api/document/update", async (req, res) => {
  try {
    let { data } = await axios.post(
      `${process.env.apiWorkflow}/api/document/update`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/document/delete", async (req, res) => {
  try {
    let { data } = await axios.delete(
      `${process.env.apiWorkflow}/api/document/delete`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/document-type/store", async (req, res) => {
  try {
    let { data } = await axios.post(
      `${process.env.apiWorkflow}/api/document-type/store`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/document-type/delete", async (req, res) => {
  try {
    let { data } = await axios.delete(
      `${process.env.apiWorkflow}/api/document-type/delete`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/document-process/get", async (req, res) => {
  let { process_id } = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-process/get?process_id=${process_id}`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
