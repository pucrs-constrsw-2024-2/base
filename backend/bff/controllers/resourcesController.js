const axios = require("axios");

const apiBaseUrl =
    `${process.env.RESOURCES_INTERNAL_PROTOCOL}://${process.env.RESOURCES_INTERNAL_HOST}:${process.env.RESOURCES_INTERNAL_PORT}` ||
    "http://localhost:8080/";
const resourcesUrl = `${apiBaseUrl}/resources`;
const maintenanceUrl = `${apiBaseUrl}/maintenance`;

const createResource = async (req, res) => {
    try {
        const response = await axios.post(`${resourcesUrl}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getAllResources = async (req, res) => {
    try {
        const response = await axios.get(`${resourcesUrl}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getResources = async (req, res) => {
    try {
        if (!req.query) {
            const response = await axios.get(`${resourcesUrl}/${req.params.id}`);
        } else {
            const response = await axios.get(`${resourcesUrl}?${req.query}`);
        }
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const putResource = async (req, res) => {
    try {
        const response = await axios.put(`${resourcesUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const patchResource = async (req, res) => {
    try {
        const response = await axios.patch(`${resourcesUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const deleteResource = async (req, res) => {
    try {
        const response = await axios.delete(`${resourcesUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};



const getHealth = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/health`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

module.exports = {
    createResource,
    getAllResources,
    getResources,
    putResource,
    patchResource,
    deleteResource,
    getHealth
};
