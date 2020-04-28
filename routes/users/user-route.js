const express = require('express');

const Users = require('./user-functions.js');

const router = express.Router();

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Users.findById(id)
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(500).json({message: 'failed to find user'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

router.post('/', (req, res) => {
    const data = req.body;

    Users.add(data)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    console.log(id)
    const upd = req.body;
    console.log(upd)

    Users.findById(id)
    .then(user => {
        if (user) {
            Users.update(upd, id)
            .then(updT => {
                res.json(updT)
            })
        } else {
            res.status(404).json({message: 'user not found'});
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({removed: deleted});
            } else {
                res.status(404).json({message: 'user not found'});
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

module.exports = router;