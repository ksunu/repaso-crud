const express = require('express')
const router = express.Router()

const Park = require('./../models/park.model')
const Coaster = require('./../models/coaster.model')

// Aquí los endpoints
// router.get('/crear', (req, res) => res.render('coasters/new-coaster'))

// ALL PARKS
router.get('/crear', (req, res) => {
    Park.find()
        .then(allParks => res.render('coasters/new-coaster', {
            allParks
        }))
        .catch(err => console.log("Error en la BBDD", err))
})

router.post('/crear', (req, res) => {
    const {
        name,
        description,
        inversions,
        length
    } = req.body
    Coaster
        .create({
            name,
            description,
            inversions,
            length
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log("Error en la BBDD", err))
})

// ALL ROLLERCOASTERS
router.get('/listaCoaster', (req, res) => {
    Coaster.find()
        .populate('park')
        .then(allCoasters => res.render('coasters/coasters-index', {
            allCoasters
        }))
        .catch(err => console.log("Error en la BBDD", err))
})

// EACH ROLLER COASTER DETAIL
router.get('/detalle/:coasterId', (req, res) => {
    Coaster.findById(req.params.coasterId)
        .populate('park')
        .then(theCoaster => res.render('coasters/coaster-details', theCoaster))
        .catch(err => console.log("Error en la BBDD", err))
})

// DELETE ROLLERCOASTER
router.post('/:id/borrar', (req, res) => {
    Coaster.findByIdAndDelete(req.params.id)
        .then(deleteOne => res.render('coasters/coasters-index', deleteOne))
        .catch(err => console.log("Error en la BBDD", err))
})

// EDIT ROLLERCOASTER

router.get('/editar', (req, res) => {
    let coasterId = Coaster.findById()
    let allParks = Park.find()
    Promise.all([coasterId, allParks])
        .then(elm => res.render('coasters/edit-coaster', {
            coaster: elm[0],
            park: elm[1]
        }))
        .catch(err => console.log("Error en la BBDD", err))
})

// router.get('/editar', (req, res) => {
//     Coaster.findById(req.query.coasterId)
//         .populate('park')
//         .then(theCoaster => res.render('coasters/edit-coaster', theCoaster))
//         .catch(err => console.log("Error en la BBDD", err))
// })

router.post('/editar/:coasterId', (req, res) => {
    const {
        name,
        description,
        inversions,
        length,
        park
    } = req.body
    Coaster.findByIdAndUpdate(req.params.coasterId, {
            name,
            description,
            inversions,
            length,
            park
        }, {
            new: true
        })
        .then(() => res.redirect(`/coasters/detalle/${req.params.coasterId}`))
        .catch(err => console.log("Error en la BBDD", err))
})

module.exports = router