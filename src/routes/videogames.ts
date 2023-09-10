import express, { Request, Response, NextFunction } from "express";
const router = express.Router()

import {getAllApi} from "../controllers/videogames"

// Get all videogames
router.get("/", async(req:Request, res: Response, next: NextFunction) => {

    try{
        const apiResults: {}[] = await getAllApi();

        res.status(200).json({
            statusCode:200,
            data: apiResults
        })

    }catch(error: any){
        return next(error)
    }

})

export default router