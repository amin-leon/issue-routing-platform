import Docs from '../models/SharedDocs.js';

// Controller for uploading a document
const uploadDocument = async (req, res) => {
    try {
        const { issueId, posterUser } = req.body;
        const document = req.file.path;

        const newDoc = new Docs({ issueId, posterUser, document });
        await newDoc.save();

        res.status(201).json({ message: 'Document uploaded successfully', newDoc });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export default {
    uploadDocument
}
