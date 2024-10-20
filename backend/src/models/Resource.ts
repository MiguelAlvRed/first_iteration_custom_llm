import mongoose, { Document, Schema } from 'mongoose';

interface IResource extends Document {
  title: string;
  type: 'pdf' | 'web';
  content: string;
  url: string;
  embedding: number[];
  createdAt: Date;
}

const ResourceSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['pdf', 'web'], required: true },
  content: { type: String, required: true },
  url: { type: String },
  embedding: { type: [Number], required: true },
  createdAt: { type: Date, default: Date.now },
});

ResourceSchema.index({ embedding: 'vector' });

export default mongoose.model<IResource>('Resource', ResourceSchema);