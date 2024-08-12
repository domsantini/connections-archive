"use client";
import React from "react";

function PuzzleButtons({
  setIsModalOpen,
  lives,
  correctAnswers,
  currentGuess,
  handleDeselectAll,
  handleShuffle,
  handleSubmit,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lives: number;
  correctAnswers: { level: number; title: string; answers: string[] }[];
  currentGuess: string[];
  handleDeselectAll: Function;
  handleShuffle: Function;
  handleSubmit: Function;
}) {
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    if (lives === 0 || correctAnswers.length === 4) {
      setGameOver(true);
    }
  }, [lives, correctAnswers]);

  return (
    <div className="flex gap-2">
      {gameOver ? (
        <button
          className="px-4 py-2 border border-solid border-obsidian rounded-full "
          onClick={() => setIsModalOpen(true)}
        >
          See Results
        </button>
      ) : (
        <>
          <button
            disabled={currentGuess.length === 0}
            className="px-4 py-2 border border-solid border-obsidian rounded-full disabled:border-neutral-300 disabled:text-neutral-300 transition-all"
            onClick={() => handleDeselectAll()}
          >
            Deselect All
          </button>
          <button
            className="px-4 py-2 border border-solid border-obsidian rounded-full"
            onClick={() => handleShuffle()}
          >
            Shuffle
          </button>
          <button
            disabled={currentGuess.length < 4}
            className="px-4 py-2 border border-solid border-obsidian bg-obsidian rounded-full text-white disabled:border-neutral-300 disabled:text-neutral-300 disabled:bg-transparent"
            onClick={(event) => handleSubmit(event)}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default PuzzleButtons;
