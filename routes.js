const path = require('path');
const express = require('express');

const makeTestCalls = require('./makeTestCalls');

const router = express.Router();

const viewTestsOverview = require('./controllers/viewTestsOverview');
const viewTestDetails = require('./controllers/viewTestDetails');

router.get('/', viewTestsOverview);
router.get('/:id', viewTestDetails);

router.get('/create', function(req, res, next){
  res.render('createTest', {
    pageTitle: 'Start New Test',
    pageName: 'createTest',
    testData: doc
  })
});

router.post('/create', function(req, res, next){
  makeTestCalls();
  res.redirect('/');
})


module.exports = router;