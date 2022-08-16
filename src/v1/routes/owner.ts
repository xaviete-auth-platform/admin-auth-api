import express from "express";
import register from "../controllers/owners/register";
import login from "../controllers/owners/login";
import update from "../controllers/owners/update";

const router = express.Router();

router.get("/register", register);

router.get("/login", login);

router.put("/update", update);

export default router;