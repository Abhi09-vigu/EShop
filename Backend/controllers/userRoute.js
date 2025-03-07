
let express=require("express")
const { UserModel } = require("../model/userModel");
const catchAsyncError = require("../middelware/catchAsyncError");
const Errorhadler=require("../utils/errorhadler")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { sendMail } =require("../utils/mail")
let userRoute= express.Router()

  


userRoute.post("/login", async (req, res) => {
    console.log(req.body)

    try {
      const { email, pass , } = req.body;
  
      if (email && pass) {
        let nweUser = new UserModel({ email, pass });
        await nweUser.save();
        res.status(200).send({ message: "login is success" });
      } else {
        res.status(400).send({ message: "🤞invalid" });
      }
    } catch (error) {
      res.status(500).send({ message: "internal server error" });
  
    }
  });






  userRoute.post("/signup",catchAsyncError( async (req, res, next) => {
    console.log(req.body)

   
      const {name, email, pass } = req.body;
  
      if (!email || !pass ||!name) {
        next(new Errorhadler("name,email and password required",400))
      } 
      let user=await UserModel.findOne({email:email})
      if(user){
        next(new Errorhadler("user is already exist",400))
      }

      bcrypt.hash(pass,5,async(err,hash)=>{

          if(err){
            next(new Errorhadler("server error",500))
          }
          let newUser=new UserModel({name,email,pass:hash})
          


          let token =jwt.sign({id:newUser._id},process.env.SECRET,{expiresIn:60*60*60*5})
          let PORT=process.env.PORT
          let activation_url=`http://localhost:${PORT}/user/activation/${token}`
          try {
            await sendMail(
              {
                email:newUser.email,
                subject:"Activate your account",
                message:`Hello ${newUser.name},please click the link to activate your account:${activation_url}`,
              }
            )
            await newUser.save()
            res.status(200).json({status:true,message:"registration sucessfull"})
          } catch (error) {
              next(new Errorhadler("internal server error",500))
              console.log(error)
          }
         



      })
  
    
  }));


 userRoute.get("/activation/:token",async(req,res,next)=>{
         
  })




  module.exports={userRoute}