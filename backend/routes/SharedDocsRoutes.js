import express from 'express';
import docsController from '../controllers/SharedDocsController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// POST endpoint to upload a document
router.post('/upload', upload.single('document'), docsController.uploadDocument);

// DELETE endpoint to delete a document
router.delete('/delete/:id', docsController.deleteDocument);

// GET endpoint to get all documents
router.get('/documents', docsController.getAllDocuments);

export default router;
