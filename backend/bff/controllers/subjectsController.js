const axios = require('axios');

const apiBaseUrl = `${process.env.LESSONS_INTERNAL_PROTOCOL}://${process.env.LESSONS_INTERNAL_HOST}:${process.env.LESSONS_INTERNAL_PORT}` || "http://lessons:8080";

const createSubject = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getAllSubjects = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getSubjectById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const fullSubjectUpdate = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const partialSubjectUpdate = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const deleteSubjectById = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

// const getSubjectsBySimpleQuery = async (req, res) => {

// const getSubjectsByComplexQuery = async (req, res) => {

// const getSubjectsHealth = async (req, res) => {
//     try {
//         const response = await axios.get(`${apiBaseUrl}/health`);
//         res.status(response.status).send(response.data);
//     } catch (error) {
//         res.status(error.response.status).send(error.response.data);
//     }
// };
