import express, { Request, Response, NextFunction } from "express";
const router = express.Router()

import {getAllApi, findVideogameByIdApi} from "../controllers/videogames"

// Get videogame by its id
router.get("/:id", async(req:Request, res:Response, next: NextFunction) => {
    const id: string = req.params.id;

    try{

        const apiResults: {}[] = await findVideogameByIdApi(id);

        if(!apiResults.length){
            return res.status(404).json({
                statusCode:404,
                msg: `Videogame with ID: ${id} not found!`
            })
        }

        res.status(200).json({
            statusCode:200,
            data: apiResults
        })

    }catch(error: any){
        return next(error)
    }

})

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