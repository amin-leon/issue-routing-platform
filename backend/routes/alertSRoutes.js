import express from 'express';

const router = express.Router();
import alertController from '../controllers/alertController.js';

// Route for fetching alerts
router.get('/:recipientId', alertController.fetchAllAlerts);


export default router;
