import express from "express";
import path from "path";
import dotenv from "dotenv";
import { login, register, listUser } from "./controllers/User.mjs";
import { transfers, profileTransfers } from "./controllers/Transfers.mjs";
import { getProfile, updateProfile } from "./controllers/Profiles.mjs";
import { addDepartment, updateDepartment } from "./controllers/Departments.mjs"
import { addJournalistCards, updateJournalistCards } from "./controllers/JournalistCards.mjs"
import { addUserDegrees, updateUserDegrees } from "./controllers/UserDegrees.mjs"
import { addWorkObjects,updateWorkObjects } from "./controllers/WorkObjects.mjs"
import { listRole, addRole, updateRole, deleteRole } from "./controllers/Roles.mjs"
import { listPermission, addPermission, updatePermission, deletePermission } from "./controllers/Permission.mjs"
dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/api/login", login);
app.post("/api/register",register);
app.get("/api/user",listUser);

app.get("/api/transfers", transfers);
app.get("/api/transfers/profiles/:id", profileTransfers);
app.post("/api/fe/profiles/user", getProfile);

app.post("/api/departments",addDepartment);
app.post("/api/journalist-cards",addJournalistCards);
app.post("/api/user-degrees",addUserDegrees);
app.post("/api/work-objects",addWorkObjects);

app.put("/api/profiles",updateProfile);
app.put("/api/departments",updateDepartment);
app.put("/api/journalist-cards",updateJournalistCards);
app.put("/api/user-degrees",updateUserDegrees);
app.put("/api/work-objects",updateWorkObjects);

app.get("/api/role",listRole)
app.post("/api/role",addRole)
app.put("/api/role",updateRole)
app.delete("/api/role",deleteRole)

app.get("/api/permission",listPermission)
app.post("/api/permission",addPermission)
app.put("/api/permission",updatePermission)
app.delete("/api/permission",deletePermission)
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

app.listen(port, () => console.log(` 🚀 Express listening on port ${port}`));
