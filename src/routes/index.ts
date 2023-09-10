import express from "express";
const router = express.Router()

import videogamesRouter from "./videogames"

// Specify router root route
router.use("/videogames", videogamesRouter);

export default router