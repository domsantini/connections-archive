'use client'
import React from 'react'
export const dynamic = 'force-dynamic'
import Loader from '@/app/components/Loader'
import PuzzleWrapper from "@/app/components/PuzzleWrapper";

import useGetTodaysPuzzle from './hooks/use-get-todays-puzzle';
import useGetPuzzleId from "@/app/hooks/use-get-puzzle-id";

import moment from 'moment';

type PuzzleDataType = {
  date: string,
  initialBoard: string[],
  answerKey: {
    level: number;
    title: string;
    answers: string[];
  }[]
}

function Home() {
  const [puzzleData, setPuzzleData] = React.useState<PuzzleDataType | null>(null)
  
  React.useEffect(() => {
    const clientDate = moment().format('YYYY-MM-DD')
    
    async function fetchData(clientDate: string) {
      try {
        const data = await useGetTodaysPuzzle(clientDate)
        setPuzzleData(data)
      } catch( error ) {
        console.error('Error fetching puzzle data:', error)
      }
    }
    
    fetchData(clientDate)
    
  }, [])
  
  const puzzleId = useGetPuzzleId();

  
  return (
    <>
      <main className="flex flex-col grow h-full">
        {!puzzleData ? <Loader /> : <PuzzleWrapper id={puzzleId} date={puzzleData.date} initialBoard={puzzleData.initialBoard} answerKey={puzzleData.answerKey}/>}
      </main>
    </>
  );
}

export default Home;