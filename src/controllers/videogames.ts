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