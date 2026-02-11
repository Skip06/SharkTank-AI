import {generateObject, generateText} from "ai"
import {groq} from "@ai-sdk/groq"
import {getMarketContext} from '../lib/memory'
import {z} from 'zod'
import type { sharkTankState } from "../graph/state"

const amaanResponseSchema = z.object({
  dialouge: z.string().describe("This is the response from asneer about the pitch"),
  isOut: z.boolean().describe("This is true if asneer is not interested in the pitch"),
  isInvest: z.boolean().describe("This is true if asneer is interested in the pitch"),
    roast:z.string().describe('This is the data which asneer uses to roast the pitch')
})

export const amaanNode = async (state: typeof sharkTankState.State) =>{
  const dataContext = await getMarketContext(state.pitch)

  //vercel ai sdk to generate responsse from llm
  const result = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt: `You are Amaan Gupta from Shark Tank India -Pitch: ${state.pitch},Market Context: ${dataContext}

    Analyze this pitch and respond in Amaan's characteristic style. Be honest about whether you're interested or not.`,
  })

  return {
    amaanResponse: result.text
  }
}