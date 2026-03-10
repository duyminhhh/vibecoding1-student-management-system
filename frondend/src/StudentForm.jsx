import React, { useState } from "react"
import { addStudent } from "./api"

function StudentForm({ reload }) {

const [data,setData] = useState({
name:"",
birth_year:"",
major:"",
gpa:""
})

const handleChange = (e)=>{
setData({
...data,
[e.target.name]:e.target.value
})
}

const submit = async(e)=>{

e.preventDefault()

await addStudent({
name:data.name,
birth_year:Number(data.birth_year),
major:data.major,
gpa:Number(data.gpa)
})

setData({
name:"",
birth_year:"",
major:"",
gpa:""
})

reload()

}

return(

<div className="card">

<h3>Add Student</h3>

<form onSubmit={submit} style={{display:"flex",gap:"10px"}}>

<input
name="name"
placeholder="Name"
value={data.name}
onChange={handleChange}
/>

<input
name="birth_year"
placeholder="Birth Year"
value={data.birth_year}
onChange={handleChange}
/>

<input
name="major"
placeholder="Major"
value={data.major}
onChange={handleChange}
/>

<input
name="gpa"
placeholder="GPA"
value={data.gpa}
onChange={handleChange}
/>

<button className="btn save">
Add
</button>

</form>

</div>

)

}

export default StudentForm