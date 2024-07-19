'use client'
import React from 'react'
import AnswerBoard from './AnswerBoard'
import PuzzleBoard from './PuzzleBoard';
import PuzzleButtons from './PuzzleButtons'
import useGetPuzzle from '../hooks/use-get-puzzle';
import { puzzleEx } from '../data'
import {randomize} from '../utils/utils'
import PuzzleHeader from './PuzzleHeader';

function PuzzleWrapper() {
  const { id, date, initialBoard, answerKey } = useGetPuzzle(puzzleEx);
  const [puzzleBoard, setPuzzleBoard] = React.useState(initialBoard)
  const [currentGuess, setCurrentGuess] = React.useState<string[]>([])
  const [correctAnswers, setCorrectAnswers] = React.useState<{title: string, answers: string[]}[]>([])

  console.log(correctAnswers)
  
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
  
  function handleShuffle() {
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
          setCorrectAnswers((previousCorrect) => (
            [
              ...previousCorrect, 
              category
            ]
          ))
          
          setCurrentGuess([])
          
          const nextPuzzleBoard = puzzleBoard.filter((word) => !category.answers.includes(word))
          setPuzzleBoard(nextPuzzleBoard)
          
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
    <div className='flex flex-col items-center gap-5'>
      <PuzzleHeader id={id} date={date} />
      <div className='relative w-full max-w-[650px]'>
        <AnswerBoard correctAnswers={correctAnswers}/>
        <PuzzleBoard puzzleBoard={puzzleBoard} currentGuess={currentGuess} handleClick={handleClick}/>
      </div>
      <PuzzleButtons handleShuffle={handleShuffle} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default PuzzleWrapper;