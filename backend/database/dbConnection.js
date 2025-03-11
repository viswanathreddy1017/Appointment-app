import mongoose from "mongoose";

export const dbConnection = () => { 
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "APPOINTMENT MANAGEMENT APPLICATION",
        })
        .then(() => {
            console.log('MongoDB Connected');
        })
        .catch((err) => {
            console.log('Some error occurred while connecting to db:', err);
        });
};