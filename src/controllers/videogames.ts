import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const API_URL: string = "https://api.rawg.io/api/games"

import { Videogame } from "../models/Videogame";
import { Genre } from "../models/Genre";

type Data = {
    id: number,
    name: string, 
    background_image: string,
    rating: number
}

type ResObj = {
    id: number,
    name: string,
    image: string,
    rating: number,
    genre: string[]
}

// Get all videogames from API
export const getAllApi = async ():Promise<ResObj[]> => {
 
    const results: ResObj[] = []

    try{

        const apiResults = await axios.get(`${API_URL}?key=${process.env.API_KEY}`)

        if(apiResults){
            apiResults.data.results.forEach((r: Data) => {
                results.push({
                    id: r.id,
                    name: r.name,
                    image: r.background_image,
                    rating: r.rating,
                    genre: []
                })
            })
        }

        for(const r of results){
            const apiResults = await axios.get(`${API_URL}/${r.id}?key=${process.env.API_KEY}`);
            if(apiResults){
               const genres: string[] = []
               for(const r of apiResults.data.genres){
                genres.push(r.name.toUpperCase())
               }
               r.genre = genres
            }
        } 

        return results
    }catch(error: any){
        throw new Error("Error trying to get all videogames from API")
    }
}

type DataById = {
    id: number,
    name: string, 
    background_image: string
    description: string,
    released: string,
    rating: number,
    genres: [],
    platforms: []
}

type ResObjId = {
    id: number,
    name: string,
    image: string,
    description: string,
    released: string,
    rating: number,
    genres: string[],
    platforms: string[]
}

type GenreItem = {
    name: string,
}

type PlatformItem = {
    platform: {
        name: string
    }
}

// Get videogame by its id from API
export const findVideogameByIdApi = async(id: string): Promise<ResObjId[]> => {
    const result: ResObjId[] = []

    try{
        const apiResults = await axios.get(`${API_URL}/${id}?key=${process.env.API_KEY}`);

        const data: DataById = apiResults.data;

        if(data){
            const genres: string[] = []
            const platforms: string[] = []

            let genre: GenreItem
            for(genre of data.genres){
                genres.push(genre.name.toUpperCase())
            }

            let platform: PlatformItem
            for (platform of data.platforms){
                platforms.push(platform.platform.name.toUpperCase())
            }

            result.push({
                id: data.id,
                name: data.name,
                image: data.background_image,
                description: data.description,
                released: data.released,
                rating: data.rating,
                genres: genres,
                platforms: platforms
            })
        }

        return result;
    }catch(error: any){
        throw new Error("Error trying to get a videogame by its ID");
    }

}

// Get videogames by their name from API
export const findByNameApi = async (name: string): Promise<ResObj[]> => {
    try{
        console.log(name)
        const apiResults: ResObj[] = await getAllApi();

        return apiResults.filter((r: ResObj) => {
            return r.name.toUpperCase().startsWith(name.toUpperCase())
        })

    }catch(error: any){
        throw new Error("Error trying to get a videogame by its name")
    }
}

// Get Videogames ordered from A to Z from API
export const orderVideogamesFromAtoZ = async (): Promise<ResObj[]> => {
    try{

        const apiResults: ResObj[] = await getAllApi();

        return apiResults.sort((a: ResObj, b: ResObj) => {
            if(a.name > b.name) return 1;
            if(a.name < b.name) return -1;
            return 0;
        })

    }catch(error: any){
        throw new Error("Error trying to order videogames from A to Z from API")
    }
}

// Get Videogames ordered from Z to A from API
export const orderVideogamesFromZtoA = async (): Promise<ResObj[]> => {
     try{

        const apiResults: ResObj[] = await getAllApi();

        return apiResults.sort((a: ResObj, b: ResObj) => {
            if(a.name < b.name) return 1;
            if(a.name > b.name) return -1;
            return 0;
        })

    }catch(error: any){
        throw new Error("Error trying to order videogames from Z to A from API")
    }
}

// Get Videogames ordered from More to Less rating from API
export const orderVideogamesFromMoreToLess = async (): Promise<ResObj[]> => {
    try{

        const apiResults: ResObj[] = await getAllApi();

        return apiResults.sort((a: ResObj, b: ResObj) => {
            if(a.rating < b.rating) return 1;
            if(a.rating > b.rating) return -1;
            return 0;
        })

    }catch(error: any){
        throw new Error("Error trying to order videogames from More to Less rating from API")
    }

}

// Get Videogames ordered from Less to More rating from API
export const orderVideogamesFromLessToMore = async (): Promise<ResObj[]> => {
    try{

        const apiResults: ResObj[] = await getAllApi();

        return apiResults.sort((a: ResObj, b: ResObj) => {
            if(a.rating > b.rating) return 1;
            if(a.rating < b.rating) return -1;
            return 0;
        })

    }catch(error: any){
        throw new Error("Error trying to order videogames from More to Less rating from API")
    }
} 

// Get videogames filtered by genre
export const videogamesFilteredByGenre = async(genre: string) : Promise<ResObj[]> => {

    try{

        const apiResults: ResObj[] = await getAllApi();

        return apiResults.filter((r: ResObj) => r.genre?.includes(genre.toUpperCase()))

    }catch(error: any){
        throw new Error("Error trying to filter videogames by genre")
    }

}

// Get all videogames from DB
export const getAllDb = async () : Promise<ResObj[]> => {

    const results : ResObj[] = [];

    try{

        const dbResults = await Videogame.find();

        if(dbResults){

           for(let r of dbResults){

                const genres: string[] = [];

                if(r.genre.length > 0){

                    for(let genre of r.genre){

                        const genreFound = await Genre.find({_id : genre});

                        if(genreFound){

                            genres.push(genreFound[0].name)

                        }

                    }

                }

                results.push({
                    id: r.id,
                    name: r.name,
                    image: r.image,
                    rating: r.rating,
                    genre: genres
                })
            }

        }

        return results;

    }catch(error:any){
        console.log(error.message)
        throw new Error("Error trying to get all videogames from DB")
    }

}   

// Get videogames by their names from DB
export const findByNameDb = async (name:string) : Promise<ResObj[]> => {

    const results : ResObj[] = [];

    try{

        const dbResults = await Videogame.find({name});

        if(dbResults){

           for(let r of dbResults){

                const genres: string[] = [];

                if(r.genre.length > 0){

                    for(let genre of r.genre){

                        const genreFound = await Genre.find({_id : genre});

                        if(genreFound){

                            genres.push(genreFound[0].name)

                        }

                    }

                }

                results.push({
                    id: r.id,
                    name: r.name,
                    image: r.image,
                    rating: r.rating,
                    genre: genres
                })
            }

        }

        return results;

    }catch(error:any){
        console.log(error.message)
        throw new Error("Error trying to get all videogames by their names from DB")
    }

}   
