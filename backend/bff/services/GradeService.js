const mockGrades = [
    // Dados mockados de Avaliações
];

async function getGradesByClassId(idClasse) {
    return mockGrades.filter(grade => grade.classeId === idClasse);
}

async function getGradeByClassIdAndGradeId(idClasse, idAvaliacao) {
    return mockGrades.find(grade => grade.classeId === idClasse && grade.id === idAvaliacao);
}

async function createGrade(gradeData) {
    const newGrade = { ...gradeData, id: Date.now() };
    mockGrades.push(newGrade);
    return newGrade;
}

async function updateGradeByClassIdAndGradeId(idClasse, idAvaliacao, updatedGradeData) {
    const index = mockGrades.findIndex(grade => grade.classeId === idClasse && grade.id === idAvaliacao);
    if (index !== -1) {
        mockGrades[index] = { ...mockGrades[index], ...updatedGradeData };
        return mockGrades[index];
    }
    return null;
}

async function partialUpdateGradeByClassIdAndGradeId(idClasse, idAvaliacao, updates) {
    const index = mockGrades.findIndex(grade => grade.classeId === idClasse && grade.id === idAvaliacao);
    if (index !== -1) {
        mockGrades[index] = { ...mockGrades[index], ...updates };
        return mockGrades[index];
    }
    return null;
}

async function deleteGradeByClassIdAndGradeId(idClasse, idAvaliacao) {
    const index = mockGrades.findIndex(grade => grade.classeId === idClasse && grade.id === idAvaliacao);
    if (index !== -1) {
        mockGrades.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    getGradesByClassId,
    getGradeByClassIdAndGradeId,
    createGrade,
    updateGradeByClassIdAndGradeId,
    partialUpdateGradeByClassIdAndGradeId,
    deleteGradeByClassIdAndGradeId
};
