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
router.post("/document-template/store/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let { data } = await axios.post(
      `${process.env.apiFormBuilder}/api/document-template/store/${id}`,
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
  console.log("dep_id", dep_id);
  console.log("pos_id", pos_id);
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
    return target;
  }
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
  for (let item of (dataWorkFlow && dataWorkFlow.steps) ) {
      if(item.current_process_user_is_target === true) {
        let targetBegin = {
          target_id: user_id,
          target_name: data.data.pro_name,
          step_id: item.id,
          action_id: item.actions[0].id,
        };
        target.push(targetBegin);
      } else {
          let pos_id, dep_id;
          dep_id =
            item.actions[0].department_id == null
              ? dep_idUser
              : item.actions[0].department_id;
          pos_id =
            item.actions[0].position_id == null
              ? pos_idUser
              : item.actions[0].position_id;
          let arrChild = await getTarget(
            pos_id,
            dep_id,
            item.id,
            item.actions[0].id
          );
          target = [...target, ...arrChild];
      }
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
        user_name: data.data.pro_name,
        dep_id: data.data.department.data.dep_id,
        dep_name: data.data.department.data.dep_name,
        pos_id: data.data.department.data.pos_id,
        pos_name: data.data.department.data.pos_name,
      };
      
      dataForm.issue_id = res1.data.id;
      console.log(dataForm)
      axios
        .post(`${process.env.apiFormBuilder}/api/document/store/${document_type_id}`, dataForm)
        .then((res) => {
          let params = {
            document_id: res.data.id,
            issue_id: res1.data.id,
            user_id,
          };
          axios
            .post(
              `${process.env.apiFormBuilder}/api/document-process/store`,
              params
            )
            .then((res3) => {
              // resEnd.send("success");
              let body = {
                user_id: +user_id,
                status: "pass",
                note: "",
              };
              axios
                .post(`${process.env.apiFormBuilder}/api/document-process/update/${+res3.data.id}`, body)
                .then((res) => {
                  console.log("create document success");
                  resEnd.send("success");
                })
                .catch((err) => {
                  console.log(err)
                  console.log("err");
                });
            })
            .catch((err) => {
              console.log("err1");
              resEnd.send("failed 3");
            });
        })
        .catch((err) => {
          console.log(err)
          console.log("failed .5")
          resEnd.send("failed 2");
        });
    })
    .catch((err) => {
      resEnd.send("failed 1");
    });
});
const recursiveFactorial = (data, arr) => {
  if(data && !data.next_pass){
    return arr
  }
  let obj = {
    id:data.next_pass.id,
    name:data.next_pass.name
  }
  arr.push(obj)
  return recursiveFactorial(data.next_pass, arr);
}

router.get("/issue/detail", async (req, res) => {
  try {
    let params = req.query;
    let { data } = await axios.get(
      `${process.env.apiWorkflow}/api/workflow/detail`, {params}
    );
    let arr = []
    let obj = {
      id: data.nested_step.id,
      name: data.nested_step.name
    }
    arr.push(obj)
    let a = recursiveFactorial(data.nested_step,arr)
    res.send(a); 
  } catch (error) {
    console.log(error);
  }
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

router.post("/document/delete", async (req, res) => {
  let { id } = req.body
  try {
    let { data } = await axios.delete(
      `${process.env.apiFormBuilder}/api/document/delete/${id}`,
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
      `${process.env.apiFormBuilder}/api/document-type/store`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/document-type/delete/:id", async (req, res) => {
  try {
    let { data } = await axios.delete(
      `${process.env.apiFormBuilder}/api/document-type/delete/${req.params.id}`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/document-type/update/:id", async (req, res) => {
  try {
    let { data } = await axios.post(
      `${process.env.apiFormBuilder}/api/document-type/update/${req.params.id}`, req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/document-process/get", async (req, res) => {
  let { id } = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-process/get?id=${id}`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/document-process/process", async (req, res) => {
  try {
    let  { process_id, user_id ,status ,note } = req.body;
    let customBody = {
      user_id,
      status,
      note
    }
    let { data } = await axios.post(
      `${process.env.apiFormBuilder}/api/document-process/update/${process_id}`,customBody
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


export default router;
