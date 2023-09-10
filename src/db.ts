import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
const db = mongoose.connection;

export default db;