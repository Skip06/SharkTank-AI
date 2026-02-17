import 'dotenv/config'
import express from 'express'
import { HumanMessage } from '@langchain/core/messages'
import { sharkTank } from './graph/workflow'
const app = express()
app.use(express.json())

app.post('/pitch', async (req, res) => {
  const { pitch, sessionId, response } = req.body
  const inputMsg = response || pitch
  const config = { configurable: { sessionId: sessionId || "default-room" } };
  try {
    const state = await sharkTank.invoke({ // we are invoking the graph w initial state
      messages: [new HumanMessage(inputMsg)],
    }, config)

    res.json({
      asneer: state.asneerResponse,
      amaan: state.amaanResponse,
      status: state.sharksOut.length > 0 ? "Some sharks left!" : "Negotiations continue..."
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});





app.listen(process.env.PORT, () => {
  console.log('SharkTank live on localhost')
})