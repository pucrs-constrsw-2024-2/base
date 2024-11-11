const BACKEND_URL = `${process.env.COURSES_INTERNAL_PROTOCOL}://${process.env.COURSES_INTERNAL_HOST}:${process.env.COURSES_INTERNAL_PORT}` || "http://courses:8080";

const createReference = async (req, res) => {
  const { courseId } = req.params;
  try {
    const response = await axios.post(
      `${BACKEND_URL}/courses/${courseId}/references`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const getAllReferences = async (req, res) => {
  const { courseId } = req.params;

  try {
    const response = await axios.get(
      `${BACKEND_URL}/courses/${courseId}/references`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const getReferenceById = async (req, res) => {
  const { courseId, id } = req.params;

  try {
    const response = await axios.get(
      `${BACKEND_URL}/courses/${courseId}/references/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const updateReference = async (req, res) => {
  const { courseId, id } = req.params;

  try {
    const response = await axios.put(
      `${BACKEND_URL}/courses/${courseId}/references/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const partialReferenceUpdate = async (req, res) => {
  const { courseId, id } = req.params;

  try {
    const response = await axios.patch(
      `${BACKEND_URL}/courses/${courseId}/references/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const deleteReference = async (req, res) => {
  const { courseId, id } = req.params;

  try {
    const response = await axios.delete(
      `${BACKEND_URL}/courses/${courseId}/references/${id}`
    );
    res.status(response.status).send();
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

module.exports = {
  createReference,
  getAllReferences,
  getReferenceById,
  updateReference,
  partialReferenceUpdate,
  deleteReference,
};
