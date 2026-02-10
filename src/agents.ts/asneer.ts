import {generateText} from "ai"
import {groq} from "@ai-sdk/groq"

import {z} from 'zod'
import type { sharkTankState } from "../graph/state"

const asneerResponseSchema = z.object({
    dialouge: z.string().describe("This is the response from asneer about the pitch"),
    isOut: z.boolean().describe("This is true if asneer is not interested in the pitch"),
    isInvest: z.boolean().describe("This is true if asneer is interested in the pitch"),
    roast:z.string().describe('This is the data which asneer uses to roast the pitch')
})
 
const asneerNode = (state: typeof sharkTankState.State) =>{
  
}
