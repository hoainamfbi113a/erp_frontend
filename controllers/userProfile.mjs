import axios from "axios";
import express from "express";
import { getFamilyRelation } from "./UserProfile/Family7.mjs";
const router = express.Router();

router.get("/family/:id", getFamilyRelation);

export default router;

