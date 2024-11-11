const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`postgres://${process.env.POSTGRESQL_USERNAME}:${process.env.POSTGRESQL_PASSWORD}@localhost:${process.env.POSTGRESQL_PORT}/${process.env.POSTGRES_DB_NAME}`, {
  dialect: 'postgres',
  protocol: 'postgres',
});

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.CHAR,
    autoIncrement: true,
    primaryKey: true
  },
  disciplina: DataTypes.STRING,
  professor: DataTypes.STRING,
  horario: DataTypes.STRING,
  sala: DataTypes.STRING
});

const Grade = sequelize.define('Grade', {
  id: {
    type: DataTypes.CHAR,
    autoIncrement: true,
    primaryKey: true
  },
  tipoAvaliacao: DataTypes.STRING,
  data: DataTypes.DATE,
  notaAvaliacao: DataTypes.INTEGER,
  dataEntrega: DataTypes.DATE,
  ClassId: {
    type: DataTypes.CHAR,
    references: {
      model: 'Classes',
      key: 'id'
    }
  }
});

Class.hasMany(Grade, { as: 'grades', foreignKey: 'classId' });
Grade.belongsTo(Class, { foreignKey: 'classId' });

module.exports = { sequelize, Class, Grade };
