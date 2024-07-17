import React from 'react'

function PuzzleBoard({ puzzleBoard, currentGuess, handleClick }: { puzzleBoard: string[], currentGuess: string[], handleClick: Function }) {
    
  return (
    <div className='grid grid-cols-4 grid-rows-4 place-items-center gap-1 border-2 border-solid border-blue-300'>
      {puzzleBoard.map((content: string, index: number) => (
        <button 
          key={`${content}-${index}`}
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
  )
}

export default PuzzleBoard;