import express, { Request, Response, NextFunction } from "express";
const router = express.Router()

import {getAllApi, findVideogameByIdApi, findByNameApi, orderVideogamesFromAtoZ, orderVideogamesFromZtoA, orderVideogamesFromMoreToLess, orderVideogamesFromLessToMore, videogamesFilteredByGenre} from "../controllers/videogames"

import {validateName, validateDescription, validateRating, validateReleased} from "../utils/validations"

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

    const name = req.query.name;

    try{

        if(name){
            const apiResults: {}[] = await findByNameApi(name.toString());

            if(!apiResults.length){
                return res.status(400).json({
                    statusCode:404,
                    msg: `Videogame with name ${name} not found!`
                })
            }

            return res.status(200).json({
                statusCode:200,
                data: apiResults
            })

        }

        const apiResults: {}[] = await getAllApi();

        res.status(200).json({
            statusCode:200,
            data: apiResults
        })

    }catch(error: any){
        return next(error)
    }

})

// Order features routes
router.get("/filter/:opt", async (req: Request, res: Response, next:NextFunction) => {

    const opt = req.params.opt;

    try{

        let results: {}[] = []

        switch(opt){
            case "az":
                results = await orderVideogamesFromAtoZ()
                break;
            case "za":
                results = await orderVideogamesFromZtoA()
                break;
            case "more":
                results = await orderVideogamesFromMoreToLess()
                break;
            case "less":
                results = await orderVideogamesFromLessToMore()
                break; 
            default:
                return res.status(400).json({
                    statusCode: 400,
                    msg: `Filter not available`
                })
        }

        res.status(200).json({
            statusCode:200,
            data: results
        })

    }catch(error: any){
        return next(error);
    }
 
})

// Get videogames filtered by genre
router.get("/genre/:genre", async(req:Request, res:Response, next:NextFunction) => {

    const genre = req.params.genre;

    try{

        const apiResults: {}[] = await videogamesFilteredByGenre(genre)

        if(!apiResults.length){
            return res.status(404).json({
                statusCode:404,
                msg: `Genre ${genre} not found!`
            })
        }

        res.status(200).json({
            statusCode:200,
            data: apiResults
        })

    }catch(error:any){
        return next(error);
    }

})

// Create a new videogame
router.post("/", async(req: Request, res: Response, next: NextFunction) => {

    const {name, image, description, released, rating} = req.body;

    // Validations -> body parameters
    if(validateName(name)) {
        return res.status(400).json({
            statusCode:400,
            msg: validateName(name)
        })
    }

    if(validateDescription(description)){
        return res.status(400).json({
            statusCode:400,
            msg: validateDescription(description)
        })
    }

    if(validateRating(rating)){
        return res.status(400).json({
            statusCode: 400,
            msg: validateRating(rating)
        })
    }

    if(validateReleased(released)){
        return res.status(400).json({
            statusCode:400,
            msg: validateReleased(released)
        })
    }

})

export default router