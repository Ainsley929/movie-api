const movieDirectors = (connection, Sequelize) => {
    return connection.define('movieDirectors', {
        movieId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'movies', key: 'id' } },
        directorId: {
            type: Sequelize.INTEGER, primaryKey: true, references: { model: 'directors', key: 'id' },
        }
    }, { paranoid: true })
}
module.exports = movieDirectors