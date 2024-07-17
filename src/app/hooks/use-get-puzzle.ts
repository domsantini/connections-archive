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

function useGetPuzzle(puzzle: PuzzleData): { id: number, date: string, initialBoard: string[], answerKey: { title: string, answers: string[] }[] } {
	const initialTempBoard: { content: string, position: number }[] = [];
	const answerKey: { title: string, answers: string[] }[] = [];
	const { id, print_date, categories } = puzzle;
	
	const date: string = formatDate(print_date)
	
	categories.forEach(({ title, cards }) => {
		const answers: string[] = [];
		
		cards.forEach(({ content, position }, index)=> {
			initialTempBoard.push({ content, position })
			answers.push(content)		
		})
		
		answerKey.push({ title, answers })
	})
	
	initialTempBoard.sort((a, b) => a.position - b.position)
	const initialBoard = initialTempBoard.map(({ content }) => content)
	
	return { id, date, initialBoard, answerKey }
}

export default useGetPuzzle;