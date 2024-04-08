import express from 'express';
import docsController from '../controllers/SharedDocsController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// POST endpoint to upload a document
router.post('/upload', upload.single('document'), docsController.uploadDocument);

export default router;
