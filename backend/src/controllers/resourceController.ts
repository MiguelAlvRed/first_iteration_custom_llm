import { Request, Response } from 'express';
import Resource from '../models/Resource';
import pdf from 'pdf-parse';
import fs from 'fs';
import { getEmbedding } from '../services/openaiService';
import { upsertVector } from '../services/pineconeService';
import { scrapeWebContent } from '../services/webScraperService';

export const addResource = async (req: Request, res: Response) => {
  try {
    const { title, url } = req.body;
    let content = '';

    if (req.file) {
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdf(dataBuffer);
      content = pdfData.text;
      fs.unlinkSync(req.file.path); // Delete the temporary file
    } else if (url) {
      content = await scrapeWebContent(url);
    }

    const embedding = await getEmbedding(content);

    const newResource = new Resource({
      title,
      type: req.file ? 'pdf' : 'web',
      content,
      url: url || '',
      embedding,
    });

    await newResource.save();

    // Upsert the vector to Pinecone
    await upsertVector(newResource._id.toString(), embedding, {
      title: newResource.title,
      type: newResource.type,
      url: newResource.url,
    });

    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: 'Error adding resource', error });
  }
};

export const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await Resource.find().select('-content -embedding');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Resource.findByIdAndDelete(id);
    // TODO: Implement deletion from Pinecone
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
};