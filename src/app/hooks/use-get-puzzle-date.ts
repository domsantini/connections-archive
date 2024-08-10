function useGetPuzzleDate(puzzleNum: number) {
  const MONTHS = {
    'Jan' : 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sep': 'September',
    'Oct': 'October',
    'Nov': 'November',
    'Dec': 'December',
  } as const;
  
  
  const firstDate = new Date('06/12/2023')
  
  const rawPuzzleDate = new Date(new Date('06/12/2023').setDate(firstDate.getDate() + (puzzleNum - 1))).toDateString()
  
  function formatPuzzleDate(rawPuzzleDate: string) {
    const cleanPuzzleDate = rawPuzzleDate.slice(4,).replaceAll(' ', ',').split(',')
    const month = MONTHS[cleanPuzzleDate[0] as keyof typeof MONTHS]
    const day = cleanPuzzleDate[1]
    const year = cleanPuzzleDate[2]
    
    return `${month} ${day}, ${year}`
  }
  
  return formatPuzzleDate(rawPuzzleDate)
}

export default useGetPuzzleDate;