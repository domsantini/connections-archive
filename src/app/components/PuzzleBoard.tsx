function PuzzleBoard({ puzzleBoard, currentGuess, handleClick }: { puzzleBoard: string[], currentGuess: string[], handleClick: Function }) {
    
  return (  
      <div className='relative grid grid-cols-4 place-items-center gap-2 border-2 border-solid border-blue-300'>
        {puzzleBoard.map((content: string, index: number) => (
          <button 
            key={`${content}-${index}`}
            className={
              `h-14 w-full border-2 border-solid border-neutral-300 rounded-lg 
              ${currentGuess.length === 4 ? 'cursor-default' : 'hover:bg-neutral-400 active:bg-neutral-500 cursor-pointer'} 
              ${currentGuess.includes(content) ? 'bg-neutral-500 hover:cursor-pointer active:bg-neutral-500' : 'bg-neutral-200'}`
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