import express from "express";
import path from "path";
import dotenv from "dotenv";
import userController from "./controllers/User.mjs";
import departmentsController from "./controllers/Department.mjs";
// import { updateUser, inforUserById, register, listUser,grantRoleToUser,listRoleAndPermissionOfUser, deleteRoleUser, listUserPagination } from "./controllers/User.mjs";
import { transfers, profileTransfers } from "./controllers/Transfers.mjs";
import { getProfile, updateProfile, addProfile } from "./controllers/Profiles.mjs";
import {
    addProfileDepartments,
    updateProfileDepartments,
} from "./controllers/profileDepartments.mjs";
import { addJournalistCards, updateJournalistCards } from "./controllers/JournalistCards.mjs";
import { addUserDegrees, updateUserDegrees } from "./controllers/UserDegrees.mjs";
import { addWorkObjects, updateWorkObjects } from "./controllers/WorkObjects.mjs";
import {
    listRole,
    addRole,
    updateRole,
    deleteRole,
    listPermissionOfRole,
    permissionToRole,
} from "./controllers/Roles.mjs";
import {
    listPermission,
    addPermission,
    updatePermission,
    deletePermission,
} from "./controllers/Permission.mjs";
import { listParts, addParts, updateParts, deleteParts } from "./controllers/Parts.mjs";
import {
    listPosition,
    addPosition,
    updatePosition,
    deletePosition,
} from "./controllers/Position.mjs";
// import { listDepartment, addDepartment, updateDepartment, deleteDepartment } from "./controllers/Department.mjs"
import { listAction, addAction, updateAction, deleteAction } from "./controllers/Action.mjs";
import workflowController from "./controllers/workflow.mjs";
dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',userController);
// app.post("/api/login", login);
// app.post("/api/register",register);
// app.get("/api/user",listUser);
// app.post("/api/user/role/:id",grantRoleToUser);
// app.post("/api/user/role-user/:id",deleteRoleUser);
// app.get("/api/user/permission/:id",listRoleAndPermissionOfUser);
// app.get("/api/userpagin",listUserPagination);
// app.get("/api/user/:id",inforUserById);
// app.put("/api/user/:id",updateUser);


app.get("/api/transfers", transfers);
app.get("/api/transfers/profiles/:id", profileTransfers);
app.post("/api/fe/profiles/user", getProfile);

app.post("/api/profiles/departments",addProfileDepartments);
app.post("/api/journalist-cards",addJournalistCards);
app.post("/api/user-degrees",addUserDegrees);
app.post("/api/work-objects",addWorkObjects);

app.put("/api/profiles/:id",updateProfile);
app.post("/api/profiles",addProfile);
app.put("/api/profiles/departments/:id",updateProfileDepartments);
app.put("/api/journalist-cards/:id",updateJournalistCards);
app.put("/api/user-degrees/:id",updateUserDegrees);
app.put("/api/work-objects/:id",updateWorkObjects);

app.get("/api/role",listRole)
app.post("/api/role",addRole)
app.put("/api/role/:id",updateRole)
app.delete("/api/role",deleteRole)
app.get("/api/role/permission/:id",listPermissionOfRole)
app.post("/api/role/permission/:id",permissionToRole)

app.get("/api/permission",listPermission)
app.post("/api/permission",addPermission)
app.put("/api/permission/:id",updatePermission)
app.delete("/api/permission",deletePermission)

app.get("/api/action",listAction)
app.post("/api/action",addAction)
app.put("/api/action/:id",updateAction)
app.delete("/api/action",deleteAction)

app.get("/api/parts",listParts)
app.post("/api/parts",addParts)
app.put("/api/parts/:id",updateParts)
app.post("/api/partsd",deleteParts)

app.get("/api/positions",listPosition)
app.post("/api/positions",addPosition)
app.put("/api/positions/:id",updatePosition)
app.post("/api/positionsd",deletePosition)

// app.get("/api/departments",listDepartment)
// app.post("/api/departments",addDepartment)
// app.put("/api/departments/:id",updateDepartment)
// app.post("/api/departments/delete",deleteDepartment)
app.use("/api/departments",departmentsController)
app.use("/api/workflow",workflowController)
// if (process.env.NODE_ENV === "production") {
// Serve any static files
app.use(express.static(path.join(__dirname, "client/dist")));

// Handle React routing, return all requests to React app
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
// }

app.listen(port, () => console.log(` 🚀 Express listening on ports la ${port}`));
