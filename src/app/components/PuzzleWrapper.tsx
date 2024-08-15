'use client'
import React from 'react'
import AnswerBoard from './AnswerBoard'
import PuzzleBoard from './PuzzleBoard';
import PuzzleButtons from './PuzzleButtons'
import Modal from './Modal';
import PuzzleHeader from './PuzzleHeader';
import LivesRemaining from './LivesRemaining';
import NotificationShelf from './NotificationShelf';

import { useNotificationContext } from '../context/notificationContext';

import {randomize} from '../utils/utils'
import { AnimatePresence } from 'framer-motion';
import isEqual from 'lodash/isEqual';

function PuzzleWrapper({ id, date, initialBoard, answerKey }: { id: string, date: string, initialBoard: string[], answerKey: { level: number, title: string, answers: string[]}[]}) {
  const storageKeyPrefix = `puzzle-${id}`
  // const [lives, setLives] = React.useState(4)
  const [lives, setLives] = React.useState<number>(() => {
    const savedLives = localStorage.getItem(`${storageKeyPrefix}-lives`) || undefined
    return savedLives ? JSON.parse(savedLives) : 4
  })
  
  React.useEffect(() => {
    localStorage.setItem(`${storageKeyPrefix}-lives`, JSON.stringify(lives));
  }, [lives, storageKeyPrefix]);
  
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [puzzleBoard, setPuzzleBoard] = React.useState(initialBoard)
  const [currentGuess, setCurrentGuess] = React.useState<string[]>([])
  const [guessHistory, setGuessHistory] = React.useState<string[][]>([])
  const [correctAnswers, setCorrectAnswers] = React.useState<{level: number, title: string, answers: string[]}[]>([])
  const [results, setResults] = React.useState<number[][]>([])
  const [remainingAnswers, setRemainingAnswers] = React.useState(answerKey)
    
  const { notifications, handleSettingNotifications } = useNotificationContext()
  
  React.useEffect(() => {
    async function runAnswerRevealAnimation() {
      setCurrentGuess([])
      
      for (const [index, category] of remainingAnswers.entries()) {
        
        setPuzzleBoard(prevPuzzleBoard => {
          const nextPuzzleBoard = prevPuzzleBoard.filter((word) => !category.answers.includes(word))
    
          return nextPuzzleBoard
        })
                
        setCorrectAnswers( prevCorrectAns => {
          const nextCorrectAns = [
            ...prevCorrectAns, 
            {
              ...category
            }
          ]
          
          return nextCorrectAns
        })
         
         await new Promise(resolve => setTimeout(resolve, 2 * 1000)); 
      }      
    }
    
    if (lives === 0 && correctAnswers.length < 4) {
      runAnswerRevealAnimation()
    }
    
  }, [lives])
  
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
    
    function checkAnswer(currentGuess: string[], answerKey: { level: number, title: string, answers: string[]}[]) {
      let maxCorrect = 0;
      let tempArray: { word: string, index: number }[] = []
      
      for (const [index, category] of answerKey.entries()) {
        
        if (currentGuess.toString() === category.answers.toString()) {
          let correctTitle = category.title
                  
          setCorrectAnswers((previousCorrect) => (
            [
              ...previousCorrect, 
              {
                ...category
              }
            ]
          ))
          
          setRemainingAnswers(prevRemaining => {  
            const nextRemaining = prevRemaining.filter(remainingAnswer => correctTitle != remainingAnswer.title)
          
            return nextRemaining
          })
          
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
    
    if (!guessHistory.some(guess => isEqual(guess, currentGuess))) {
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
    <>
      <AnimatePresence>  
        {isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} puzzleId={id} results={results} />}
      </AnimatePresence>
      <div className='relative flex flex-col items-center gap-6'>
        {notifications.length > 0 && <NotificationShelf notifications={notifications}/>}
        <div className='relative w-full px-4 max-w-[650px] space-y-2'>
          <PuzzleHeader id={id} date={date} />
          {(correctAnswers.length > 0 || lives === 0) && <AnswerBoard correctAnswers={correctAnswers} />}
          <PuzzleBoard puzzleBoard={puzzleBoard} currentGuess={currentGuess} handleClick={handleClick} />
        </div>
        <LivesRemaining lives={lives} />
        <PuzzleButtons setIsModalOpen={setIsModalOpen} lives={lives} correctAnswers={correctAnswers} currentGuess={currentGuess} handleDeselectAll={handleDeselectAll} handleShuffle={handleShuffle} handleSubmit={handleSubmit}/>
      </div>
    </>
  )
}

export default PuzzleWrapper;