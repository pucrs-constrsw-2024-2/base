const BACKEND_URL = `${process.env.COURSES_INTERNAL_PROTOCOL}://${process.env.COURSES_INTERNAL_HOST}:${process.env.COURSES_INTERNAL_PORT}` || "http://courses:8080";

const createCourse = async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/courses`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const response = axios.get(`${BACKEND_URL}/courses`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BACKEND_URL}/courses/${id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const fullCourseUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(`${BACKEND_URL}/courses/${id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const partialCourseUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/courses/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

const deleteCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(`${BACKEND_URL}/courses/${id}`);
    res.status(response.status).send();
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  fullCourseUpdate,
  partialCourseUpdate,
  deleteCourseById,
};
