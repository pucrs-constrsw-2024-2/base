const axios = require('axios');

const apiBaseUrl = `${process.env.RESERVATIONS_INTERNAL_PROTOCOL}://${process.env.RESERVATIONS_INTERNAL_HOST}:${process.env.RESERVATIONS_INTERNAL_PORT}` || "http://reservations:8080";

const createIncident = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getAllIncidents = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getIncidentById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const fullIncidentUpdate = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const partialIncidentUpdate = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const deleteIncidentById = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

// const getIncidentBySimpleQuery = async (req, res) => {
//     try {
//         const response = await axios.get(`${apiBaseUrl}/simple/${req.query}`);
//         res.status(response.status).send(response.data);
//     } catch (error) {
//         res.status(error.response.status).send(error.response.data);
//     }
// };

// const getIncidentsHealth = async (req, res) => {
//     try {
//         const response = await axios.get(`${apiBaseUrl}/health`);
//         res.status(response.status).send(response.data);
//     } catch (error) {
//         res.status(error.response.status).send(error.response.data);
//     }
// };
