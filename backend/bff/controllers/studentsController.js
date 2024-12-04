const axios = require('axios');

const apiBaseUrl = `${process.env.STUDENTS_INTERNAL_PROTOCOL}://${process.env.STUDENTS_INTERNAL_HOST}:${process.env.STUDENTS_INTERNAL_PORT}` || "http://students:8080";

const createStudent = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}`, req.body, { headers: req.headers });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getAllStudents = async (req, res) => {
    try {
        console.log('getAllStudents');
        const queryParams = new URLSearchParams(req.query).toString();
        console.log(queryParams);

        const requestUrl = queryParams ? `${apiBaseUrl}/?${queryParams}` : `${apiBaseUrl}`;

        console.log(requestUrl);

        const response = await axios.get(requestUrl, { headers: req.headers });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.log('error');
        console.log(error);
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getStudents = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}`, { headers: req.headers });
        res.status(response.status).send(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const putStudent = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body, { headers: req.headers });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const patchStudent = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body, { headers: req.headers });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const deleteStudent = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`, { headers: req.headers });
        res.status(response.status).send(response.data);
    } catch (error) {
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getHealth = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/health`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
};

const createResult = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/${req.params.id}/results`, req.body, { headers: req.headers });
        res.status(response.status).send(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getResults = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}/results`, { headers: req.headers });
        res.status(response.status).send(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getResultById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}/results/${req.params.resultId}`, { headers: req.headers });
        res.status(response.status).send(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const putResult = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}/results/${req.params.resultId}`, req.body, { headers: req.headers });
        res.status(response.status).send(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const patchResult = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}/results/${req.params.resultId}`, req.body, { headers: req.headers });
        res.status(response.status).send(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const deleteResult = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}/results/${req.params.resultId}`, { headers: req.headers });
        res.status(response.status).send(response.data);
    }
    catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudents,
    putStudent,
    patchStudent,
    deleteStudent,
    getHealth,
    createResult,
    getResults,
    getResultById,
    putResult,
    patchResult,
    deleteResult
}