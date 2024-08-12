'use client'
import React from 'react'
import AnswerBoard from './AnswerBoard'
import PuzzleBoard from './PuzzleBoard';
import PuzzleButtons from './PuzzleButtons'
import Modal from './Modal';

import {randomize} from '../utils/utils'
import PuzzleHeader from './PuzzleHeader';
import LivesRemaining from './LivesRemaining';
import NotificationShelf from './NotificationShelf';
import { useNotificationContext } from '../context/notificationContext';

import { AnimatePresence } from 'framer-motion';

function PuzzleWrapper({ id, date, initialBoard, answerKey }: { id: string, date: string, initialBoard: string[], answerKey: { title: string, answers: string[]}[]}) {
  const [lives, setLives] = React.useState(4)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [puzzleBoard, setPuzzleBoard] = React.useState(initialBoard)
  const [currentGuess, setCurrentGuess] = React.useState<string[]>([])
  const [guessHistory, setGuessHistory] = React.useState<string[][]>([])
  const [correctAnswers, setCorrectAnswers] = React.useState<{level: number, title: string, answers: string[]}[]>([])
  const [results, setResults] = React.useState<number[][]>([])
  
  const { notifications, handleSettingNotifications } = useNotificationContext()
    
  React.useEffect(() => {  
    if (lives === 0 || correctAnswers.length === 4) {
      setIsModalOpen(true)
    }
  }, [lives, correctAnswers])
  
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const content = event.currentTarget.innerText.trim();
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
  
  function handleDeselectAll() {
    setCurrentGuess([])
  }
  
  function handleShuffle() {
    const newBoard = randomize(puzzleBoard)
    setPuzzleBoard([...newBoard])
  }
  
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    
    function checkAnswer(currentGuess: string[], answerKey: { title: string, answers: string[]}[]) {
      let maxCorrect = 0;
      let tempArray: { word: string, index: number }[] = []
      
      for (const [index, category] of answerKey.entries()) {
        if (currentGuess.toString() === category.answers.toString()) {
          setCorrectAnswers((previousCorrect) => (
            [
              ...previousCorrect, 
              {
                level: index,
                ...category
              }
            ]
          ))
          
          setResults(prevResults => {
            const nextResult = [
              ...prevResults,
              [ index, index, index, index ]
            ]
            
            return nextResult
          })
          
          setCurrentGuess([])
          
          const nextPuzzleBoard = puzzleBoard.filter((word) => !category.answers.includes(word))
          setPuzzleBoard(nextPuzzleBoard)
          
          return
        } else {
          let currCorrect = 0;
          
          for (const word of currentGuess) {
            if (category.answers.includes(word)) {
              tempArray.push({
                word,
                index
              })
              currCorrect++
            } else {
              continue
            } 
            maxCorrect = Math.max(currCorrect, maxCorrect)
          }  
        }
        
        tempArray.sort((a, b) => a.word.localeCompare(b.word))
        
      }
      
      setResults(prevResults => {
        const resultsArray: number[] = []
        tempArray.forEach(({ index }) => resultsArray.push(index))
        
        const nextResults = [
          ...prevResults,
          resultsArray
        ]
        
        return nextResults
      })
      
      if (handleSettingNotifications(maxCorrect, currentGuess, guessHistory)) {
        return
      }
       
      maxCorrect = 0
      setLives(prevLives => prevLives - 1)
    }
    
    if (!guessHistory.includes(currentGuess)) {
      setGuessHistory(prevGuesses => {
        const nextGuesses = [
          ...prevGuesses, 
          currentGuess
        ]
        
        return nextGuesses
      })
    }
    
    checkAnswer(currentGuess, answerKey)
  }
  
  return (
    <div className='relative flex flex-col items-center gap-6'>
      <AnimatePresence>  
        {isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} puzzleId={id} results={results} />}
      </AnimatePresence>
      {notifications.length > 0 && <NotificationShelf notifications={notifications}/>}
      <div className='relative w-full px-4 max-w-[650px]'>
        <PuzzleHeader id={id} date={date} />
        {correctAnswers.length > 0 && <AnswerBoard correctAnswers={correctAnswers}/>}
        <PuzzleBoard puzzleBoard={puzzleBoard} currentGuess={currentGuess} handleClick={handleClick} />
      </div>
      <LivesRemaining lives={lives} />
      <PuzzleButtons setIsModalOpen={setIsModalOpen} lives={lives} correctAnswers={correctAnswers} currentGuess={currentGuess} handleDeselectAll={handleDeselectAll} handleShuffle={handleShuffle} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default PuzzleWrapper;