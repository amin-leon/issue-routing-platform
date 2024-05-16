import Alert from "../models/Alerts.js";

export const createWarning = async (warningType, content, recipientId, link) => {
    const warning = new Alert({
      warningType,
      content,
      recipient: recipientId,
      link: link,
    });
    await warning.save();
  };
  
  // Usage example
//   await createNotification('IssueCreated', 'New issue created', adminUser._id);
  