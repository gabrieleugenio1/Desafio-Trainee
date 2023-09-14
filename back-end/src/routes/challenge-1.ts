import { Router } from "express";
import Challenge1Controller from "../controllers/challenge-1";
const router = Router();

router.post("/", Challenge1Controller.index);


export default router;
