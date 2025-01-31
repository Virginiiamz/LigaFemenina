var DataTypes = require("sequelize").DataTypes;
var _equipo = require("./equipo");
var _jugadora = require("./jugadora");

function initModels(sequelize) {
  var equipo = _equipo(sequelize, DataTypes);
  var jugadora = _jugadora(sequelize, DataTypes);

  jugadora.belongsTo(equipo, { as: "idequipo_equipo", foreignKey: "idequipo"});
  equipo.hasMany(jugadora, { as: "jugadoras", foreignKey: "idequipo"});

  return {
    equipo,
    jugadora,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
