module.exports = function(req, res, next){  
  const makeTestCalls = require('../makeTestCalls');
  makeTestCalls(req.body.url, req.body.description, parseInt(req.body.totalQueries));
  res.redirect('/');
}