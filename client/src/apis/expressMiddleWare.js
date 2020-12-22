var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.post("express/login" , "https://employee.tuoitre.vn/api/login")
app.get("/user" , (req,res)=>{
    res.send("api")
})
app.listen(3000)