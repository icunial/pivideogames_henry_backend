import mongoose from "mongoose";

// Videogame schema

const videogameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    released: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    genre:{
        type: [String]
    },
    platforms:{
        type: [String]
    }
})

export const Videogame = mongoose.model("Videogame", videogameSchema);

