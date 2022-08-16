import express from "express";
import create from "../controllers/projects/create";
import update from "../controllers/projects/update";
import remove from "../controllers/projects/remove";
import read from "../controllers/projects/read";

const router = express.Router();

router.post("/create", create);

router.get("/search", read);

router.put("/update", update);

router.delete("/remove", remove);


export default router;