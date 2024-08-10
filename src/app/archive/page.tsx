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
		<div className='flex flex-col flex-1 justify-center items-center gap-4 overflow-scroll'>
			
			<PuzzleList puzzleArray={puzzleArray} firstIndex={firstIndex} lastIndex={lastIndex} />

			<div className='flex justify-center items-center gap-4'>
				<button onClick={() => setPage(prevPage => prevPage - 1)}>Previous</button>
				<p>Page {page} of {lastPage}</p>
				<button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
			</div>
		</div>
	)
}

export default ArchivePage;