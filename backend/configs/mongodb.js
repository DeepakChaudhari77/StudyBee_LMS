import mongoose from "mongoose";

//Connect to the MongoDB Database

const connectDB = async () =>{
    mongoose.connection.on('connected', ()=>console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/studybee`)
}

export default connectDB;