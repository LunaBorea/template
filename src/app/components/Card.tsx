import React from 'react'

export default function Card({title, desc}:{title: string, desc?: string}) {
  return (
      <div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    )
}
