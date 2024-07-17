'use client'
import React from 'react'
import PuzzleHeader from './PuzzleHeader';
import PuzzleBoard from './PuzzleBoard';
import PuzzleButtons from './PuzzleButtons'
import useGetPuzzle from '../hooks/use-get-puzzle';
import { puzzleEx } from '../data'
import {randomize} from '../utils/utils'

function PuzzleWrapper() {
  const { id, date, initialBoard, answerKey } = useGetPuzzle(puzzleEx);
  const [puzzleBoard, setPuzzleBoard] = React.useState(initialBoard)
  const [currentGuess, setCurrentGuess] = React.useState<string[]>([])

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
  
  function handleShuffle(event: React.MouseEvent<HTMLButtonElement>) {
    const newBoard = randomize(initialBoard)
    setPuzzleBoard(newBoard)
  }
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
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
    <div className='flex flex-col'>
      <PuzzleHeader id={id} date={date}/>
      <PuzzleBoard puzzleBoard={puzzleBoard} currentGuess={currentGuess} handleClick={handleClick}/>
      <PuzzleButtons handleShuffle={handleShuffle} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default PuzzleWrapper;