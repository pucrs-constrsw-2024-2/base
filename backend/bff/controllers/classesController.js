const axios = require('axios');

const apiBaseUrl = `${process.env.CLASSES_INTERNAL_PROTOCOL}://${process.env.CLASSES_INTERNAL_HOST}:${process.env.CLASSES_INTERNAL_PORT}/classes` || "http://classes:8080/classes";

const getClasses = async (req, res) => {
    try {
        const { authorization } = req.headers;
        var requestUrl = `${apiBaseUrl}`;
        if (req.query) {
            const query = Object.entries(req.query).map(([key, value]) => `${key}=${value}`).join('&');
            requestUrl += `?${query}`;
        }
        const response = await axios.get(requestUrl, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getClassById = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}`, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const createClass = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.post(`${apiBaseUrl}`, req.body, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const putClass = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const patchClass = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const deleteClass = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

module.exports = {
    createClass,
    getClassById,
    getClasses,
    putClass,
    patchClass,
    deleteClass
}
