const axios = require('axios');

const apiBaseUrl = `${process.env.RESOURCES_INTERNAL_PROTOCOL}://${process.env.RESOURCES_INTERNAL_HOST}:${process.env.RESOURCES_INTERNAL_PORT}` || "http://resources:8080";

const createResource = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getAllResources = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getResourceById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const fullResourceUpdate = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const partialResourceUpdate = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const deleteResourceById = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

// const getResourcesBySimpleQuery = async (req, res) => {
//     try {
//         const response = await axios.get(`${apiBaseUrl}/simple/${req.query}`);
//         res.status(response.status).send(response.data);
//     } catch (error) {
//         res.status(error.response.status).send(error.response.data);
//     }
// };

// const getResorcesByComplexQuery = async (req, res) => {
//   try {
//       const response = await axios.get(`${apiBaseUrl}/complex/${req.query}`);
//       res.status(response.status).send(response.data);
//   } catch (error) {
//       res.status(error.response.status).send(error.response.data);
//   }
// };

// const getResourcesHealth = async (req, res) => {
//     try {
//         const response = await axios.get(`${apiBaseUrl}/health`);
//         res.status(response.status).send(response.data);
//     } catch (error) {
//         res.status(error.response.status).send(error.response.data);
//     }
// };
