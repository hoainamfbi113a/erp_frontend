import axios from "axios";
import express from "express";
import { getFamilyRelation } from "./UserProfile/Family7.mjs";
import { getReward } from "./UserProfile/rewardDiscipline.mjs";
const router = express.Router();

router.get("/family/:id", getFamilyRelation);

router.get("/reward-discipline/users/:id", getReward);


export default router;

