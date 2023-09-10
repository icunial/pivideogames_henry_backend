import {Genre} from "../models/Genre";

type GenreItem = {
    id: number,
    name: String
}

// Get genre by its name
export const getGenreByNameDb = async(name: string): Promise<GenreItem[]> => {
    const result: GenreItem[] = []

    try{

        const dbResults = await Genre.find({
            name: name.toUpperCase()
        })

        if(dbResults.length > 0){
            result.push({
                id: dbResults[0].id,
                name: dbResults[0].name
            })

            return result;
        }

        return result
    }catch(error: any){
        throw new Error("Error trying to get a genre by its name from DB")
    }

}