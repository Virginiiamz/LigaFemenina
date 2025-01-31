const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('equipo', {
    idequipo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "nombre"
    },
    ciudad: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    urlimagen: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    esta_federado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dinero_transferencias: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fechacreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'equipo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idequipo" },
        ]
      },
      {
        name: "nombre",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre" },
        ]
      },
    ]
  });
};
