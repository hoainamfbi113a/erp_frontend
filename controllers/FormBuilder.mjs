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
let getTarget = async (pos_id, dep_id, step_id, action_id, dep_name, pos_name) => {
  let target = [];
  let object;
  if(dep_id === null) {
    let { data } = await axios.get(
      `${process.env.apiEmployee}/api/positions/list-user/${pos_id}?order=desc&page=1&per_page=20`
    );
    object = data
  } else {
    let { data } = await axios.get(
      `${process.env.apiEmployee}/api/departments/positions/list-user/${dep_id}?order=asc&pos_id=${pos_id}`
    );
    object = data
  }
  for (const property in object.data) {
    let obj = {
      step_id,
      action_id,
      id: object.data[property].id,
      name: object.data[property].full_name,
      department_id: dep_id,
      department_name: dep_name,
      position_id: pos_id,
      position_name: pos_name,
    };
    target.push(obj);
    return target;
  }
};

router.post("/document/store", async (req, res) => {
  let resEnd = res;
  let { document_type_id, profile, dataWorkFlow, inputsData} = req.body;
  let { user_id, pro_name, department } = profile;
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let pos_idUser, dep_idUser, dep_nameUser, pos_nameUser;
  dep_idUser = department.data.dep_id;
  dep_nameUser = department.data.dep_name,
  pos_idUser = department.data.pos_id;
  pos_nameUser = department.data.pos_name;
  let target = [];
  for (let item of (dataWorkFlow && dataWorkFlow.steps) ) {
      if(item.current_process_user_is_target === true) {
        let targetBegin = {
          step_id: item.id,
          action_id: item.actions[0].id,
          id: user_id,
          name: pro_name,
          department_id: department.data.dep_id,
          department_name: department.data.dep_name,
          position_id: department.data.pos_id,
          position_name: department.data.pos_name,
        };
        target.push(targetBegin);
      } else if(item.position_not_part_of_department === true) {
        let arrChild = await getTarget(item.actions[0].position_id, null, item.id, item.actions[0].id)
        target = [...target, ...arrChild]
      } 
       else {
          let dep_id, dep_name, pos_id, pos_name;
          dep_id =
            item.actions[0].department_id == null
              ? dep_idUser
              : item.actions[0].department_id;
          dep_name = item.actions[0].department_name == null
              ? dep_nameUser
              : item.actions[0].department_name;
          pos_id =
            item.actions[0].position_id == null
              ? pos_idUser
              : item.actions[0].position_id;
          pos_name =
            item.actions[0].position_name == null
              ? pos_nameUser
              : item.actions[0].position_name;
          let arrChild = await getTarget(
            pos_id,
            dep_id,
            item.id,
            item.actions[0].id,
            dep_name,
            pos_name,
          );
          target = [...target, ...arrChild];
      }
  }
  let paramsIssue = {
    document_type_id,
    created_by_name: dataWorkFlow.created_by_name,
    created_by_id: dataWorkFlow.created_by_id,
    targets: target,
  };
  axios
    .post(`${process.env.apiWorkflow}/api/issue/store`, paramsIssue)
    .then((res1) => {
      let dataForm = {
        type_id: document_type_id,
        user_id: user_id,
        inputs: inputsData,
        user_name: pro_name,
        dep_id: department.data.dep_id,
        dep_name: department.data.dep_name,
        pos_id: department.data.pos_id,
        pos_name: department.data.pos_name,
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
      console.log(err)
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
