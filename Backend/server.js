const{app} = require("./app")
require("dotenv").config()

const port=process.env.PORT

const {connect}=require("./db/connection")





app.listen(port,async()=>{
    try{
        await connect
        
        console.log(`app is running on http://localhost:${port}`)

    }
    catch(err){
        console.log(err)
    }
    
 })