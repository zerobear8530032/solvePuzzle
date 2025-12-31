import express from "express";
import mongoose from "mongoose";
import leaderboardModel from "./models/leaderboardModel.js";
const app = express();
const port= 8000;

// connect to db :
const connection=mongoose.connect("mongodb://localhost:27017/placeQueens");
app.use(express.json());
app.get("/scores",async(req,res)=>{
    const data= await leaderboardModel.find();
    const userdata= [...data].map(user=>({name:user.name,seconds:user.seconds,date:user.date}));
    return res.json(userdata);
})

app.post("/scores",(req,res)=>{
    try{
        const body = req.body;
        console.log(body);
        const new_entry = new leaderboardModel({name:body.name,seconds:body.seconds});
        new_entry.save();
        return res.json({status:success,message: "Score recorded !"});
    }catch(err){
        console.log(err);
    }
})

app.listen(port,()=>{
console.log(`Server is Listening at : ${port}`)
});