import express from "express";
import create from "../controllers/request/create";

const router = express.Router();

router.post("/create", create);

export default router;
