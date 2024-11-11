const BACKEND_URL = `${process.env.RESOURCES_INTERNAL_PROTOCOL}://${process.env.RESOURCES_INTERNAL_HOST}:${process.env.RESOURCES_INTERNAL_PORT}` || "http://resources:8080";

const createMaintenance = async (req, res) => {
  const { resourceId } = req.params;
  try {
    const response = await axios.post(
      `${BACKEND_URL}/resource/${resource}/maintenances`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const getAllMaintenances = async (req, res) => {
  const { resourceId } = req.params;

  try {
    const response = await axios.get(
      `${BACKEND_URL}/resource/${resourceId}/maintenances`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const getMaintenanceById = async (req, res) => {
  const { resourceId, id } = req.params;

  try {
    const response = await axios.get(
      `${BACKEND_URL}/resource/${resourceId}/maintenances/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const updateMaintenance = async (req, res) => {
  const { resourceId, id } = req.params;

  try {
    const response = await axios.put(
      `${BACKEND_URL}/resource/${resourceId}/references/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const partialMaintenanceUpdate = async (req, res) => {
  const { resourceId, id } = req.params;

  try {
    const response = await axios.patch(
      `${BACKEND_URL}/resource/${resourceId}/maintenances/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const deleteMaintenance = async (req, res) => {
  const { resourceId, id } = req.params;

  try {
    const response = await axios.delete(
      `${BACKEND_URL}/resource/${resourceId}/maintenances/${id}`
    );
    res.status(response.status).send();
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

module.exports = {
  createMaintenance,
  getAllMaintenances,
  getMaintenanceById,
  updateMaintenance,
  partialMaintenanceUpdate,
  deleteMaintenance,
};
