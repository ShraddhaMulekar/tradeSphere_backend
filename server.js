import express from "express"
import cors from "cors"
import dotenv from "dotenv"

const app = express()
dotenv.config()
const port = process.env.PORT || 3000

app.use(cors())

app.get("/", (req, res)=>{
    res.send("Welcome to TradeSphere Backend!")
})

app.listen(port, ()=>{
    console.log(`server started on http://localhost:${port}`)
})