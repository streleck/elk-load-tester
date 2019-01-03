module.exports = function(req, res, next){  
  const makeTestCalls = require('../makeTestCalls');
  var TestRecord = require('../models/TestRecord');

  var newTestRecord = new TestRecord({
    description: req.body.description,
    url: req.body.url
  });
  newTestRecord.save(function(err, doc) {
    if(err){
      console.log('ERROR WRITING TO DATABASE!!! \n', err);
      res.render('errorPage', {
        pageTitle: 'Database Error',
        pageName: 'errorPage',
        message: 'There was an error writing to database. Testing aborted.'
      });
    }
    else{
      makeTestCalls(doc._id, req.body.url, parseInt(req.body.totalQueries));
      res.status(200).send('hi');
    }
  });
}