// import Express, Router, and data model
const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel.js');

// GET all Actions
router.get('/', (req, res) => {
    actionDb.get()
        .then(actions => {
            res
            .status(200)
            .json(actions);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res
            .status(500)
            .json({
                message: 'The Actions information could not be retrieved.',
            });
        });
    })

    // GET Action by Id
    router.get('/:id', (req, res) => {
        actionDb.get(req.params.id)
        .then(action => {
            res
            .status(200)
            .json(action);
        })
        .catch(error => {
            //log error
            console.log(error);
            res
            .status(500)
            .json({
                message: 'The Action information could not be retrieved.',
            });
            });
    })

// POST call to api

    router.post('/', (req, res) => {
        actionDb.insert(req.body)
        .then(action => {
          res
          .status(201)
          .json(action);
        })
        .catch(error => {
          // log error to server
          console.log(error);
          res
          .status(500)
          .json({
            message: 'Error adding the action.',
          });
        });
      });

// export router
module.exports = router;