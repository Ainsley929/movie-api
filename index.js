const bodyParser = require('body-parser')
const express = require('express')
const Sequelize = require('sequelize')
const models = require('./models')
const app = express()

app.get('/movies', async (request, response) => {
    const movies = await models.Movies.findAll({
        include: [{
            model: models.Genres
        },
        {
            model: models.Directors

        }]
    })
    response.send(movies)
})
app.get('/movies/:id', async (request, response) => {
    const matchingMovie = await models.Movies.findAll({
        where: { id: request.params.id }
    })
    if (matchingMovie.length) {
        response.send(matchingMovie)
    } else {
        response.sendStatus(404)
    }
})
app.get('/directors/:id', async (request, response) => {
    const matchingDirector = await models.Directors.findAll({
        where: { id: request.params.id },
        include: models.Movies
    })
    if (matchingDirector.length) {
        response.send(matchingDirector)
    } else {
        response.sendStatus(404)
    }
})
app.get('/genres/:id', async (request, response) => {
    const matchingGenres = await models.Genres.findAll({
        where: { genres: request.params.id },
        include: models.Movies
    })
    if (matchingGenres.length) {
        response.send(matchingGenres)
    } else {
        response.sendStatus(404)
    }
})
app.use(bodyParser.json())

app.post('/movies', async (request, response) => {
    const { title, directors, releaseDate, rating, runTime, genres } = request.body
    formatRunTime = JSON.stringify(runTime)

    if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
        response.status(400).send('The following fields are required: title, director, releaseDate, rating, runTime, genre')
    }

    const [newTitle] = await models.Movies.findOrCreate({
        where: {
            title: title
        },
        defaults: {
            releaseDate: releaseDate,
            rating: rating,
            runTime: formatRunTime
        }
    })

    const directorsIds = []
    const directorsSplit = directors.split(",")
    for (let i = 0; i < directorsSplit.length; i++) {
        const [newDirector] = await models.Directors.findOrCreate({
            where: {

                directors: directorsSplit[i].trim()

            },
        })
        directorsIds.push(newDirector.id)
    }

    newTitle.setDirectors(directorsIds)
    await newTitle.save()

    const genresIds = []
    const genresSplit = genres.split(",")
    for (let i = 0; i < genresSplit.length; i++) {
        const [newGenre] = await models.Genres.findOrCreate({
            where: { genres: genre.trim() }
        })
        genresIds.push(newGenre.id)
    }

    newTitle.setGenres(genresIds)
    await newTitle.save()

    const createdMovie = await models.Movies.findAll({
        where: { id: newTitle.id },
        include: [{
            model: models.Directors
        },
        {
            model: models.Genres
        }
        ],
    })

    response.status(201).send(createdMovie)
})
const server = app.listen(1337, () => { console.log('listening on port 1337') })
module.exports = server

