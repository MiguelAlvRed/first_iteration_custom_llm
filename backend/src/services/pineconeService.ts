import { PineconeClient } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const pinecone = new PineconeClient();

export const initPinecone = async () => {
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

export const upsertVector = async (id: string, vector: number[], metadata: any) => {
  const index = pinecone.Index('cro-retention-assistant');
  await index.upsert([{ id, values: vector, metadata }]);
};

export const queryVector = async (vector: number[], topK: number = 5) => {
  const index = pinecone.Index('cro-retention-assistant');
  const queryResult = await index.query({ vector, topK, includeMetadata: true });
  return queryResult.matches || [];
};