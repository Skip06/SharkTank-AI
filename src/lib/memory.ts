import Supermemory from 'supermemory'
import 'dotenv/config'

//just using the supermemory docs dahh

const client = new Supermemory({apiKey: process.env.SUPERMEMORY_API})

async function getMarketContext(pitch: string) {
  const response = await client.search.memories({ q: pitch })
  return response.results.map(r => r.memory || r.chunk || '').join("\n")
}