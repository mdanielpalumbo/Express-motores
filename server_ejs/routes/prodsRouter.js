const express = require("express");
const Contenedor = require("../files/files")
const prodsRouter = express.Router()

const ps = new Contenedor("./files/productos")

let len = 0
let cont = []
let y_n = true

prodsRouter.use( express.json() )
prodsRouter.use ( express.urlencoded({extended: true}))
prodsRouter.use( async (req, res, next)=>{
    cont = await ps.getAll()
    len = cont.length
    next()
})

prodsRouter.get('/pre', (req,res) => {
    y_n = !y_n
    res.redirect('/api/productos')
})

prodsRouter.get('/', (req, res,next) => {
    res.render("main", {y_n, cont})
})

prodsRouter.post('/', async (req, res) => {
    const prod = {...req.body}
    await ps.save(prod)
    res.redirect("/api/productos")
})

prodsRouter.get('/:id',
    async (req,res) => {
    const { id } = req.params
    p = await ps.getById(id)    
        if ( isNaN(id) || id < 1 || id > len){
            res.json("Error: producto no encontrado")
        }else{ 
            res.json(p)
        }
    }
)

prodsRouter.put('/:id', (req,res) => {
    let { id } = req.params
    let prod = {...req.body}
    if ( isNaN(id) || id < 1 || id > len){
        res.json("Error: producto no encontrado")
    }else{ 
        ps.actById(id, prod)
        res.json(prod)  
    }    
})

prodsRouter.delete('/:id', (req,res) => {
    let { id } = req.params
    if ( isNaN(id) || id < 1 || id > len){
        res.json("Error: producto no encontrado para eliminar")
    }else{
        ps.deleteById(id)
        res.json(`Archivo de ID ${id} eliminado con éxito`)
    }
})

module.exports = prodsRouter
