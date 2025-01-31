const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jugadora', {
    idjugadora: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    posicion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sueldo: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    disponible_jugar: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fechainscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    idequipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipo',
        key: 'idequipo'
      }
    }
  }, {
    sequelize,
    tableName: 'jugadora',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idjugadora" },
        ]
      },
      {
        name: "idequipo",
        using: "BTREE",
        fields: [
          { name: "idequipo" },
        ]
      },
    ]
  });
};
