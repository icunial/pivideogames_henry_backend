import express, {Request, Response, NextFunction} from "express"
const PORT: string | number = process.env.PORT || 5000;
const app = express.application = express()

import router from "./routes/index"

import db from "./db";

// Check DB connection
db.once("open", () => {
    console.log("Connected to MongoDB");
})

// Check for DB errors
db.on("error", (error: any) => {
    console.log(error);
})

// Body-Parser Middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Res Headers
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// Router Middleware
app.use("/", router)

interface responseObject {
    statusCode: number,
    msg: string
}

// Error catching endware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status: number = err.status || 500
    const message: string = err.message || err
    const response: responseObject = {
        statusCode: status,
        msg: message
    }
    res.status(status).json(response)
})

// Initialized Express Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})