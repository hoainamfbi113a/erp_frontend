import axios from "axios";
import express from "express";
import { getFamilyRelation } from "./UserProfile/Family7.mjs";
import { getReward, createReward, deleteReward, updateReward } from "./UserProfile/rewardDiscipline.mjs";
const router = express.Router();

router.get("/family/:id", getFamilyRelation);

router.get("/reward-discipline/users/:id", getReward);
router.post("/reward-discipline", createReward);
router.post("/reward-disciplined", deleteReward);
router.put("/reward-disciplined/users", updateReward);


export default router;

