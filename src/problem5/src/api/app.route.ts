import express from "express";

import resourceRouter from "./resource/resource.route";

const router = express.Router();
router.use("/resources", resourceRouter)

export default router;
