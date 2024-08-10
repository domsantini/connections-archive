import useGetPuzzleDate from '../hooks/use-get-puzzle-date';
import Link from 'next/link';

interface PuzzleListProps {
  puzzleArray: number[];
  firstIndex: number;
  lastIndex: number;
}

function PuzzleList({
  puzzleArray,
  firstIndex,
  lastIndex
}: PuzzleListProps ) {
  
  return (
    <div className='grid grid-cols-2 max-w-[650px] px-4 w-full divide-y divide-black overflow-scroll'>
      <header 
        className='grid grid-cols-2 col-span-full justify-between items-center w-full py-4 sm:text-lg font-medium'
      >
        <span className='grid col-span-1 pl-4'>Puzzle</span>
        <span className='grid col-span-1 pl-4'>Date</span>
      </header>  
      {puzzleArray.slice(firstIndex, lastIndex).map((puzzleNum) => (
				<PuzzleListItem key={puzzleNum} puzzleNum={puzzleNum} />
			))}
    </div>
  )
}

function PuzzleListItem({ puzzleNum }: { puzzleNum: number }) {
  
  const puzzleDate = useGetPuzzleDate(puzzleNum).toString()
  
  return (
    <Link 
      key={`puzzle-${puzzleNum}`} 
      href={`/puzzles/${puzzleNum}`} 
      className='grid grid-cols-2 col-span-full justify-between items-center w-full py-4  hover:bg-neutral-300 hover:pl-3 transition-all duration-500'
    >
      <span className='grid col-span-1 pl-1'>Connections #{puzzleNum}</span>
      <span className='grid col-span-1'>{puzzleDate}</span>
    </Link>
  )
}

export default PuzzleList;