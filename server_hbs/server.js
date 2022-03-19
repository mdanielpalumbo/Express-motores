const express = require('express')
const prodsRouter = require('./routes/prodsRouter')
const handlebars = require('express-handlebars')

const app = express()

app.use('/api/productos', prodsRouter)

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
)

app.set("view engine", "hbs")
app.set("views", "./views")
app.use(express.static("public"))

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor conectado correctamente al puerto ${PORT}`)
})
