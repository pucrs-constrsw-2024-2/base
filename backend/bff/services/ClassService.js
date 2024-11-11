const mockClasses = [
    // Dados mockados de Classes
];

async function existsById(id) {
    return mockClasses.some(classe => classe.id === id);
}

async function findById(id) {
    return mockClasses.find(classe => classe.id === id);
}

async function getById(id) {
    return findById(id);
}

async function getAllClasses() {
    return mockClasses;
}

async function getByQuery(query) {
    // Implementar lógica para filtrar conforme a query
    return mockClasses;
}

async function updatePartial(id, updates) {
    const index = mockClasses.findIndex(classe => classe.id === id);
    if (index !== -1) {
        mockClasses[index] = { ...mockClasses[index], ...updates };
        return mockClasses[index];
    }
    return null;
}

async function registerClass(classeData) {
    const newClass = { ...classeData, id: Date.now() };
    mockClasses.push(newClass);
    return newClass;
}

async function deleteClass(id) {
    const index = mockClasses.findIndex(classe => classe.id === id);
    if (index !== -1) {
        mockClasses.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    existsById,
    findById,
    getById,
    getAllClasses,
    getByQuery,
    updatePartial,
    registerClass,
    deleteClass
};
