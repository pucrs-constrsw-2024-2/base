const axios = require('axios');

const apiBaseUrl = `${process.env.CLASSES_INTERNAL_PROTOCOL}://${process.env.CLASSES_INTERNAL_HOST}:${process.env.CLASSES_INTERNAL_PORT}` || "http://classes:8080";

const createClass = async (req, res) => {
	try {
		const response = await axios.post(`${apiBaseUrl}`, req.body);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
	}
}

const getAllClasses = async (req, res) => {
	try {
		const response = await axios.get(`${apiBaseUrl}`);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
	}
}

const getClasses = async (req, res) => {
	try {
		if (!req.query) {
			const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
		} else {
			const response = await axios.get(`${apiBaseUrl}?${req.query}`);
		}
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
	}
}

const putClass = async (req, res) => {
	try {
		const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
	}
}

const patchClass = async (req, res) => {
	try {
		const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
	}
}

const deleteClass = async (req, res) => {
	try {
		const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
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
	getAllClasses,
	getClasses,
	putClass,
	patchClass,
	deleteClass,
	getHealth
}
