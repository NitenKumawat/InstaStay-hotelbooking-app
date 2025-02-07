// const mongoose=require('mongoose');
// require("dotenv").config();
// const connectDb=async()=>{
//     try{
//        await mongoose.connect(process.env.MONGO_URI);
//        console.log('Database connected')
        
//     }
//     catch(e){
//         console.log('database not connected');
//     }
// }
// connectDb();
const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
     
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

connectDb();
