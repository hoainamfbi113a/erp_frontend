import express from "express";
import axios from "axios";
import multer from "multer";
import FormData from 'form-data';
// let upload = multer();
const router = express.Router();
var upload = multer({
  // storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});
router.get("/user/resources/:id", async (req, res) => {
  const { id } = req.params
  try {
    let { data } = await axios.get(
      `${process.env.apiEmployee}/api/user/resources/${id}`
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/user/resources",upload.single('file') , async (req, res) => {
  let { resource_type,user_resource_type, user_id } = req.body;
  const formData = new FormData()
  formData.append('resource_type', resource_type);
  formData.append('user_resource_type', user_resource_type);
  formData.append('user_id', user_id);
  console.log(req.file)
  formData.append('file',Buffer.from(req.file));
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }
  // try {
  //   let { data } = await axios.post(
  //     `${process.env.apiEmployee}/api/user/resources`,formData,config
  //   );
  //   res.send(data);
  // } catch (error) {
  //   console.log(error);
  // }
});


export default router;