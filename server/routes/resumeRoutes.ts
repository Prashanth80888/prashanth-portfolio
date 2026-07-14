import express from "express";
import {
  downloadResume,
  getResumeStats,
} from "../controllers/resumeController";

const router = express.Router();

// Record resume download
router.post("/download", downloadResume);

// Get resume analytics
router.get("/stats", getResumeStats);

export default router;