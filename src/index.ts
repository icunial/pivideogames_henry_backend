import express, {Request, Response, NextFunction} from "express"
const PORT: string | number = process.env.PORT || 5000;
const app = express.application = express()

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

// Initialized Express Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})