let mongoose = require("mongoose")

const addressSchema=mongoose.Schema({
    country:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    distrit:{
        type:String,
        require:true

    },
    pincode:{
        type:Number,
        require:true
    },
    area:{
        type:String
    }

})


const userSchema =mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"user"
    },
    address:{
        type:addressSchema
    },
    isActivated:{
        type:Boolean,
        default:false
    }

})


const UserModel =mongoose.model("user",userSchema)

module.exports={UserModel}