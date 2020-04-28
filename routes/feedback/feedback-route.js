const express = require('express');
const db = require('./feedback-scheme.js')
const route = express.Router();

route.get('/', (req, res) => {
   db.get()
      .then(rep => {
         res.status(200).json({
            data: rep
         });
      })
      .catch(err => {
         res.status(500).json({
            message: `Server error. ${err}`   
         });
      });
});

route.get('/:ticketId', (req, res) => {
   db.findByTicketId(req.params.ticketId)
      .then(rep => {
         res.status(200).json({
            data: rep
         })
      })
      .catch(err => {
         res.status(500).json({
            message: `Server error. ${err}`   
         });
      });
});

route.post('/:ticketId', (req, res) => {
   const newFeedback = {
      ...req.body,
      ticket_id: req.params.ticketId
   };

   db.add(newFeedback)
   .then(rep => {
      res.status(201).json({
         data: rep
      })
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`   
      });
   });
});

module.exports = route;