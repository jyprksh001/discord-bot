import mongoose from 'mongoose'
declare let process: any

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) return
  try{
    await  mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
  }catch(err){
    throw `Error connecting to database: ${err}`; 
  }
}

export default dbConnect;
