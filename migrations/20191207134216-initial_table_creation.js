'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.createTable('movies', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING },
      runTime: { type: Sequelize.STRING },
      releaseDate: { type: Sequelize.STRING },
      rating: { type: Sequelize.ENUM('Not Rated', 'G', 'R', 'Passed', 'PG', 'PG-13', 'Approved') },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('genres', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      genres: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deletedAt: { type: Sequelize.DATE },
    })
    await queryInterface.createTable('directors', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      directors: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('movieGenres', {
      movieId: { type: Sequelize.INTEGER, primaryKey: true, reference: { model: 'movies', key: 'id' } },
      genreId: { type: Sequelize.INTEGER, primaryKey: true, reference: { model: 'genres', key: 'id' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deletedAt: { type: Sequelize.DATE },
    })

    return queryInterface.createTable('movieDirectors', {
      movieId: { type: Sequelize.INTEGER, primaryKey: true, reference: { model: 'movies', key: 'id' } },
      directorId: { type: Sequelize.INTEGER, primaryKey: true, reference: { model: 'directors', key: 'id' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deletedAt: { type: Sequelize.DATE },
    })

  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    await queryInterface.dropTable('movieDirectors')
    await queryInterface.dropTable('movieGenres')
    await queryInterface.dropTable('directors')
    await queryInterface.dropTable('genres')
    return queryInterface.dropTable('movies')
  },
}