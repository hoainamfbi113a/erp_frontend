import express from "express";
import path from "path";
import dotenv from "dotenv";
import userController from "./controllers/User.mjs";
import departmentsController from "./controllers/Department.mjs";
import searchController from "./controllers/Search.mjs";
import { transfers, profileTransfers } from "./controllers/Transfers.mjs";
import { getProfile, updateProfile, addProfile } from "./controllers/Profiles.mjs";
import { addProfileDepartments, updateProfileDepartments } from "./controllers/profileDepartments.mjs"
import { addJournalistCards, updateJournalistCards } from "./controllers/JournalistCards.mjs"
import { addUserDegrees, updateUserDegrees } from "./controllers/UserDegrees.mjs"
import { addWorkObjects,updateWorkObjects } from "./controllers/WorkObjects.mjs"
import { removePermissionFromRole, listRole, addRole, updateRole, deleteRole,
     listPermissionOfRole, permissionToRole, listPermissionAction} from "./controllers/Roles.mjs"
import { listPermission, addPermission, updatePermission, deletePermission, listTableId,  existPermission, addPermissionToPermission, deletePermissionToPermission } from "./controllers/Permission.mjs"
import permissionController from "./controllers/permissionController.mjs";
import { listParts, addParts, updateParts, deleteParts } from "./controllers/Parts.mjs"
import { listPosition, addPosition, updatePosition, deletePosition } from "./controllers/Position.mjs"
import notificationsController from "./controllers/Notify.mjs"
import notificationController from "./controllers/NotifyDocument.mjs"
import { listAction, addAction, updateAction, deleteAction } from "./controllers/Action.mjs";
import workflowController from "./controllers/workflow.mjs";
import formBuilderController from "./controllers/FormBuilder.mjs";
import servicemanagerController from "./controllers/servicemanagerController.mjs"
import  stepController  from "./controllers/stepController.mjs" 
import { addPermissionForPos ,deletePermissionForPos} from "./controllers/Position.mjs";
import axios from "axios";
dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pokemon", function(req, res, next){
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    console.log("data",req.body.data)
    let resParent = res
    axios.post(`http://192.168.61.116/api/check-permission`,req.body.objCheck, config )
    .then(res=>{
        console.log(res.data)
        if(res.data === true){
            apiMain(req,resParent)
        } else {
            resParent.send("error")
        }
    })
    .catch(err=>{
        resParent.send("error")
        console.log("err")
    })
}
)
const apiMain =(req,resParent) =>{
    let domain = req.body.domain;
    let customDomain = domain.replace('https', 'http');
    let path = `${customDomain}/${req.body.uri}${req.body.id ? req.body.id : ""}`
    console.log(path)
    console.log(req.body.data)
    console.log(req.body.objCheck.method)
    axios({
        method:req.body.objCheck.method,
        url: path,
        data: req.body.data,
        headers: { Authorization: req.headers.authorization }
    })
    .then(function (response) {
        console.log(response)
        resParent.send(response.data)
      });
}
app.use("/api", userController);
app.use("/api", formBuilderController);

app.get("/api/transfers", transfers);
app.get("/api/transfers/profiles/:id", profileTransfers);
app.post("/api/fe/profiles/user", getProfile);

app.post("/api/profiles/departments", addProfileDepartments);
app.post("/api/journalist-cards", addJournalistCards);
app.post("/api/user-degrees", addUserDegrees);
app.post("/api/work-objects", addWorkObjects);

app.put("/api/profiles/:id", updateProfile);
app.post("/api/profiles", addProfile);
app.put("/api/profiles/departments/:id", updateProfileDepartments);
app.put("/api/journalist-cards/:id", updateJournalistCards);
app.put("/api/user-degrees/:id", updateUserDegrees);
app.put("/api/work-objects/:id", updateWorkObjects);

app.get("/api/role", listRole);
app.get("/api/service-management/table-management/:id",listTableId)
app.get("/api/list/permission/work-formality/:id",existPermission)
app.post("/api/work-formality/permission",addPermissionToPermission)
app.post("/api/work-formality/permissiond",deletePermissionToPermission)
app.post("/api/role", addRole);
app.put("/api/role/:id", updateRole);
app.delete("/api/role", deleteRole);
app.get("/api/role/permission/:id", listPermissionOfRole);
app.post("/api/role/permission/:id", permissionToRole);
app.post("/api/role/permissiond/:id", removePermissionFromRole);

app.use("/api/permission",permissionController)

app.get("/api/action", listAction);
app.post("/api/action", addAction);
app.put("/api/action/:id", updateAction);
app.delete("/api/action", deleteAction);

app.get("/api/parts", listParts);
app.post("/api/parts", addParts);
app.put("/api/parts/:id", updateParts);
app.post("/api/partsd", deleteParts);

app.get("/api/positions", listPosition);
app.post("/api/positions", addPosition);
app.put("/api/positions/:id", updatePosition);
app.post("/api/positionsd", deletePosition);
app.post("/api/position/permission/:id", addPermissionForPos);
app.post("/api/position/permissiond/:id", deletePermissionForPos);

app.use("/api/departments", departmentsController);
app.use("/api/workflow", workflowController);
app.use("/api/notifications", notificationsController);
app.use("/api/notification", notificationController);
app.use("/api/search", searchController);

app.use("/api/service-management",servicemanagerController)
app.use("/api/step", stepController)

// không theo trật tự
app.get("/api/list/permission/actions",listPermissionAction)
// if (process.env.NODE_ENV === "production") {
// Serve any static files
app.use(express.static(path.join(__dirname, "client/dist")));

// Handle React routing, return all requests to React app
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
// }

app.listen(port, () => console.log(` 🚀 Express listening on ports l ${port}`));
