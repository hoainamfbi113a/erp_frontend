import express from "express";
import {
  getReward,
  createReward,
  deleteReward,
  updateReward,
} from "./UserProfile/rewardDiscipline.mjs";
import {
  getFamilyRelation,
  createFamilyRelation,
  deleteFamilyRelation,
  updateFamilyRelation,
} from "./UserProfile/Family7.mjs";
import {
  getPersonalHistory,
  createPersonalHistory,
  deletePersonalHistory,
  updatePersonalHistory,
} from "./UserProfile/personalHistory.mjs";
import {
  getTraining,
  createTraining,
  deleteTraining,
  updateTraining,
} from "./UserProfile/Training.mjs";
import {getOrganize, createOrganize, deleteOrganize, updateOrganize} from "./UserProfile/Organize.mjs"

const router = express.Router();

//profile 2
router.get("/history/:id", getPersonalHistory);
router.post("/history/add", createPersonalHistory);
router.post("/history/delete/:id", deletePersonalHistory);
router.put("/history/update", updatePersonalHistory);

//profile 4
router.get("/organize/:id", getOrganize);
router.post("/organize/add", createOrganize);
router.post("/organize/delete", deleteOrganize);
router.put("/organize/update", updateOrganize);

//profile 5
router.get("/training/:id", getTraining);
router.post("/training/add", createTraining);
router.post("/training/delete", deleteTraining);
router.put("/training/update", updateTraining);

// profile 7 - 8 - 9
router.get("/family/:id", getFamilyRelation);
router.post("/family/add", createFamilyRelation);
router.post("/family/delete/:id", deleteFamilyRelation);
router.put("/family/update", updateFamilyRelation);

// profile 6
router.get("/reward-discipline/users/:id", getReward);
router.post("/reward-discipline", createReward);
router.post("/reward-disciplined", deleteReward);
router.put("/reward-disciplined/users", updateReward);

export default router;
