function PuzzleHeader({ id, date}: { id: string, date: string}) {
  
  return (
    <div className='flex flex-col justify-center items-center w-full py-5 '>
      <h1 className="text-xl font-semibold">Connection #{id}</h1>
      <h3>{date}</h3>
    </div>
  )
}

export default PuzzleHeader;