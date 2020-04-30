const express = require('express');

const Users = require('./user-functions.js');

const router = express.Router();

router.get('/', (req, res) => {   
    let auth = req.decodedToken.account_type;
    
    if (auth === 'admin') {
        Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
    } else {
        Users.findUsers()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        })
    }

});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    let auth = req.decodedToken.account_type;

    if (auth === 'admin') {
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
    } else {
        res.status(401).json({message: 'user not authorized'})
    }

});

router.post('/', (req, res) => {
    let auth = req.decodedToken.account_type;
    const data = req.body;
    if (auth === 'admin') {
        Users.add(data)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
    } else {
        res.status(401).json({message: 'user not authorized'})
    }

});

router.put('/:id', (req, res) => {
    let auth = req.decodedToken.account_type;
    const {id} = req.params;    
    const upd = req.body;
    console.log(req.body.username)

    if (auth === 'admin') {
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
    } else {
        res.status(401).json({message: 'user not authorized'})
    }

});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let auth = req.decodedToken.account_type;

    if (auth === 'admin') {
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
    } else {
        res.status(401).json({message: 'user not authorized'})
    }

});

module.exports = router;