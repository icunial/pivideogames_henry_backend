import express, { Request, Response, NextFunction } from "express";
const router = express.Router()

// Get all videogames
router.get("/", async(req:Request, res: Response, next: NextFunction) => {

    try{

        const apiResults: {}[] = await videogamesController.getAllApi();

        res.status(200).json({
            statusCode:200,
            data: apiResults
        })

    }catch(error: any){
        return next(error)
    }

})