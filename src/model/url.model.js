import mongoose from "mongoose"

const urlSchema = mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl:{
        type: String,
        required: true,
    },
    visitHistory:[{timestamp: {type: Number}}],

}, {timestamp: true}) 

export const Url = mongoose.model("Url", urlSchema)