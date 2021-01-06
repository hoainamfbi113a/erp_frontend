import express from "express";
import path from "path";
import dotenv from "dotenv";
import { login, register, listUser,grantRoleToUser,listRoleAndPermissionOfUser, deleteRoleUser, listUserPagination } from "./controllers/User.mjs";
import { transfers, profileTransfers } from "./controllers/Transfers.mjs";
import { getProfile, updateProfile } from "./controllers/Profiles.mjs";
import { addDepartments, updateDepartments } from "./controllers/Departments.mjs"
import { addJournalistCards, updateJournalistCards } from "./controllers/JournalistCards.mjs"
import { addUserDegrees, updateUserDegrees } from "./controllers/UserDegrees.mjs"
import { addWorkObjects,updateWorkObjects } from "./controllers/WorkObjects.mjs"
import { listRole, addRole, updateRole, deleteRole, listPermissionOfRole, permissionToRole} from "./controllers/Roles.mjs"
import { listPermission, addPermission, updatePermission, deletePermission } from "./controllers/Permission.mjs"
import { listParts, addParts, updateParts, deleteParts } from "./controllers/Parts.mjs"
import { listPosition, addPosition, updatePosition, deletePosition } from "./controllers/Position.mjs"
import { listDepartment, addDepartment, updateDepartment, deleteDepartment } from "./controllers/Department.mjs"
import { listAction, addAction, updateAction, deleteAction } from "./controllers/Action.mjs"
dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/login", login);
app.post("/register",register);
app.get("/user",listUser);
app.post("/user/role/:id",grantRoleToUser);
app.post("/user/role-user/:id",deleteRoleUser);
app.get("/user/permission/:id",listRoleAndPermissionOfUser);
app.get("/userpagin",listUserPagination);


app.get("/transfers", transfers);
app.get("/transfers/profiles/:id", profileTransfers);
app.post("/fe/profiles/user", getProfile);

// app.post("/departments",addDepartments);
app.post("/journalist-cards",addJournalistCards);
app.post("/user-degrees",addUserDegrees);
app.post("/work-objects",addWorkObjects);

app.put("/profiles/:id",updateProfile);
// app.put("/departments/:id",updateDepartments);
app.put("/journalist-cards/:id",updateJournalistCards);
app.put("/user-degrees/:id",updateUserDegrees);
app.put("/work-objects/:id",updateWorkObjects);

app.get("/role",listRole)
app.post("/role",addRole)
app.put("/role/:id",updateRole)
app.delete("/role",deleteRole)
app.get("/role/permission/:id",listPermissionOfRole)
app.post("/role/permission/:id",permissionToRole)

app.get("/permission",listPermission)
app.post("/permission",addPermission)
app.put("/permission/:id",updatePermission)
app.delete("/permission",deletePermission)

app.get("/action",listAction)
app.post("/action",addAction)
app.put("/action/:id",updateAction)
app.delete("/action",deleteAction)

app.get("/parts",listParts)
app.post("/parts",addParts)
app.put("/parts/:id",updateParts)
app.post("/partsd",deleteParts)

app.get("/positions",listPosition)
app.post("/positions",addPosition)
app.put("/positions/:id",updatePosition)
app.post("/positionsd",deletePosition)

app.get("/departments",listDepartment)
app.post("/departments",addDepartment)
app.put("/departments/:id",updateDepartment)
app.post("/departmentsd",deleteDepartment)

// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "client/dist")));

//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/dist", "index.html"));
//   });
// }

app.listen(port, () => console.log(` 🚀 Express listening on ports la ${port}`));
