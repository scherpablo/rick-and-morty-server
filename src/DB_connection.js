require("dotenv").config();
const { Sequelize } = require("sequelize");
const FavoriteModel = require("./models/Favorite");
const UserModel = require("./models/User");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const dbUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`;

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(dbUrl, { logging: false, native: false });

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
FavoriteModel(sequelize);
//
UserModel(sequelize);
//

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Favorite } = sequelize.models;

User.belongsToMany(Favorite, {
   through: 'user_favorite', 
   foreignKey: 'user_id',
 });
 
 Favorite.belongsToMany(User, {
   through: 'user_favorite', 
   foreignKey: 'favorite_id', 
 });

module.exports = {
  User,
  Favorite,
  conn: sequelize,
};
