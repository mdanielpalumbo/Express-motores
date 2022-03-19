const express = require('express')
const prodsRouter = require('./routes/prodsRouter')

const app = express()

app.use('/api/productos', prodsRouter)

app.use(express.static('public'))

app.set("views", "./views")
app.set("view engine", "pug")


const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor conectado correctamente al puerto ${PORT}`)
})
