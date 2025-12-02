import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectedDB } from "./config/db.js"

const app = express()
dotenv.config()
const port = process.env.PORT || 3000

app.use(cors())

app.get("/", (req, res)=>{
    res.send("Welcome to TradeSphere Backend!")
})

app.listen(port, ()=>{
    connectedDB()
    console.log(`server started on http://localhost:${port}`)
})