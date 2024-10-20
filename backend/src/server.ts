import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import resourceRoutes from './routes/resourceRoutes';
import chatRoutes from './routes/chatRoutes';
import { initPinecone } from './services/pineconeService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cro_retention_assistant')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Initialize Pinecone
initPinecone()
  .then(() => console.log('Pinecone initialized'))
  .catch((err) => console.error('Error initializing Pinecone:', err));

// Routes
app.use('/api/resources', resourceRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});