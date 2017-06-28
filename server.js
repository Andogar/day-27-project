const express = require('express');
const mustache = require('mustache-express');

const bodyParser = require('body-parser');

const homeController = require('./controllers/home-controller');

const application = express();

application.engine('mustache', mustache());
application.set('view engine', 'mustache');
application.set('views', './views');

application.use(bodyParser.urlencoded());

application.use('/public', express.static('./public'));

application.use(homeController);

application.listen(3000);