import mongoose from "mongoose";
const schemaCreator = mongoose.Schema;

const leaderboardSchema= new schemaCreator({
    name:{type:String , require:true},
    seconds: {type: Number,require:true},
    date : {type:Date, default:new Date()}
});

export default mongoose.model("leaderboard",leaderboardSchema);