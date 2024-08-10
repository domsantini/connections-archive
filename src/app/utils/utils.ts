export function randomize(array: any[]) {
	
	let newArray = array
	const start = 0;
	const end = array.length - 1
	
	for (let i = end; i >= start; i--) {
		// Store random number as temporary index
		let tempIndex = Math.floor(Math.random() * (i + 1))
		// Save the current number in a temp variable to swap later
		let temp = newArray[i]
		// Swap the number at the current index with the number at the random index
		newArray[i] = newArray[tempIndex]
		// Put the number at original index at the random index
		newArray[tempIndex] = temp
	}
	
	return newArray
}

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export function formatDate(date: string): string {
	const dateArr = date.split('-')
	const year = dateArr[0]
	const month = MONTHS[Number(dateArr[1]) - 1]
	const day = Number(dateArr[2]).toString()

	const formattedDate = `${month} ${day}, ${year}`
	
	return formattedDate
}

export const range = (start: number, end?: number, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
