'use client'
import React from 'react'
import PuzzleList from '../components/PuzzleList';
import useGetPuzzleId from "@/app/hooks/use-get-puzzle-id";

function ArchivePage() {
	
	const [page, setPage] = React.useState<number>(1)
	
	const puzzleId = useGetPuzzleId();
	const itemsPerPage = 10
	
	const [puzzleArray, setPuzzleArray] = React.useState(Array.from({length: Number(puzzleId)}, (_, index) => index + 1))
	
	const firstIndex = ((page - 1) * itemsPerPage)
	const lastIndex = firstIndex + itemsPerPage
	
	const lastPage = Math.round(Number(puzzleId) / itemsPerPage)
  
	return (
		<div className='flex flex-col flex-1 items-center py-4 overflow-hidden'>
			<header 
        className='grid grid-cols-2 col-span-full justify-between items-center w-full text-base sm:text-lg font-medium  max-w-[650px] pb-2'
      >
        <span className='grid col-span-1 pl-4'>Puzzle</span>
        <span className='grid col-span-1 pl-4'>Date</span>
      </header>  
			<PuzzleList puzzleArray={puzzleArray} firstIndex={firstIndex} lastIndex={lastIndex} />
			{/* <div className='flex justify-center items-center gap-4 py-2'> */}
			<div className='grid grid-cols-3 w-full max-w-[650px] py-4'>
				<button className={page - 1 === 0 ? 'invisible' : ''} onClick={() => setPage(prevPage => prevPage - 1)}>Previous</button>
				<p className='grid place-content-center'>Page {page} of {lastPage}</p>
				<button className={page + 1 > lastPage ? 'invisible' : ''} onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
			</div>
		</div>
	)
}

export default ArchivePage;