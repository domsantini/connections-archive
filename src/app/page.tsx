'use client'
import React from 'react'

import { puzzleEx } from './data'

export default function Home() {
  const [currentGuess, setCurrentGuess] = React.useState<string[]>([])
  const initialBoard: { content: string, position: number }[] = [];
  const { categories } = puzzleEx
  
  categories.forEach(({ title, cards }) => {
    cards.forEach(({ content, position }, index)=> {
      initialBoard.push({ content, position })
      initialBoard.sort((a, b) => a.position - b.position)
    })
  })
    
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const content = event.currentTarget.innerText;
    const inArray = currentGuess.includes(content);
    const fullArray = currentGuess.length === 4;
    
    if (inArray && fullArray || inArray) {
      const newCurrentGuess = currentGuess.filter((guess) => guess != content).sort()
      setCurrentGuess(newCurrentGuess)
    }  else if (fullArray) {
      return
    } else {
      const newGuess = content
      setCurrentGuess((prevGuesses) => {
        const nextGuess = [...prevGuesses, newGuess]
        return nextGuess.sort()
      })
    }
  }
  
  console.log(currentGuess)
  
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen border-2 border-solid border-green-300">
        <div className='grid grid-cols-4 grid-rows-4 place-items-center gap-1 border-2 border-solid border-blue-300'>
          {initialBoard.map(({ content, position }, index) => (
            <button 
              key={`${content}-${position}`}
              className={
                `h-full w-full aspect-square border-2 border-solid border-neutral-300 rounded-lg 
                ${currentGuess.length === 4 ? 'cursor-default' : 'hover:bg-neutral-400 active:bg-neutral-500 cursor-pointer'} 
                ${currentGuess.includes(content) ? 'bg-neutral-400 hover:cursor-pointer active:bg-neutral-500' : 'bg-neutral-200'}`
              } 
              onClick={(event) => handleClick(event)}
            >
              {content}
            </button>
          ))}          
        </div>
        <div>
          <button className='px-4 py-2 border-2 border-solid border-neutral-300 rounded-full'>Shuffle</button>
          <button className='px-4 py-2 border-2 border-solid border-neutral-300 rounded-full'>Submit</button>
        </div>
      </main>
    </>
  );
}
