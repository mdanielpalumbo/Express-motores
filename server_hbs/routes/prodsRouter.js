const { application } = require("express");
const express = require("express");
const Contenedor = require("../files/files")

const prodsRouter = express.Router()

const ps = new Contenedor("./files/productos")

let len = 0
let cont = []
let y_n = true
let z = true
prodsRouter.use(
    express.json(),

    express.urlencoded({extended: true}),

    async (req, res, next)=>{
        cont = await ps.getAll()
        len = cont.length
        if (len == 0) {
            z = true
        }else {
            z = false
        }
        next()
    }
)

prodsRouter.get('/pre', (req,res) => {
    y_n = !y_n
    res.redirect('/api/productos')
})

prodsRouter.get('/', async (req, res) => {
    res.render('main', {y_n, cont, z})
})

prodsRouter.post('/', async (req, res) => {
    let prod = {...req.body}
    await ps.save(prod)
    res.redirect('/api/productos')
})

prodsRouter.get('/:id',
    async (req,res) => {
        try{
            const { id } = req.params
            p = await ps.getById(id)
            if ( isNaN(id) || id < 1 || id > len){
                res.json("Error: producto no encontrado")
            }else{ 
                res.json(p)
            }
        }catch(err){
            console.log(err)
            res.send(err)
        }
    }
)

prodsRouter.put('/:id', (req,res) => {
    try{
        let { id } = req.params
        let prod = {...req.body}
        if ( isNaN(id) || id < 1 || id > len){
            res.json("Error: producto no encontrado")
        }else{ 
            ps.actById(id, prod)
            res.json(prod)  
        }
    }catch(err){
        console.log(err)
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
