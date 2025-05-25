import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const filePath = join(process.cwd(), 'public/data/workTimeline.json')
    const data = readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Work timeline data not found'
    })
  }
})
