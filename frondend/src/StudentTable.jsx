import React, { useEffect, useState } from "react"
import { getStudents, deleteStudent, updateStudent } from "./api"

function StudentTable({ refresh, reload }) {

const [students, setStudents] = useState([])
const [editing, setEditing] = useState(null)
const [data, setData] = useState({})

const load = async () => {
  const res = await getStudents()
  setStudents(res)
}

useEffect(() => {
  load()
}, [refresh])

const startEdit = (s) => {
  setEditing(s.student_id)

  setData({
    name: s.name,
    major: s.major,
    gpa: s.gpa
  })
}

const save = async (id) => {
  await updateStudent(id, data)
  setEditing(null)
  reload()
}

const remove = async (id) => {
  await deleteStudent(id)
  reload()
}

return (

<div className="card">

<h3>Student List</h3>

<table className="student-table">

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Major</th>
<th>GPA</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{students.map(s => (

<tr key={s.student_id}>

<td>{s.student_id}</td>

<td>
{editing === s.student_id ?

<input
value={data.name}
onChange={(e)=>setData({...data,name:e.target.value})}
/>

: s.name}
</td>

<td>
{editing === s.student_id ?

<input
value={data.major}
onChange={(e)=>setData({...data,major:e.target.value})}
/>

: s.major}
</td>

<td>
{editing === s.student_id ?

<input
value={data.gpa}
onChange={(e)=>setData({...data,gpa:e.target.value})}
/>

: s.gpa}
</td>

<td>

{editing === s.student_id ?

<>

<button className="btn save" onClick={()=>save(s.student_id)}>
Save
</button>

<button className="btn cancel" onClick={()=>setEditing(null)}>
Cancel
</button>

</>

:

<>

<button className="btn edit" onClick={()=>startEdit(s)}>
Edit
</button>

<button className="btn delete" onClick={()=>remove(s.student_id)}>
Delete
</button>

</>

}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default StudentTable