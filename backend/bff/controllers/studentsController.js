const axios = require('axios');

const apiBaseUrl = `${process.env.STUDENTS_INTERNAL_PROTOCOL}://${process.env.STUDENTS_INTERNAL_HOST}:${process.env.STUDENTS_INTERNAL_PORT}` || "http://students:8080";

const createStudent = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const getAllStudents = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const getStudents = async (req, res) => {
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

const putStudent = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const patchStudent = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
}

const deleteStudent = async (req, res) => {
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
    createStudent,
    getAllStudents,
    getStudents,
    putStudent,
    patchStudent,
    deleteStudent,
    getHealth
}