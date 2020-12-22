import express from "express";
import path from "path";
import dotenv from "dotenv";
import { login, register } from "./controllers/User.mjs";
import { transfers, profileTransfers } from "./controllers/Transfers.mjs";
import { getProfile, updateProfile } from "./controllers/Profiles.mjs";
import { addDepartment, updateDepartment } from "./controllers/Departments.mjs"
import { addJournalistCards, updateJournalistCards } from "./controllers/JournalistCards.mjs"
import { addUserDegrees, updateUserDegrees } from "./controllers/UserDegrees.mjs"
import { addWorkObjects,updateWorkObjects } from "./controllers/WorkObjects.mjs"
dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", login);
app.post("/register",register);
app.get("/user",listUser);

app.get("/transfers", transfers);
app.get("/transfers/profiles/:id", profileTransfers);
app.post("/fe/profiles/user", getProfile);

app.post("/departments",addDepartment);
app.post("/journalist-cards",addJournalistCards);
app.post("/user-degrees",addUserDegrees);
app.post("/work-objects",addWorkObjects);

app.put("/profiles",updateProfile);
app.put("/departments",updateDepartment);
app.put("/journalist-cards",updateJournalistCards);
app.put("/user-degrees",updateUserDegrees);
app.put("/work-objects",updateWorkObjects);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

app.listen(port, () => console.log(` 🚀 Express listening on port ${port}`));
