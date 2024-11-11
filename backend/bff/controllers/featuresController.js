const apiBaseUrl = `${process.env.ROOMS_INTERNAL_PROTOCOL}://${process.env.ROOMS_INTERNAL_HOST}:${process.env.ROOMS_INTERNAL_PORT}` || "http://rooms:8080";

const createFeature = async (req, res) => {
    try {
        const { roomId } = req.params;
        const response = await axios.post(`${apiBaseUrl}/${roomId}/feature`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getFeatureById =  async (req, res) => {
    try {
        const { roomId, id } = req.params;
        const response = await axios.get(`${apiBaseUrl}/${roomId}/feature/${id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const deleteFeatureById = async (req, res) => {
    try {
        const { roomId, id } = req.params;
        const response = await axios.delete(`${apiBaseUrl}/${roomId}/feature/${id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const fullFeatureUpdate = async (req, res) => {
    try {
        const { roomId, id } = req.params;
        const response = await axios.put(`${apiBaseUrl}/${roomId}/feature/${id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const partialFeatureUpdate = async (req, res) => {
    try {
        const { roomId, id } = req.params;
        const response = await axios.patch(`${apiBaseUrl}/${roomId}/feature/${id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

const getAllFeatures = async (req, res) => {
    try {
        const { roomId } = req.params;
        const response = await axios.get(`${apiBaseUrl}/${roomId}/feature`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
};

module.exports = {
    getAllFeatures,
    getFeatureById,
    createFeature,
    deleteFeatureById,
    fullFeatureUpdate,
    partialFeatureUpdate,
}