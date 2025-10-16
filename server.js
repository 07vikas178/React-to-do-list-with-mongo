const express=require('express');
const mongoose=require('mongoose');
const path=require('path');

const app=express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost:27017/taskapp')
.then(()=>{console.log("MongoDb connected successfully")})
.catch((err)=>{console.log(err)})



const mongooseSchema=new mongoose.Schema({
    task:{type: [String], required: true},   //this should be an array, make it that way
    date:{type: String, required: true}
})

const DailyTask=mongoose.model('DailyTask',mongooseSchema);


app.get( "/api/fetch", async (req,res)=>{
    try{
    const data=await DailyTask.find();
    res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error",err});
    }
});



app.post("/api/store", async (req, res) => {
  try {
    const { task, date } = req.body;  // get data sent from frontend

    // Create new document in MongoDB
    const newTask = new DailyTask({
      task,  // this is an array of strings
      date
    });

    await newTask.save();  // save into MongoDB
    res.status(201).json({ message: "Task added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding task", error });
  }
});



app.listen("5001",()=>{
    console.log("Server running on the port 5001");
})