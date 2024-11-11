const axios = require('axios');

const apiBaseUrl = `${process.env.CLASSES_INTERNAL_PROTOCOL}://${process.env.CLASSES_INTERNAL_HOST}:${process.env.CLASSES_INTERNAL_PORT}` || "http://classes:8080";

const getAvaliacoesByClasseId = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.idClasse}/classe`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
};

const getAvaliacaoByClasseIdAndAvaliacaoId = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.idClasse}/classe/${req.params.idAvaliacao}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
};

const createAvaliacao = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/${req.params.idClasse}/classe`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
};

const updateAvaliacaoByClasseIdAndAvaliacaoId = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.idClasse}/classe/${req.params.idAvaliacao}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
};

const partialUpdateAvaliacaoByClasseIdAndAvaliacaoId = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.idClasse}/classe/${req.params.idAvaliacao}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
};

const deleteAvaliacaoByClasseIdAndAvaliacaoId = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.idClasse}/classe/${req.params.idAvaliacao}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
};

module.exports = {
    getAvaliacoesByClasseId,
    getAvaliacaoByClasseIdAndAvaliacaoId,
    createAvaliacao,
    updateAvaliacaoByClasseIdAndAvaliacaoId,
    partialUpdateAvaliacaoByClasseIdAndAvaliacaoId,
    deleteAvaliacaoByClasseIdAndAvaliacaoId
};