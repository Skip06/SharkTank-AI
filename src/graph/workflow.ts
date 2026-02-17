import {MemorySaver, StateGraph} from '@langchain/langgraph'
import {asneerNode} from '../agents.ts/asneer'
import {amaanNode} from '../agents.ts/amaan'
import {sharkTankState} from './state'

//In LangGraph, a MemorySaver keeps the state of the graph in memory
const memorySaver = new MemorySaver()

const workFlow = new StateGraph(sharkTankState)
  .addNode('asneer', asneerNode)
  .addNode('amaan', amaanNode)
  .addEdge('__start__', 'asneer')
  .addEdge('asneer','amaan')
  .addEdge('amaan','__end__')

export const sharkTank = workFlow.compile({ checkpointer: memorySaver })

