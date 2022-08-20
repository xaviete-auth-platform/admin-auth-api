import express from "express";
import register from "../controllers/owners/register";
import login from "../controllers/owners/login";
import update from "../controllers/owners/update";
import verifyCode from "../controllers/owners/verifyCode";

const router = express.Router();

router.post("/register", register);
router.post("/verify/code", verifyCode)

router.post("/login", login);

router.put("/update", update);



export default router;