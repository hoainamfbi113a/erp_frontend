import axios from "axios";
import express from "express";
import { getFamilyRelation } from "./UserProfile/Family7.mjs";
import { getReward, createReward, deleteReward } from "./UserProfile/rewardDiscipline.mjs";
const router = express.Router();

router.get("/family/:id", getFamilyRelation);

router.get("/reward-discipline/users/:id", getReward);
router.post("/reward-discipline", createReward);
router.post("/reward-disciplined", deleteReward);


export default router;

