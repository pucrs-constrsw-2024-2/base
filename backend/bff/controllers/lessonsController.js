const axios = require('axios');

const apiBaseUrl = `${process.env.LESSONS_INTERNAL_PROTOCOL}://${process.env.LESSONS_INTERNAL_HOST}:${process.env.LESSONS_INTERNAL_PORT}` || "http://lessons:8080";

const createLesson = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getAllLessons = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getLessonById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const fullLessonUpdate = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const partialLessonUpdate = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const deleteLessonById = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getLessonsBySimpleQuery = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/simple/${req.query}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getLessonsByComplexQuery = async (req, res) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/complex/${req.query}`);
      res.status(response.status).send(response.data);
  } catch (error) {
      res.status(error.response.status).send(error.response.data);
  }
};

const getLessonsHealth = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/health`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

module.exports = {
    createLesson,
    getAllLessons,
    getLessonById,
    getLessonsBySimpleQuery,
    getLessonsByComplexQuery,
    fullLessonUpdate,
    partialLessonUpdate,
    deleteLessonById,
    getLessonsHealth
  };
  