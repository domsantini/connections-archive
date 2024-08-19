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
import { useLocalStorage } from 'usehooks-ts';

function PuzzleWrapper({ id, date, initialBoard, answerKey }: { id: string, date: string, initialBoard: string[], answerKey: { level: number, title: string, answers: string[]}[]}) {
  const storageKeyPrefix = `puzzle-${id}`
  
  
  const [lives, setLives] = useLocalStorage(`${storageKeyPrefix}-lives`, 4)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [puzzleBoard, setPuzzleBoard] = useLocalStorage(`${storageKeyPrefix}-puzzleBoard`, initialBoard)
  const [currentGuess, setCurrentGuess] = useLocalStorage<string[]>(`${storageKeyPrefix}-currentGuess`, [])
  const [guessHistory, setGuessHistory] = useLocalStorage<string[][]>(`${storageKeyPrefix}-guessHistory`, [])
  const [correctAnswers, setCorrectAnswers] = useLocalStorage<{level: number, title: string, answers: string[]}[]>(`${storageKeyPrefix}-correctAnswers`, [])
  const [results, setResults] = useLocalStorage<number[][]>(`${storageKeyPrefix}-results`, [])
  const [remainingAnswers, setRemainingAnswers] = useLocalStorage(`${storageKeyPrefix}-remainingAnswers`, answerKey)
    
  const { notifications, handleSettingNotifications } = useNotificationContext()
  
  React.useEffect(() => {
    async function runAnswerRevealAnimation() {
      setCurrentGuess([])
      
      for (const [index, category] of remainingAnswers.entries()) {
        
        setPuzzleBoard(prevPuzzleBoard => {
          const nextPuzzleBoard = prevPuzzleBoard.filter((word) => !category.answers.includes(word))
    
          return nextPuzzleBoard
        })
                
        setCorrectAnswers((prevCorrectAns: {level: number, title: string, answers: string[]}[]) => {
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
      
      if (handleSettingNotifications(maxCorrect, currentGuess, guessHistory)) {
        return
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
        <PuzzleHeader id={id} date={date} />
        <div className='relative w-full px-4 max-w-[650px] space-y-2'>
          {(correctAnswers.length > 0 || lives === 0) && <AnswerBoard correctAnswers={correctAnswers} />}
          {correctAnswers.length !== 4 && <PuzzleBoard puzzleBoard={puzzleBoard} currentGuess={currentGuess} handleClick={handleClick} />}
        </div>
        <LivesRemaining lives={lives} />
        <PuzzleButtons setIsModalOpen={setIsModalOpen} lives={lives} correctAnswers={correctAnswers} currentGuess={currentGuess} handleDeselectAll={handleDeselectAll} handleShuffle={handleShuffle} handleSubmit={handleSubmit}/>
      </div>
    </>
  )
}

export default PuzzleWrapper;