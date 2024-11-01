import mongoose from "mongoose";

 export const ConnectDB = async() =>{
    await mongoose.connect('mongodb+srv://random:pubg09@cluster0.3iegn.mongodb.net/blog-app');
    console.log("DB Connected");
}