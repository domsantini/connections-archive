import { ChevronLeft, ChevronRight } from "react-feather";
import Link from "next/link";

import useGetPuzzleId from "../hooks/use-get-puzzle-id";

function PuzzleHeader({ id, date}: { id: string, date: string}) {
  
  const maxPuzzle = useGetPuzzleId()
  
  return (
    <div className='flex flex-col justify-center items-center w-full py-5 '>
      <div className='flex justify-between items-center w-full'>
        <PrevPuzzle className={Number(id) - 1 === 0 ? ' invisible' : ''} id={id}/> 
        <h1 className="text-xl font-semibold">Connection #{id}</h1>
        <NextPuzzle className={Number(id) + 1 > Number(maxPuzzle) ? ' invisible' : ''}id={id}/>
      </div>
      <h3>{date}</h3>
    </div>
  )
}

function PrevPuzzle({ className, id }: { className:string, id: string}) {
  const nextPuzzle = Number(id) - 1
  
  return (
    <Link className={`${className} cursor-pointer`} href={`/puzzles/${nextPuzzle}`} ><ChevronLeft /></Link>
  )
}
function NextPuzzle({ className, id }: { className:string, id: string}) {
  const nextPuzzle = Number(id) + 1
  
  return (
    <Link className={`${className} cursor-pointer`} href={`/puzzles/${nextPuzzle}`}><ChevronRight /></Link>
  )
}

export default PuzzleHeader;