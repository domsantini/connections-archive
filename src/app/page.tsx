'use client'
import React from 'react'
import PuzzleHeader from './components/PuzzleHeader';
import PuzzleWrapper from './components/PuzzleWrapper'

import useGetPuzzle from './hooks/use-get-puzzle';
import { puzzleEx } from './data';

export default function Home() {
  
  return (
    <>
      <main className="flex flex-col grow h-full">
        <PuzzleWrapper />
      </main>
    </>
  );
}
