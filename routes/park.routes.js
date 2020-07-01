const express = require('express')
const router = express.Router()

const Park = require('./../models/park.model')
const Coaster = require('./../models/coaster.model')

// Aquí los endpoints



// CREATE
router.get('/crear', (req, res) => res.render('parks/new-park'))

router.post('/crear', (req, res) => {
    const {
        name,
        description
    } = req.body
    Park
        .create({
            name,
            description
        })
        .then(() => res.redirect('parks/listado'))
        .catch(err => console.log("Error en la BBDD", err))
})

router.get('/listaParques', (req, res) => {
    Park.find()
        .then(allParks => res.render('parks/parks-index', {
            allParks
        }))
        .catch(err => console.log("Error en la BBDD", err))
})


// EACH PARK DETAIL
router.get('/detalle/:parkId', (req, res) => {
    Coaster.findById(req.params.parkId)
        .populate('Coaster')
        .then(thePark => res.render('parks/park-details', thePark))
        .catch(err => console.log("Error en la BBDD", err))
})


module.exports = router