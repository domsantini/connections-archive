'use client'
import React from 'react'
import useGetPuzzle from './hooks/use-get-puzzle'
import { puzzleEx } from './data'
import { Flow_Circular } from 'next/font/google'

export default function Home() {
  const [currentGuess, setCurrentGuess] = React.useState<string[]>([])
  const { initialBoard, answerKey } = useGetPuzzle(puzzleEx);
      
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
  
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    
    console.log('submitting')
    
    event.preventDefault()
    
    function checkAnswer(currentGuess: string[], answerKey: { title: string, answers: string[]}[]) {
      let maxCorrect = 0;
      
      for (const category of answerKey) {
        if (currentGuess.toString() === category.answers.toString()) {
          console.log(`Correctly guessed ${category.title}`)
          return
        } else {
          let currCorrect = 0;
          
          for (const word of currentGuess) {
            if (category.answers.includes(word)) {
              currCorrect++
            } else {
              continue
            }
            
            maxCorrect = Math.max(currCorrect, maxCorrect)
          }
          console.log(`Close.. You got ${maxCorrect}`)
        }
      }
    }
    
    checkAnswer(currentGuess, answerKey)
  }
  
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
          <button className='px-4 py-2 border-2 border-solid border-neutral-300 rounded-full' onClick={(event) => handleSubmit(event)}>Submit</button>
        </div>
      </main>
    </>
  );
}
