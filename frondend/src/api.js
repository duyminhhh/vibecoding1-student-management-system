import axios from "axios"

const API = "http://127.0.0.1:8000"

export const getStudents = async () => {
  const res = await axios.get(`${API}/students`)
  return res.data
}

export const addStudent = async (data) => {
  const res = await axios.post(`${API}/students`, data)
  return res.data
}

export const deleteStudent = async (id) => {
  const res = await axios.delete(`${API}/students/${id}`)
  return res.data
}

export const updateStudent = async (id, data) => {
  const res = await axios.put(`${API}/students/${id}`, data)
  return res.data
}