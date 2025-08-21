import React from 'react'
import Card from './components/Card'

async function getData(){
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await res.json()
  return data
}

type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export default async function Home() {
  const posts: Post[] = await getData()
  const sortedPosts = posts.slice(0, 3)
  return (
    <div>
      <Card title='repetitionsövning 1' desc='hej hej'/>
      {sortedPosts.map(post => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}