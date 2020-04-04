const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users)
        })
})

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            !user ? res.status(404).json(user) : res.status(200).json(user)
        })
        .catch(err => {
            console.log('err: ', err)
            res.status(404).send('something went wrong...')
        })
})

router.post('/', (req, res) => {
    // a new User is created with the request body
    const newUser = new User(req.body)
    console.log('newUser: ', newUser)


    //the new User is saved to mongodb with the 'save' method
    newUser.save()
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(400).send('unable to save to database')
            console.log('error msg: ', err)
        })
})

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.status(204).json(data)
        })
        .catch(err => {
            res.status(400).send('could not update')
            console.log('error msg: ', err)
        })
})

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(deleted => {
            res.json(deleted)
        })
        .catch(err => {
            console.log('error msg: ', err)
            res.status(400).send('something went wrong')
        })
})

module.exports = router