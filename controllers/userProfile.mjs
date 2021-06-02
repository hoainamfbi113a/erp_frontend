import express from "express";
import { getReward, createReward, deleteReward, updateReward } from "./UserProfile/rewardDiscipline.mjs";
import { getJoinDCS, createJoinDCS, deleteJoinDCS, updateJoinDCS } from "./UserProfile/joinDCS.mjs";
import { getFamilyRelation, createFamilyRelation, deleteFamilyRelation, updateFamilyRelation } from "./UserProfile/Family7.mjs";
const router = express.Router();

router.get("/family/:id", getFamilyRelation);
router.post("/family/add", createFamilyRelation);
router.post("/family/delete/:id", deleteFamilyRelation);
router.put("/family/update", updateFamilyRelation);

router.get("/reward-discipline/users/:id", getReward);
router.post("/reward-discipline", createReward);
router.post("/reward-disciplined", deleteReward);
router.put("/reward-disciplined/users", updateReward);

router.get("/party/users/:id", getJoinDCS);
router.post("/party", createJoinDCS);
router.post("/partyd", deleteJoinDCS);
router.put("/partyd/users", updateJoinDCS);

export default router;

