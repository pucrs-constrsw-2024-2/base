const axios = require('axios');

const apiBaseUrl = `${process.env.CLASSES_INTERNAL_PROTOCOL}://${process.env.CLASSES_INTERNAL_HOST}:${process.env.CLASSES_INTERNAL_PORT}` || "http://classes:8080";

// CLASSES

const getClasses = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/all`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getClassById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const createClass = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/register`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const putClass = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const patchClass = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const deleteClass = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getClassesByQuery = async (req, res) => {
    try {
        const query = Object.entries(req.query).map(([key, value]) => `${key}=${value}`).join('&');
        const response = await axios.get(`${apiBaseUrl}?${query}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

module.exports = {
    getClasses,
    getClassById,
    createClass,
    putClass,
    patchClass,
    deleteClass,
    getClassesByQuery
}
