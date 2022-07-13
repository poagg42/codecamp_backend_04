import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean
})

export const Board = mongoose.model("Board", BoardSchema)