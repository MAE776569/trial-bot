const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require("morgan");
const request = require("request");
const twig = require('twig');
const router = require('./routes/index.js');
const webhookRouter = require("./routes/webhook.js");
const app = express();
const port = process.env.PORT || 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', twig.__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));

app.use('^/', router);
app.use('^/webhook', webhookRouter);

app.listen(port, () => {
	console.log(`Running at port: ${port}`);
});