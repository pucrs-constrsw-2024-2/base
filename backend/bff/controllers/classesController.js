const axios = require('axios');

const apiBaseUrl = `${process.env.CLASSES_INTERNAL_PROTOCOL}://${process.env.CLASSES_INTERNAL_HOST}:${process.env.CLASSES_INTERNAL_PORT}` || "http://classes:8080";

const getClasses = async (req, res) => {
    try {
        const { authorization } = req.headers;
        var requestUrl = `${apiBaseUrl}/classes`;
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
        const response = await axios.get(`${apiBaseUrl}/classes/${req.params.id}`, {
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
        const response = await axios.post(`${apiBaseUrl}/classes`, req.body, {
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
        const response = await axios.put(`${apiBaseUrl}/classes/${req.params.id}`, req.body, {
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
        const response = await axios.patch(`${apiBaseUrl}/classes/${req.params.id}`, req.body, {
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
        const response = await axios.delete(`${apiBaseUrl}/classes/${req.params.id}`, {
            headers: { authorization }
        });
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
		res.status(error.response.status).send(error.response.data);
	}
};

module.exports = {
    createClass,
    getClassById,
    getClasses,
    putClass,
    patchClass,
    deleteClass,
    getHealth
}
