const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/elk-load-test");
mongoose.Promise = Promise;

const TestRecord = require('./models/TestRecord');

const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', 'public/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const makeTestCalls = require('./makeTestCalls');

//makeTestCalls('https://e33d2ea501994214:b4b699b082a2f685@cjpoeiifd000101m3i4tz8dm5.es.vizion.ai', 'initial testing', 100);

app.listen(PORT);