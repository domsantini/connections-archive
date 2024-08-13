import { getTodaysPuzzle } from '@/app/utils/puzzle'
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: Request, {params}: {params: { id: string }}) {
    
  const puzzleData = await getTodaysPuzzle()
  
  return Response.json({ puzzleData })
}