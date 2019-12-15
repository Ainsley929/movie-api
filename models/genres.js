const genres = (connection, Sequelize) => {
    return connection.define('genres', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        genres: { type: Sequelize.STRING },
    }, { paranoid: true })
}

module.exports = genres