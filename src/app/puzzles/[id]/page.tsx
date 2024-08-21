import PuzzleWrapper from "@/app/components/PuzzleWrapper";

import useGetPuzzle from '@/app/hooks/use-get-puzzle';

async function PuzzlesPage({ params }: { params: { id: string } }) {
  
  const puzzleId = params.id
  const { date, initialBoard, answerKey } = await useGetPuzzle(puzzleId);

  return (
    <>
      <main className="flex flex-col grow h-full">
        <PuzzleWrapper id={puzzleId} date={date} initialBoard={initialBoard} answerKey={answerKey}/>
      </main>
    </>
  );
}

export default PuzzlesPage;
