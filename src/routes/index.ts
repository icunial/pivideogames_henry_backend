import express from "express";
const router = express.Router()

import videogamesRouter from "./videogames"
import genresRouter from "./genres";

// Specify router root route
router.use("/videogames", videogamesRouter);
router.use("/genres", genresRouter);

export default router