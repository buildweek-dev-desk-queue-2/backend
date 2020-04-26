const express = require('express');

const Tickets = require('./ticket-functions.js');

const router = express.Router();

router.get('/', (req, res) => {
    Tickets.find()
    .then(tickets => {
        res.json(tickets);
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

router.get('/id', (req, res) => {
    const {id} = req.params;

    Tickets.findById(id)
    .then(ticket => {
        if (ticket) {
            res.json(ticket)
        } else {
            res.status(500).json({message: 'failed to find ticket'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

router.post('/', (req, res) => {
    const data = req.body;

    Tickets.add(data)
    .then(ticket => {
        res.status(201).json(ticket);
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

    Tickets.findById(id)
    .then(ticket => {
        if (ticket) {
            Tickets.update(upd, id)
            .then(updT => {
                res.json(updT)
            })
        } else {
            res.status(404).json({message: 'ticket not found'});
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Tickets.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({removed: deleted});
            } else {
                res.status(404).json({message: 'ticket not found'});
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

module.exports = router;