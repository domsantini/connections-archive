import { getPuzzle } from '../utils/puzzle';
import { formatDate } from '../utils/utils'
 
interface Card {
	content: string,
	position: number,
}

interface Category {
	title: string,
	cards: Card[]
}

interface PuzzleData {
	id: number,
	print_date: string,
	categories: Category[]
}

async function fetchPuzzleData(puzzleId: string) {
	const { puzzleData } = await getPuzzle(puzzleId)
	if (!puzzleData) throw new Error('Failed to fetch puzzle data')
		
	return { puzzleData };
}

async function useGetPuzzle(puzzleId: string) {
	
	const { puzzleData } = await fetchPuzzleData(puzzleId)
	
	const initialTempBoard: { content: string, position: number }[] = [];
	const answerKey: { title: string, answers: string[] }[] = [];
	const { print_date, categories } = puzzleData;
	
	
	const date: string = formatDate(print_date)
	
	categories.forEach(({ title, cards }: { title: string, cards: Card[] }) => {
		const answers: string[] = [];
		
		cards.forEach(({ content, position }: { content: string, position: number }, index: number)=> {
			initialTempBoard.push({ content, position })
			answers.push(content)		
		})
		
		answerKey.push({ title, answers })
	})
	
	initialTempBoard.sort((a, b) => a.position - b.position)
	const initialBoard = initialTempBoard.map(({ content }) => content)
	
	return { date, initialBoard, answerKey }
}

export default useGetPuzzle;