require("dotenv").config()
const app = require("./src/app")
const connecttoDB = require("./src/config/database")

connecttoDB()

app.listen(3000,()=>{
    console.log("The server is running on port number 3000...")
})