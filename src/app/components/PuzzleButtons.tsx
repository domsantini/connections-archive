function PuzzleButtons({ handleDeselectAll, handleShuffle, handleSubmit }: {handleDeselectAll: Function, handleShuffle: Function, handleSubmit: Function}) {
  
  return (
    <div className="flex gap-4">
      <button className='px-4 py-2 border-2 border-solid border-neutral-300 rounded-full' onClick={() => handleDeselectAll()}>Deselect All</button>
      <button className='px-4 py-2 border-2 border-solid border-neutral-300 rounded-full' onClick={() => handleShuffle()}>Shuffle</button>
      <button className='px-4 py-2 border-2 border-solid border-neutral-300 rounded-full' onClick={(event) => handleSubmit(event)}>Submit</button>
    </div>
  )
}

export default PuzzleButtons;