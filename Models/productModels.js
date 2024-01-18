import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({ 
    name:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true},
    Img:{type:String,required:true},
    rating:{type:Number, default:0},
    // numofReviews:{type:String,require:true},
    category:{type:String,required:true},
    stock:{type:String,required:true},
    // reviews:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"user",
    //     required:true,
    // },
    created_at:{type:Date, default: Date.now()}
})

export default mongoose.models?.Product || mongoose.model("Product",ProductSchema)