import Notification from '../models/Notification.js';

const getNotificationsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const notifications = await Notification.find({ $or: [{ recipient: userId }, { sender: userId }] });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// when user read notification
const updateNotificationIsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Assuming you have a Notification model with an 'isRead' field
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating notification status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getNotificationsByUser,
  updateNotificationIsRead
};
