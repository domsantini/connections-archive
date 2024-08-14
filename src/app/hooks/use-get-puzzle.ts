import { getTodaysPuzzle, getPuzzleById } from '../utils/puzzle';
import { formatDate } from '../utils/utils'
 
interface Card {
	content: string,
	position: number,
}

async function fetchPuzzleData(puzzleId?: string) {
	let puzzleData;
	
	if (!puzzleId) {	
		const result = await getTodaysPuzzle()
		puzzleData = result.puzzleData 
	} else {
		const result = await getPuzzleById(puzzleId)
		puzzleData = result.puzzleData 
	}
	
	if (!puzzleData) throw new Error('Failed to fetch puzzle data')
		
	return { puzzleData };
}

async function useGetPuzzle(puzzleId?: string) {
	
	const { puzzleData } = await fetchPuzzleData(puzzleId)
	
	const initialTempBoard: { content: string, position: number }[] = [];
	const answerKey: { level:number, title: string, answers: string[] }[] = [];
	const { print_date, categories } = puzzleData;
	
	const date: string = formatDate(print_date)
	
	categories.forEach(({ title, cards }: { title: string, cards: Card[] }, index: number) => {
		const answers: string[] = [];
		
		cards.forEach(({ content, position }: { content: string, position: number }, index: number)=> {
			initialTempBoard.push({ content, position })
			answers.push(content)		
		})
		
		answerKey.push({ level: index, title, answers })
	})
	
	initialTempBoard.sort((a, b) => a.position - b.position)
	const initialBoard = initialTempBoard.map(({ content }) => content)
	
	return { date, initialBoard, answerKey }
}

export default useGetPuzzle;