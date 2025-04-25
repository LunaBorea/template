'use client'
import React, { use, useEffect, useState } from 'react'

export default function page() {
    const [todos, setTodos] = useState([]) 
    const fetchData =  async() => {
        const res = await fetch('/api/todo')
        const data = await res.json()
        console.log('data', data)
        setTodos(data)
    }
    useEffect(() => {
        fetchData()
    },[])
  return (
    <div>
        <h1>Dashboard</h1>
        {/* {todos.map(todo=> (
          <div>
            <h1>{todo.name}</h1>
            <h2>{todo.email}</h2>
          </div>  
        ))} */}
    </div>
  )
}