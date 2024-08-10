import PuzzleWrapper from "@/app/components/PuzzleWrapper";
import useGetPuzzleId from "@/app/hooks/use-get-puzzle-id";
import useGetPuzzle from "@/app/hooks/use-get-puzzle";

async function Home() {

  const puzzleId = useGetPuzzleId();
  const { date, initialBoard, answerKey } = await useGetPuzzle(puzzleId);
      
  return (
    <>
      <main className="flex flex-col grow h-full">
        <PuzzleWrapper id={puzzleId} date={date} initialBoard={initialBoard} answerKey={answerKey}/>
      </main>
    </>
  );
}

export default Home;