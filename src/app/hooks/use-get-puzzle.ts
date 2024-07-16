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
	print_date: String,
	categories: Category[]
}

function useGetPuzzle(puzzle: PuzzleData): { initialBoard: { content: string, position: number }[], answerKey: { title: string, answers: string[] }[] } {
    const initialBoard: { content: string, position: number }[] = [];
    const answerKey: { title: string, answers: string[] }[] = [];
    const { categories } = puzzle;
    
    categories.forEach(({ title, cards }) => {
			const answers: string[] = [];
			
			cards.forEach(({ content, position }, index)=> {
				initialBoard.push({ content, position })
				answers.push(content)		
			})
			
			answerKey.push({ title, answers })
		})
    
		initialBoard.sort((a, b) => a.position - b.position)
    
	return { initialBoard, answerKey }
}

export default useGetPuzzle;