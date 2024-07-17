'use client'
import React from 'react'
import PuzzleWrapper from './components/PuzzleWrapper'

export default function Home() {
    
  return (
    <>
      <main className="flex flex-col justify-start items-center min-h-screen border-2 border-solid border-green-300">
        <PuzzleWrapper />
      </main>
    </>
  );
}
