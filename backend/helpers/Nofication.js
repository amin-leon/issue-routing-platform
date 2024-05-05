import Notification from "../models/Notification";

export const createNotification = async (notificationType, content, recipientId) => {
    const notification = new Notification({
      notificationType,
      content,
      recipient: recipientId,
    });
    await notification.save();
  };
  
  // Usage example
  await createNotification('IssueCreated', 'New issue created', adminUser._id);
  