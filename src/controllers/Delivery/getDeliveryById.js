const Delivery = require("../../models/Delivery");
const getDeliveryById = async (req, res) => {
  const { id } = req.params;
  try {
    const delivery = await Delivery.findById(id);

    res.status(200).json(delivery);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getDeliveryById;
