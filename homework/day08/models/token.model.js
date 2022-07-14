import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean
})
//schema를 가지고 mongoose의 Board 컬렉션을 만든다
export const Board = mongoose.model("Board", boardSchema)