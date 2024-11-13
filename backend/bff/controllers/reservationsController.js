const axios = require('axios');

const apiBaseUrl = `${process.env.RESERVATIONS_INTERNAL_PROTOCOL}://${process.env.RESERVATIONS_INTERNAL_HOST}:${process.env.RESERVATIONS_INTERNAL_PORT}` || "http://reservations:8080";

const createReservation = async (req, res) => {
    try {
        const response = await axios.post(`${apiBaseUrl}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getAllReservations = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getReservationById = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const fullReservationUpdate = async (req, res) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const partialReservationUpdate = async (req, res) => {
    try {
        const response = await axios.patch(`${apiBaseUrl}/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const deleteReservationById = async (req, res) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getReservationsBySimpleQuery = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/simple/${req.query}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getReservationsByComplexQuery = async (req, res) => {
  try {
      const response = await axios.get(`${apiBaseUrl}/complex/${req.query}`);
      res.status(response.status).send(response.data);
  } catch (error) {
      res.status(error.response.status).send(error.response.data);
  }
};

const getReservationsHealth = async (req, res) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/health`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    getReservationsBySimpleQuery,
    getReservationsByComplexQuery,
    fullReservationUpdate,
    partialReservationUpdate,
    deleteReservationById,
    getReservationsHealth
  };
  