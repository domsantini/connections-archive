'use client'
import React from 'react'
import useWindowSize from '../hooks/use-window-size'
import { motion, MotionProps } from 'framer-motion'

type PuzzleBoardProps = {
  puzzleBoard: string[],
  currentGuess: string[],
  handleClick: Function,
} 

type PuzzleItemProps = {
  content: string,
  puzzleBoard: string[],
  currentGuess: string[],
  handleClick: Function,
} & MotionProps

export default function PuzzleBoard({ puzzleBoard, currentGuess, handleClick }: PuzzleBoardProps) {
    
  return (  
      <div className='relative grid grid-cols-4 place-items-center gap-2'>
  
        {puzzleBoard.map((content: string, index: number) => {
          return (
            <PuzzleBoardItem 
              key={content} 
              content={content} 
              handleClick={handleClick} 
              currentGuess={currentGuess} 
              puzzleBoard={puzzleBoard}
            />
          )
        })}        
      </div>
  )
}

function PuzzleBoardItem({ content, handleClick, currentGuess, puzzleBoard, ...motionProps }: PuzzleItemProps) {

  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const wordRef = React.useRef<HTMLParagraphElement>(null)
  const { width, height } = useWindowSize()
  
  
  function resizeFont() {
    if (buttonRef.current && wordRef.current) {
      const button = buttonRef.current
      const word = wordRef.current
      let fontSize = 1
      wordRef.current.style.fontSize = `${fontSize}rem`        
              
      while (word.scrollWidth > button.clientWidth && fontSize > 0) {
        fontSize -= 0.1
        word.style.fontSize = `${fontSize}rem`
      }        
    }
  }
  
  React.useEffect(() => {
    resizeFont()
  }, [puzzleBoard])
  
  React.useEffect(() => {
    resizeFont()
  }, [width, height])
  
  return (
    <motion.button
      ref={buttonRef}
      key={content}
      className={
        `flex justify-center items-center h-16 w-full rounded-lg transition-colors
        ${currentGuess.length === 4 ? 'cursor-default' : 'active:bg-neutral-500 active:text-white active:scale-95 cursor-pointer'} 
        ${currentGuess.includes(content) ? 'bg-neutral-500 hover:cursor-pointer active:bg-neutral-500 text-white' : 'bg-neutral-200'
        }`
      } 
      onClick={(event) => handleClick(event)}
      layout
      whileTap={{ scale: 0.9 }}
    >
      <p 
        ref={wordRef}
        className='font-medium p-1'
      >
        {content}
      </p> 
    </motion.button>
  )
}

