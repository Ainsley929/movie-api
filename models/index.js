const Sequelize = require('sequelize')
const DirectorsModel = require('./directors')
const GenresModel = require('./genres')
const MoviesModel = require('./movies')
const MovieDirectorsModel = require('./movieDirectors')
const MovieGenresModel = require('./movieGenres')
const allConfigs = require('../config/sequelize')

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
})

const Movies = MoviesModel(connection, Sequelize)
const Directors = DirectorsModel(connection, Sequelize)
const Genres = GenresModel(connection, Sequelize)
const MovieDirectors = MovieDirectorsModel(connection, Sequelize)
const MovieGenres = MovieGenresModel(connection, Sequelize)


Movies.belongsToMany(Directors, { through: 'MovieDirectors' })
Directors.belongsToMany(Movies, { through: 'MovieDirectors' })
Movies.belongsToMany(Genres, { through: 'MovieGenres' })
Genres.belongsToMany(Movies, { through: 'MovieGenres' })



module.exports = {
    Movies,
    Directors,
    Genres,
    MovieDirectors,
    MovieGenres
}