const path = require('path');
const express = require('express');

const makeTestCalls = require('./makeTestCalls');

const router = express.Router();

const viewTestsOverview = require('./controllers/viewTestsOverview');
const viewTestDetails = require('./controllers/viewTestDetails');
const viewCreateTest = require('./controllers/viewCreateTest');

const createTest = require('./controllers/createTest');

router.get('/', viewTestsOverview);
router.get('/create', viewCreateTest);
router.get('/:id', viewTestDetails);

router.post('/create', createTest);


module.exports = router;