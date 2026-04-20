import React from 'react'
import { useState } from 'react'
import axios from "axios"
const App = () => {
const [notes, setnotes] = useState([
  {
    "title" : "test title 1",
    "description" : "test description 1"
  },
   {
    "title" : "test title 2",
    "description" : "test description 2"
  },
   {
    "title" : "test title 3",
    "description" : "test description 3"
  },
   {
    "title" : "test title 4",
    "description" : "test description 4"
  }
])
 axios.get("http://localhost:3000/api/notes")
      .then((res) => {
       setnotes(res.data.notes)
      })
  return (

      <div className='notes'>
        {
         notes.map((note,index) => {
          return <div className='note' key={index}>
                  <h1>{note.title}</h1>
                  <p>{note.description}</p>
                 </div>  
         })
        }
      </div>
  )
}

export default App
