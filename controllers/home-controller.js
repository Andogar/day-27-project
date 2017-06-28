const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser');


router.get("/index", function (request, response) {
  var result = models.Item.all({order:[["createdAt", "DESC"]]}).then(result => {
    response.render('index', { tasks: result });
  });
});

router.post("/index", function (request, response) {
  var listItem = request.body.todo;

  if (!listItem) {
    response.render('index');
  } else {
    models.Item.create({
      description: listItem,
      completed: false
    }).then(result => response.redirect('/index'));
  }
});

router.post('/index/edit/:id', (request, response) => {
  models.Item.update({
    description: request.body.edit
  }, {
      where: {
        id: request.params.id
      }
    }).then(result => response.redirect('/index'));
});

router.post('/index/:id', (request, response) => {
  models.Item.update({
    completed: true
  }, {
      where: {
        id: request.params.id
      }
    }).then(result => response.redirect('/index'));
});

router.post('/index/delete/:id', (request, response) => {
  if (request.params.id === 'all') {
    models.Item.destroy({
      where: {
        completed: true
      }
    }).then(result => response.redirect('/index'));
  } else {
    models.Item.destroy({
      where: {
        id: request.params.id
      }
    }).then(result => response.redirect('/index'));
  }
});

module.exports = router;