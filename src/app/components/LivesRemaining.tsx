import { range } from "@/app/utils/utils";
import { motion, AnimatePresence } from "framer-motion";

const EMOJIS = {
  1: "🫣",
  2: "😐",
  3: "🙂",
  4: "🤩",
} as const;

function LivesRemaining({ lives }: { lives: number }) {
  const emoji = EMOJIS[lives as keyof typeof EMOJIS];

  return (
    <div className="w-full flex justify-center gap-4 items-center">
      <AnimatePresence>
        {range(lives).map((num) => (
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            layout
            key={num}
            className="flex justify-center items-center bg-slate-400 rounded-full h-3 w-3 text-xl"
          >
            {num + 1 === lives ? emoji : ""}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default LivesRemaining;
