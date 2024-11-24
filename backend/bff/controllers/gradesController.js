const axios = require('axios');

const apiBaseUrl = `${process.env.CLASSES_INTERNAL_PROTOCOL}://${process.env.CLASSES_INTERNAL_HOST}:${process.env.CLASSES_INTERNAL_PORT}/classes` || "http://classes:8080/classes";

function buildGradesPath(classId) {
    return `${apiBaseUrl}/${classId}/grades`;
}

// CLASSES

const getGrades = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.get(buildGradesPath(req.params['classId']), {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const getGradeById = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.get(`${buildGradesPath(req.params['classId'])}/${req.params['gradeId']}`, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const createGrade = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.post(buildGradesPath(req.params['classId']), req.body, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const putGrade = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.put(`${buildGradesPath(req.params['classId'])}/${req.params['gradeId']}`, req.body, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const patchGrade = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.patch(`${buildGradesPath(req.params['classId'])}/${req.params['gradeId']}`, req.body, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

const deleteGrade = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const response = await axios.delete(`${buildGradesPath(req.params['classId'])}/${req.params['gradeId']}`, {
            headers: { authorization }
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
}

module.exports = {
    getGrades,
    getGradeById,
    createGrade,
    putGrade,
    patchGrade,
    deleteGrade
}
