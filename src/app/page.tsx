'use client'
import React from 'react'
import { authClient } from '@/lib/auth-client'

export default function Home() {
  const handleSignIn = async () => {
    const data = await authClient.signIn.social({provider: 'github'})
    console.log(data)
  }
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleSignIn}>Sign in with Github</button>
    </div>
  );
}
