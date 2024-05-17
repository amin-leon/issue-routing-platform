import Alert from "../models/Alerts.js";


export const fetchAllAlerts = async (req, res) => {
  const { recipientId } = req.params;
  try {
    const alerts = await Alert.find({ recipient: recipientId });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  export default {
    fetchAllAlerts
  }