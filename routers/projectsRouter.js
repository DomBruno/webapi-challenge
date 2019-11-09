// import Express, Router, and data model
const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel.js');


 // GET all projects
 router.get('/', (req, res) => {
    projectDb.get()
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
                message: 'The Projects information could not be retrieved.',});
        })
    });
    //GET project by id
    router.get('/:id', (req, res) => {

        projectDb.get(req.params)
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
                message: 'The Project information could not be retrieved.',});
            });
    });

    // POST Call

    router.post('/', (req, res) => {
        projectDb.insert(req.body)
        .then(project => {
          res
          .status(201)
          .json(project);
        })
        .catch(error => {
          // log error to server
          console.log(error);
          res
          .status(500)
          .json({
            message: 'Error adding the project.',});
        });
      });

// PUT Handler
router.put('/:id', (req, res) => {
    projectDb.update(req.params.id, req.body)
    .then(project => {
      if (project) {
        res
        .status(200)
        .json(project);
      } else {
        res
        .status(404)
        .json({ message: 'The project could not be found.', });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res
      .status(500)
      .json({
        message: 'Error updating the project.',});
    });
  });

      // DELETE Request Handlers
// Using async/await as the server has to take action

        // DELETE a Post by Id
        router.delete('/:id', (req, res) => {
            projectDb.remove(req.params)
            .then(count => {
              if (count > 0) {
                res
                .status(200)
                .json({ message: 'The project has been nuked', });
              } else {
                res
                .status(404)
                .json({ message: 'The project could not be found', });
              }
            })
            .catch(error => {
              // log error to server
              console.log(error);
              res
              .status(500)
              .json({
                message: 'Error removing the project',});
            });
          });

          // Get Project Actions
router.get("/:id/actions", validateProjectId, async (req, res) => {
  try {
    const actions = await db.getProjectActions(req.params.id);

    actions.length > 0
      ? res.status(200).json(actions)
      : res
          .status(200)
          .json({ message: "This projects doesn't have any actions" });
  } catch {
    res.status(500).json({
      error:
        "There was an error while attempting to fetch the actions for the project"
    });
  }
});
// export router
module.exports = router;