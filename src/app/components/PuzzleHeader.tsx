function PuzzleHeader({ id, date}: { id: number, date: string}) {
  
  return (
    <div className='w-full px-4 py-8'>
      <h1>Connection #{id}</h1>
      <h3>{date}</h3>
    </div>
  )
}

export default PuzzleHeader;