import express from "express";
import axios from "axios";
import multer from "multer";
import FormData from 'form-data';
import fs from 'fs'
const router = express.Router();
var storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})
var upload = multer({
  storage: storage,
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
      `${process.env.apiEmployee}/api/user/resources/${id}?mode=one`
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
  formData.append('file', fs.readFileSync(req.file.path), req.file.filename);
  try {
    let { data } = await axios.post(
      `${process.env.apiEmployee}/api/user/resources`,formData,{ headers: formData.getHeaders() }
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


export default router;