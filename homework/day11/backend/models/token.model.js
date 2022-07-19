import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    mytoken: String,
    myphone: String,
    isAuth: Boolean 
});

export const Token = mongoose.model('Token', tokenSchema)
