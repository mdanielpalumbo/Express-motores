const express = require('express')
const prodsRouter = require('./routes/prodsRouter')

const app = express()

app.set('view engine', 'ejs')

app.use('/api/productos', prodsRouter)

app.use(express.static("public"))

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor conectado correctamente al puerto ${PORT}`)
})
