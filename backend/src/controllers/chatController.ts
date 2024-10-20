import { Request, Response } from 'express';
import { getEmbedding, getChatCompletion } from '../services/openaiService';
import { queryVector } from '../services/pineconeService';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    // Get embedding for the user's message
    const messageEmbedding = await getEmbedding(message);

    // Query Pinecone for similar resources
    const similarResources = await queryVector(messageEmbedding, 3);

    // Prepare context from similar resources
    const context = similarResources.map(resource => resource.metadata.title + ': ' + resource.metadata.content).join('\n\n');

    // Prepare messages for chat completion
    const messages = [
      { role: 'system', content: 'You are an AI assistant specializing in CRO and retention strategies for mobile apps. Use the provided context to answer user queries.' },
      { role: 'user', content: `Context:\n${context}\n\nUser question: ${message}` }
    ];

    // Get chat completion
    const response = await getChatCompletion(messages);

    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ message: 'Error processing message', error });
  }
};