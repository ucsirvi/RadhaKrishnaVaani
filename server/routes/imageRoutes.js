import express from "express";
import { getAllImages } from "../controllers/imageController.js";

const router = express.Router();

router.get("/", getAllImages);

export default router;
