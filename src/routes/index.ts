import {
  createBooking,
  dashboardData,
  markCompleted,
} from "@/controllers/booking";
import { Router } from "express";

const router = Router();

router.post("/booking", createBooking);
router.patch("/booking/:id/complete", markCompleted);
router.get("/dashboard", dashboardData);
export default router;
