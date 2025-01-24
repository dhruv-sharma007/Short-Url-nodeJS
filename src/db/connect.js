import mongoose from "mongoose";


export const connectDb = ()=>{
   try {
     return  mongoose.connect(process.env.DB_URI)
   } catch (error) {
    console.log(`Error in connecting | Error :${error}`)
   }
}