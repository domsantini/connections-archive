import { getTodaysPuzzle } from '@/app/utils/puzzle'
import { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
  const clientDate = req.nextUrl.searchParams.get('date')
  console.log({ clientDate })
  const puzzleData = await getTodaysPuzzle(clientDate)
  
  return Response.json(puzzleData)
}