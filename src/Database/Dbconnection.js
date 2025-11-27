import mongoose from "mongoose";

const DBconnection = async () => {
  try {
    const uri = process.env.MONGO_URI_ATLAS;
    const connected = await mongoose.connect(uri);
    if (connected) {
      console.log("MongoDB sucessfully connected.");
    } else {
      console.log("Connection failed");
    }
  } catch (err) {
    console.error("Something went wrong:", err.message);
  }
};

export default DBconnection;
