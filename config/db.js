import mongoose from "mongoose";

export const connectedDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
        return {msg:error, error}
    }
}