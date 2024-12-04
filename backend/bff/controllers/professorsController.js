const axios = require('axios');

const apiBaseUrl = `http://${process.env.PROFESSORS_INTERNAL_HOST}:${process.env.PROFESSORS_INTERNAL_PORT}` || "http://professors:8080";

// Health check
const healthCheck = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/health`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

// Professors
const createProfessor = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/professors`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const getProfessors = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/professors`, { params: req.query });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const getProfessorById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/professors/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const putProfessor = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/professors/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const patchProfessor = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/professors/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const deleteProfessor = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/professors/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

// Backgrounds
const createBackground = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/professors/${req.params.id}/backgrounds`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const getBackgroundsByProfessor = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/professors/${req.params.id}/backgrounds`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const getBackgroundById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/professors/${req.params.id}/backgrounds/${req.params.backgroundId}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const putBackground = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/professors/${req.params.id}/backgrounds/${req.params.backgroundId}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const patchBackground = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/professors/${req.params.id}/backgrounds/${req.params.backgroundId}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

const deleteBackground = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/professors/${req.params.id}/backgrounds/${req.params.backgroundId}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || { message: error.message });
    }
};

module.exports = {
    healthCheck,
    createProfessor,
    getProfessors,
    getProfessorById,
    putProfessor,
    patchProfessor,
    deleteProfessor,
    createBackground,
    getBackgroundsByProfessor,
    getBackgroundById,
    putBackground,
    patchBackground,
    deleteBackground,
};
