function useGetPuzzleId() {
  
  const firstDate = Number(new Date('06/12/2023'))
  
  const currentMonth = new Date().getMonth() + 1
  const currentDay = new Date().getDate()
  const currentYear = new Date().getFullYear()
  
  const currentDate = Number(new Date(`${currentMonth}/${currentDay}/${currentYear}`))
  
  const puzzleId = Math.round((currentDate - firstDate) / (1000 * 60 * 60 * 24) + 1).toString()
  
  return puzzleId
}

export default useGetPuzzleId;