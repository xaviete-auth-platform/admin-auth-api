import express from "express";

import verifyEmail from "../controllers/mails/verifyEmail";

const router = express.Router();

router.post("/verify", verifyEmail);

export default router;