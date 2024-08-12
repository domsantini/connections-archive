function useGetPuzzleId() {
  // Using 5 for June because dates are 0 indexed
  const firstDate = new Date(2023, 5, 12)
  firstDate.setHours(0,0,0,0)
  const currentDate = new Date()
  currentDate.setHours(0,0,0,0)
  
  const timeDiff = currentDate.getTime() - firstDate.getTime()
  const ONE_DAY = 1000 * 60 * 60 * 24
  const daysDiffNoRound = timeDiff / ONE_DAY
  const daysDiff = Math.floor(timeDiff / ONE_DAY)
  
  const puzzleId = (daysDiff + 1).toString()
    
  console.log({ firstDate, currentDate, timeDiff, daysDiffNoRound, daysDiff, puzzleId })
  
  return puzzleId
}

export default useGetPuzzleId;