import express from 'express';
import multer from 'multer';
import { addResource, getResources, deleteResource } from '../controllers/resourceController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), addResource);
router.get('/', getResources);
router.delete('/:id', deleteResource);

export default router;