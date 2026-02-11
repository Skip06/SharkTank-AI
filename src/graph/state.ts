

import {BaseMessage} from "@langchain/core/messages";
import {Annotation, StateGraph, messagesStateReducer} from "@langchain/langgraph";

export const sharkTankState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({    //messages is array of chat-historis
    reducer: messagesStateReducer,           //reducer help to append whatever a node returns 
    default: () => [],                      //initial val of state
  }),
  pitch: Annotation<string>(),
  asneerResponse: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  amaanResponse: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  sharksOut: Annotation<string[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
});


