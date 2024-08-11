function PuzzleButtons({
  currentGuess,
  handleDeselectAll,
  handleShuffle,
  handleSubmit,
}: {
  currentGuess: string[];
  handleDeselectAll: Function;
  handleShuffle: Function;
  handleSubmit: Function;
}) {
  return (
    <div className="flex gap-2">
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
    </div>
  );
}

export default PuzzleButtons;
