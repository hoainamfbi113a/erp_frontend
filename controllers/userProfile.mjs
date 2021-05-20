import express from "express";
import { getReward, createReward, deleteReward, updateReward } from "./UserProfile/rewardDiscipline.mjs";
import { getFamilyRelation, createFamilyRelation, deleteFamilyRelation } from "./UserProfile/Family7.mjs";
const router = express.Router();

router.get("/family/:id", getFamilyRelation);
router.post("/family/add", createFamilyRelation);
router.post("/family/delete/:id", deleteFamilyRelation);

router.get("/reward-discipline/users/:id", getReward);
router.post("/reward-discipline", createReward);
router.post("/reward-disciplined", deleteReward);
router.put("/reward-disciplined/users", updateReward);


export default router;

