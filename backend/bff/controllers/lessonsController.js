const axios = require('axios');

const apiBaseUrl = `${process.env.LESSONS_INTERNAL_PROTOCOL}://${process.env.LESSONS_INTERNAL_HOST}:${process.env.LESSONS_INTERNAL_PORT}` || "http://lessons:8080";

const createLesson = async (req, res) => {
	try {
		const response = await axios.post(`${apiBaseUrl}`, req.body);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
};

const getAllLessons = async (req, res) => {
	try {
		const response = await axios.get(`${apiBaseUrl}`);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
};

const getLessons = async (req, res) => {
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
};

const putLesson = async (req, res) => {
	try {
		const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
};

const patchLesson = async (req, res) => {
	try {
		const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
};

const deleteLesson = async (req, res) => {
	try {
		const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
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
	createLesson,
	getAllLessons,
	getLessons,
	putLesson,
	patchLesson,
	deleteLesson,
	getHealth
};
