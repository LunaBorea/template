'use client'
import React from 'react'
import { authClient } from '@/lib/auth-client'

export default function Home() {
  const {data: session} = authClient.useSession()
  console.log('user', session?.user)
  const handleSignIn = async () => {
    const data = await authClient.signIn.social({provider: 'github'})
    console.log(data)
  }
  return (
    <div>
      <h1>Hello</h1>
      <h1>Hello</h1>
      {session?.user && (
        <div>
          <h2>{session.user.name}</h2>
          <p>{session.user.email}</p>
          <img src={session.user.image || ''} alt="profile" />
        </div>
      )}
      <button onClick={handleSignIn}>Sign in with Github</button>
    </div>
  );
}
