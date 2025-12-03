import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectedDB } from "./config/db.js"
import { authRouter } from "./routes/auth.route.js"
import { walletRouter } from "./routes/wallet.route.js"
import { watchListRouter } from "./routes/watchList.route.js"
import { tradeRouter } from "./routes/trade.route.js"
import { portFolioRouter } from "./routes/portfolio.route.js"
import { orderRouter } from "./routes/order.route.js"
import { stockSearchRouter } from "./routes/stockSearch.route.js"

const app = express()
app.use(express.json())

dotenv.config()
const port = process.env.PORT || 3000

app.use(cors())

app.use("/auth", authRouter)
app.use("/wallet", walletRouter)
app.use("/watchlist", watchListRouter)
app.use("/trade", tradeRouter)
app.use("/portfolio", portFolioRouter)
app.use("/order", orderRouter)
app.use("/stock", stockSearchRouter)

app.listen(port, ()=>{
    connectedDB()
    console.log(`server started on http://localhost:${port}`)
})