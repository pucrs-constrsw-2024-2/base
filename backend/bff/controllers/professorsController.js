const axios = require('axios');

const apiBaseUrl = `${process.env.PROFESSORS_INTERNAL_PROTOCOL}://${process.env.PROFESSORS_INTERNAL_HOST}:${process.env.PROFESSORS_INTERNAL_PORT}` || "http://professors:8080";

const createProfessor = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const getAllProfessors = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const getProfessors = async (req, res) => {
    try {
        if (!req.query) {
            const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
        } else {
            const response = await axios.get(`${apiBaseUrl}?${req.query}`);
        }
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const putProfessor = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const patchProfessor = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const deleteProfessor = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const getHealth = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/health`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

module.exports = {
    createProfessor,
    getAllProfessors,
    getProfessors,
    putProfessor,
    patchProfessor,
    deleteProfessor,
    getHealth
}