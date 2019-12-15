const movieGenres = (connection, Sequelize) => {
    return connection.define('movieGenres', {
        movieId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'movies', key: 'id' } },
        genreId: {
            type: Sequelize.INTEGER, primaryKey: true, references: { model: 'genres', key: 'id' },
        }
    }, { paranoid: true })
}
module.exports = movieGenres