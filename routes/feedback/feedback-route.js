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

route.get('/id/:id', (req, res) => {
   db.findById(req.params.id)
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
         feedbackId: rep
      })
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`   
      });
   });
});

route.put('/id/:id', (req, res) => {
   db.put(req.params.id, req.body)
   .then(rep => {
      res.status(200).json({
         modified: rep
      });
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`   
      });
   });
});

route.delete('/id/:id', (req, res) => {

   db.remove(req.params.id)
   .then(rep => {
      res.status(200).json({
         removed: rep
      });
   })
   .catch(err => {
      res.status(500).json({
         message: `Server error. ${err}`   
      });
   });

})

module.exports = route;