const axios = require("axios");
const apiBaseUrl =
  `${process.env.ROOMS_INTERNAL_PROTOCOL}://${process.env.ROOMS_INTERNAL_HOST}:${process.env.ROOMS_INTERNAL_PORT}` ||
  "http://rooms:8080";

const createRoom = async (req, res) => {
  try {
    const response = await axios.post(`${apiBaseUrl}`, req.body);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const getRoomById = async (req, res) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${req.params.id}`);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const deleteRoomById = async (req, res) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/${req.params.id}`);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const fullRoomUpdate = async (req, res) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/${req.params.id}`,
      req.body
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const partialRoomUpdate = async (req, res) => {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/${req.params.id}`,
      req.body
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const getAllRooms = async (req, res) => {
  try {
    const response = await axios.get(`${apiBaseUrl}`, { params: req.query });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.log(error);

    res.status(error.response.status).send(error.response.data);
  }
};

const createFeature = async (req, res) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/${req.params.id}/features`,
      req.body
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const getAllFeatures = async (req, res) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/${req.params.id}/features`,
      { params: req.query }
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const getFeatureById = async (req, res) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/${req.params.id}/features/${req.params.featureId}`
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const fullFeatureUpdate = async (req, res) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/${req.params.id}/features/${req.params.featureId}`,
      req.body
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const partialFeatureUpdate = async (req, res) => {
  try {
    const response = await axios.patch(
      `${apiBaseUrl}/${req.params.id}/features/${req.params.featureId}`,
      req.body
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
};

const deleteFeatureById = async (req, res) => {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/${req.params.id}/features/${req.params.featureId}`
    );
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
  createRoom,
  getAllRooms,
  getRoomById,
  fullRoomUpdate,
  partialRoomUpdate,
  deleteRoomById,
  createFeature,
  getAllFeatures,
  getFeatureById,
  fullFeatureUpdate,
  partialFeatureUpdate,
  deleteFeatureById,
  getHealth
};
