import mongoose from "mongoose";

 const UserSchema  = new mongoose.Schema({ 
    email : { type: String, required:true , unique:true},
    password : { type: String, required:true},
    isCreatedAt : { type:Date, default:  Date.now()}
})


export default mongoose.models?.user || mongoose.model('user', UserSchema)
