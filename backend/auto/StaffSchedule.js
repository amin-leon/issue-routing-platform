import cron from 'node-cron';
import { EventEmitter } from 'events';
import Issue from '../models/Issue.js';
import User from '../models/User.js';
import Alert from '../models/Alerts.js';
import { createWarning } from '../helpers/Warnings.js';

const eventEmitter = new EventEmitter();

const schedulePendingIssueReminder = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const adminUser = await User.findOne({ role: 'Admin' });

      if (!adminUser) {
        console.error('Admin user not found.');
        return;
      }

      const adminId = adminUser._id;

      // Delete previous warnings
      await Alert.deleteMany({ recipient: adminId });

      const pendingIssuesCount = await Issue.countDocuments({ status: 'pending' });

      await createWarning('Reminder', `You have open issues to work on.`, adminId, pendingIssuesCount);
    } catch (error) {
      console.error('Error scheduling pending issue reminder:', error);
    }
  });
};

export { eventEmitter, schedulePendingIssueReminder };
