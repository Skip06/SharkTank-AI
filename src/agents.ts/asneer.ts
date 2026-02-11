import {generateObject, generateText} from "ai"
import {createGroq} from "@ai-sdk/groq"
import {getMarketContext} from '../lib/memory'
import {z} from 'zod'
import type { sharkTankState } from "../graph/state"

const asneerResponseSchema = z.object({
  dialouge: z.string().describe("This is the response from asneer about the pitch"),
  isOut: z.boolean().describe("This is true if asneer is not interested in the pitch"),
  isInvest: z.boolean().describe("This is true if asneer is interested in the pitch"),
    roast:z.string().describe('This is the data which asneer uses to roast the pitch')
})

export const asneerNode = async (state: typeof sharkTankState.State) =>{
  const dataContext = await getMarketContext(state.pitch)

  //vercel ai sdk to generate responsse from llm
  const groq = createGroq({
    apiKey: process.env.GROQ_API, 
  });
  
  const result = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt: `You are Ashneer Grover from Shark Tank India - known for being brutally honest, direct, and not afraid to roast bad ideas.Pitch: ${state.pitch},Market Context: ${dataContext}

    Analyze this pitch and respond in Ashneer's characteristic style. Be honest about whether you're interested or not, and don't hold back on your opinions.`,
  })

  return {
    asneerResponse: result.text
  }
}
