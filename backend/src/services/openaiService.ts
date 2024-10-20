import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getEmbedding = async (text: string): Promise<number[]> => {
  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text,
    });
    return response.data.data[0].embedding;
  } catch (error) {
    console.error('Error getting embedding:', error);
    throw error;
  }
};

export const getChatCompletion = async (messages: any[]): Promise<string> => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });
    return response.data.choices[0].message?.content || '';
  } catch (error) {
    console.error('Error getting chat completion:', error);
    throw error;
  }
};