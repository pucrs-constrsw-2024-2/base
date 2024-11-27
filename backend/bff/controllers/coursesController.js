const axios = require('axios');

const apiBaseUrl = `${process.env.COURSES_INTERNAL_PROTOCOL}://${process.env.COURSES_INTERNAL_HOST}:${process.env.COURSES_INTERNAL_PORT}` || "http://courses:8080";

const createCourse = async (req, res) => {
	try {
		const response = await axios.post(`${apiBaseUrl}/courses`, req.body);
		res.status(response.status).json(response.data);
	} catch (error) {
		res.status(error.response?.status || 500).json({ error: error.message });
	}
};

const getAllCourses = async (req, res) => {
	try {
		const response = await axios.get(`${apiBaseUrl}/courses`);
		res.status(response?.status || 200).json(response?.data || []);
	} catch (error) {
		res.status(error.response?.status || 500).json({ error: error.message });
	}
};

const getCourses = async (req, res) => {
	try {
		if (!req.query) {
			const response = await axios.get(`${apiBaseUrl}/courses/${req.params.id}`);
		} else {
			const response = await axios.get(`${apiBaseUrl}/courses?${req.query}`);
		}
		res.status(response.status).json(response.data);
	} catch (error) {
		res.status(error.response?.status || 500).json({ error: error.message });
	}
};

const putCourse = async (req, res) => {
	try {
		const response = await axios.put(`${apiBaseUrl}/courses/${req.params.id}`, req.body);
		res.status(response.status).json(response.data);
	} catch (error) {
		res.status(error.response?.status || 500).json({ error: error.message });
	}
};

const patchCourse = async (req, res) => {
	try {
		const response = await axios.patch(`${apiBaseUrl}/courses/${req.params.id}`, req.body);
		res.status(response.status).send(response.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
};

const deleteCourse = async (req, res) => {
	try {
		const response = await axios.delete(`${apiBaseUrl}/courses/${req.params.id}`);
		res.status(response.status).send();
	} catch (error) {
		res.status(error.response?.status || 500).json({ error: error.message });
	}
};

const getHealth = async (req, res) => {
	try {
		const response = await axios.get(`${apiBaseUrl}/health`);
		res.status(response?.status || 200).send(response.data);
	} catch (error) {
		console.log("Health check error", error.response.data);
		res.status(error.response.status).send(error.response.data);
	}
};

module.exports = {
	createCourse,
	getAllCourses,
	getCourses,
	putCourse,
	patchCourse,
	deleteCourse,
	getHealth
};
