import express from "express";
import {
  getAllChapters,
  getChapterById,
  getVerseById,
} from "../controllers/chapterController.js";

const router = express.Router();

router.get("/chapters", getAllChapters);
router.get("/chapters/:chapterId", getChapterById);
router.get("/chapters/:chapterId/verse/:verseId", getVerseById);

export default router;
