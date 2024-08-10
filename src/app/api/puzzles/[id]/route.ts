import { getPuzzle } from '../../../utils/puzzle'
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: Request, {params}: {params: { id: string }}) {
    
  const puzzleId = params.id
  const puzzleData = await getPuzzle(puzzleId)
  
  return Response.json({ puzzleData })
}