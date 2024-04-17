import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI! as string,{
            dbName: "nextAuth"
        })
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("connected to db"); 
        })
        connection.on("error", (e) => {
            console.log("MongoDB connection error", e);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong while connnecting db", error)
        mongoose.connect;
        
    }
}