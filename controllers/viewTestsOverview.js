module.exports = function(req, res, next){
  const moment = require('moment');
  const TestRecord = require('../models/TestRecord');
  TestRecord.find({}, function(err, docs){
    if(err){
      console.log(err);
      res.render('errorPage', {
        pageTitle: 'Database Error',
        pageName: 'errorPage',
        message: 'There was an error retrieving database records.'
      });
    }
    else{
      let tests = [];
      for(let doc of docs){
        let errorCount = 0;
        for(let query of doc.queries){
          if(!query.wasSuccessful){
            errorCount++;
          }
        }
        let newTest = {
          id: doc._id,
          description: doc.description,
          started: moment(doc.startedAt).format('llll'),
          finished: moment(doc.finishededAt).format('llll'),
          total: doc.queries.length,
          fails: errorCount
        }
        tests.push(newTest);
      }
      res.render('testsOverview', {
        pageTitle: 'Load Tests Overview',
        pageName: 'testsOverview',
        tests: tests
      })
    }
  });
}