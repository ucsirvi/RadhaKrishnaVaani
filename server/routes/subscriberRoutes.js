import express from "express";
import {
  subscribe,
  unsubscribe,
  checkSubscriptionStatus,
} from "../controllers/subscriberController.js";

const router = express.Router();

router.post("/subscribe", subscribe);

router.delete("/unsubscribe", unsubscribe);

router.get("/check-subscription", checkSubscriptionStatus);

export default router;
