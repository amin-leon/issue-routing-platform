import cron from 'node-cron';
import { EventEmitter } from 'events';
import Issue from '../models/Issue.js';
import { createNotification } from '../helpers/Nofication.js';
import Alert from '../models/Alerts.js';


const eventEmitter = new EventEmitter();

const schedulePendingIssueAlerts = () => {
  // Schedule the task to run every 6 hours
//   cron.schedule('0 */6 * * *', async () => {
  cron.schedule('* * * * * *', async () => {
    try {
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      const sixHoursLater = new Date(Date.now() - 5 * 60 * 60 * 1000);

      const pendingIssues = await Issue.find({
        status: 'pending',
        // createdAt: { $gte: sixHoursAgo, $lt: sixHoursLater }
      });

      for (const issue of pendingIssues) {
        await createNotification('IssueCreated', 'you have issues pending .....', '65267a690e5b0fe584e163e7');
        eventEmitter.emit('pendingIssueAlert', { issueId: issue._id });
      }
    console.log(pendingIssues)
    } catch (error) {
      console.error('Error scheduling pending issue alerts:', error);
    }
  });
};

export { eventEmitter, schedulePendingIssueAlerts };
