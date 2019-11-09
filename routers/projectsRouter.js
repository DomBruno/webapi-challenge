// import Express, Router, and data model
const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel.js');


 // GET all projects
 router.get('/', (req, res) => {
    projectDb.get(req.query)
        .then(projects => {
            res
            .status(200)
            .json(projects);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res
            .status(500)
            .json({
                message: 'The Projects information could not be retrieved.',
            });
        });
    })
    //GET project by id
    router.get('/:id', (req, res) => {
        projectDb.get(req.params.id)
        .then(project => {
            res
            .status(200)
            .json(project);
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
// export router
module.exports = router;