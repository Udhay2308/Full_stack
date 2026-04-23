const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")
const app = express()
app.use(cors())
app.use(express.static("./public")) //All the content in the ublic folder is publically available for user to acces..and our index.html file send api request for css and js file ..so if 
// they exists in public folder then okay and res is send,but if not then control goes to (app.use('*name',(req,res)=>{ 
//     res.sendFile(path.join(__dirname,"..","/public/index.html"))
// }))
app.use(express.json())
app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message :"Note created Successfully",note
    })
})
app.get("/api/notes",async(req,res)=>{

    const notes = await noteModel.find()
    res.status(200).json({
        message :"Notes fetched Successfully",notes
    })
})
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(201).json({
        message :"Note deleted Successfully"
    })
})
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {description} = req.body
    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message :"Note updated Successfully"
    })
})
app.use('*name',(req,res)=>{ // use to return the html file if any other api request occur which in not in server.
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})
module.exports = app