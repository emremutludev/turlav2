import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export const initializeDatabaseMongo = async () => {
  try {
    // MongoDB connection string
    await mongoose.connect(process.env.DB_SERVER, {});
    console.log("Mongoose MongoDB: Connected");

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose MongoDB: Error", err);
    });

    mongoose.Promise = global.Promise;

    // MongoDB Native Driver => Use connect method to connect to the server
    const client = await MongoClient.connect(process.env.DB_SERVER);
    console.log("Mongodb Native: Connected");

    mongoose.mongoNative = client.db("turla_mongo");

    // Optional: Listen for MongoDB Native driver errors
    client.on("close", () => {
      console.error("Mongodb Native: Connection closed");
    });

    client.on("error", (err) => {
      console.error("Mongodb Native: Error", err);
    });
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};
