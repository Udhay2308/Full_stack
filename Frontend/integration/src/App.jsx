import React from 'react'
import { useState , useEffect } from 'react'
import axios from "axios"
const App = () => {
const [notes, setnotes] = useState([])
console.log("hell")

function fetchnotes(){
  axios.get("https://full-stack-2-dwm9.onrender.com/api/notes")
      .then((res) => {
       setnotes(res.data.notes)
      })
}
 useEffect(()=>{ // when the usestate variable is updated..ten component rerenders..so to stop this we use useEffect...the code written in this useeffect run only once..means app component will render only two times,one initially and other when usestate variable is updated.
   fetchnotes()
 },[])

  function handleSubmit(e){
    e.preventDefault()
    const {title , description} = e.target.elements

    axios.post("https://full-stack-2-dwm9.onrender.com/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data)
      fetchnotes()
    })
    
  }
  function handleDelete(noteid){
    console.log(noteid)
     axios.delete("https://full-stack-2-dwm9.onrender.com/api/notes/"+noteid)
    .then(res=>{
      console.log(res.data)
      fetchnotes()
    })
  }
  function handleUpdate(noteid) {
  const newDescription = prompt("Enter new description:");

  if (!newDescription) return;

  axios.patch("https://full-stack-2-dwm9.onrender.com/api/notes/" + noteid, {
    description: newDescription
  })
  .then(res => {
    console.log(res.data);
    fetchnotes(); // refresh notes
  });
}
  return (
      <>
      <form action="" className='notes-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description'/>
        <button>Create Note</button>
      </form>
      <div className='notes'>
        {
         notes.map((note,index) => {
          return <div className='note' key={index}>
                  <h1>{note.title}</h1>
                  <p>{note.description}</p>
                  <div className='bothbutton'>
                    <button className='eachdel' onClick={()=>{
                    handleDelete(note._id)
                  }}>Delete</button>
                  <button  className ='eachup' onClick={() => handleUpdate(note._id)}>
                   Update
                  </button>
                  </div>
                 </div>  
         })
        }
      </div>
      </>
  )
}

export default App
