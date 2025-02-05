const express = require("express");

const app = express();
app.use(express.json());

const {userRoute} = require("./controllers/userRoute")

app.get("/test", async (req, res) => {
  res.send("hello.....");
});


app.use("/user",userRoute)



// app.post("/create",catchAsyncErrors(async(req,res,next)=>{
//   const{name,email,password}=req.body;
//   if(name&&email&&password){
//     const newUser=new UserModel({
//       name,email,password
//   })
//   await newUser.save();
//   res.status(200).send({msg:"Successful"})
//   }
// }))
// app.use(Errorhandle)

module.exports = { app };