import express, { Request, Response, NextFunction } from "express";
const router = express.Router()

import {Genre} from "../models/Genre";
import axios from "axios";

import dotenv from "dotenv"
dotenv.config()

const GENRES_URL = "https://api.rawg.io/api/genres";

type GenreItem = {
    id: number,
    name: String
}

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

export default router;