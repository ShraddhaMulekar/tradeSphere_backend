import mongoose from "mongoose";

const LogOutSchema = new mongoose.Schema({
    token:{type:String, required:true},
    time:{type:Date, default:Date.now}
},{
    versionKey:false
})

export const LogoutModel = mongoose.model("logOut", LogOutSchema)