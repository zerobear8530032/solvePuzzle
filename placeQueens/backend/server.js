import express from "express";
import mongoose from "mongoose";
import leaderboardModel from "./models/leaderboardModel.js";
import cors from "cors";
const app = express();
const port= 8000;

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// connect to db :
const connection=await mongoose.connect("mongodb://localhost:27017/placeQueens");
app.use(express.json());
app.use(cors(corsOptions));
app.get("/scores",async(req,res)=>{
    const data= await leaderboardModel.find();
    const userdata= [...data].map(user=>({name:user.name,seconds:user.seconds,date:user.date}));
    return res.json(userdata);
});

app.post("/scores",async(req,res)=>{
    try{
        const body = req.body;
        console.log(body);
        const new_entry = new leaderboardModel({name:body.name,seconds:body.seconds,difficulty:body.difficulty,boardSize:body.boardSize});
        await new_entry.save();
        return res.status(200).json({status:"success",message: "Score recorded !"});
    }catch(err){
        console.log(err);
        return res.status(500).json({status:"failed", message:err.name});
    }
});

app.listen(port,()=>{
console.log(`Server is Listening at : ${port}`)
});