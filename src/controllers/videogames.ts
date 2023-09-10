import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const API_URL: string = "https://api.rawg.io/api/games"

type Data = {
    id: number,
    name: string, 
    background_image: string
}

type ResObj = {
    id: number,
    name: string,
    image: string
    genre?: string[]
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
                    image: r.background_image
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
