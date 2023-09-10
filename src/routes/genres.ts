import express, { Request, Response, NextFunction } from "express";
const router = express.Router()

import {Genre} from "../models/Genre";
import axios from "axios";

import dotenv from "dotenv"
dotenv.config()

import {getGenreByNameDb} from "../controllers/genres"

const GENRES_URL = "https://api.rawg.io/api/genres";

type GenreItem = {
    id: number,
    name: String
}

// Get all genres from DB
router.get("/", async(req: Request, res: Response, next: NextFunction) => {

    const results: GenreItem[] = [];

    try{

        const dbResults = await Genre.find();
        
        if(!dbResults.length){

            const apiResults = await axios.get(`${GENRES_URL}?key=${process.env.API_KEY}`);
            let r:GenreItem;

            if(apiResults){
                for(r of apiResults.data.results) {
                    const genreCreated = await Genre.create({
                        name: r.name.toUpperCase()
                    })
                    if(genreCreated){
                        results.push({
                            id: r.id,
                            name: r.name.toUpperCase()
                        })
                    }

                }
            }
       
        }else{
            for(const r of dbResults){
                results.push({
                    id: r.id,
                    name: r.name
                })
            }
        }

        res.status(200).json({
            statusCode:200,
            data: results
        })

    }catch(error: any){
        console.log(error.message)
        return next(new Error("Error trying to get all genres from DB"));
    }

})

// Get genre by name
router.get("/:name", async(req: Request, res: Response, next: NextFunction) => {

    const name = req.params.name;

    try{
   
        const result: GenreItem[] = await getGenreByNameDb(name);

        if(!result.length){

            return res.status(404).json({
                statusCode:404,
                msg: `Genre ${name} not found!`
            })

        }else{

            return res.status(200).json({
                statusCode:200,
                data: result
            })

        }

    }catch(error: any){
        return next(error);
    }

})

export default router;