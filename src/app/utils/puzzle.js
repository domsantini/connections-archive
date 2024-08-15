import clientPromise from "./mongo";
import moment from "moment";

let client;
let db;
let puzzles;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db('connections_db');
    puzzles = await db.collection('puzzles');
  } catch (error) {
    throw new Error("Failed to connect to Mongo");
  }
}

(async () => {
  await init();
})()

export async function getPuzzleById(puzzleId) {
  try {
    if (!puzzles) await init();
    const puzzleDataRaw = await puzzles.find({index: puzzleId.toString()}).toArray()
    const puzzleData = puzzleDataRaw[0].content
    return { puzzleData };
  } catch (error) {
    return { error: "Failed to fetch puzzle" };
  }
}

export async function getTodaysPuzzle() {
  const todaysDate = moment().format().slice(0,10)
  console.log({ todaysDate })
  
  try {
    if (!puzzles) await init();
    const puzzleDataRaw = await puzzles.find({"content.print_date": todaysDate}).toArray()
    const puzzleData = puzzleDataRaw[0].content
    return { puzzleData };
  } catch (error) {
    return { error: "Failed to fetch puzzle" };
  }
}


