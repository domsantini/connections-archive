function PuzzleHeader({ id, date}: { id: number, date: string}) {
  
  return (
    <div className='w-full px-4 py-5'>
      <h1 className="text-2xl font-semibold">Connection #{id}</h1>
      <h3>{date}</h3>
    </div>
  )
}

export default PuzzleHeader;