import mongoose from "mongoose";

// Genre Schema

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    videogames:{
        type: [String]
    }
})

export const Genre = mongoose.model("Genre", genreSchema)