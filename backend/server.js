// server.js

import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import cors from 'cors'
import staffRoutes from './routes/staffRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import codeRequestRoutes from './routes/codeRequestRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'
import docsRoutes from './routes/SharedDocsRoutes.js'






const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());


app.use('/auth', authRoutes);
app.use('/issue', issueRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/docs', docsRoutes);
app.use('/notification', notificationRoutes);
app.use("/api/school", staffRoutes);
app.use("/api/school", studentRoutes);
app.use('/api/code', codeRequestRoutes);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
