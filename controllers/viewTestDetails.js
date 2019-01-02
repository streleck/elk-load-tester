module.exports = function(req, res, next){  
  const TestRecord = require('../models/TestRecord');  
  TestRecord.findOne({_id: req.params.id}, function(err, doc){
    if(err){
      console.log(err);
      res.render('errorPage', {
        pageTitle: 'Database Error',
        pageName: 'errorPage',
        message: 'There was an error retrieving database records.'
      });
    }
    else{
      let resultCount = {
        success: 0
      }
      for(let query of doc.queries){
        if(query.error){
          let resultTypes = Object.keys(resultCount);
          if(resultTypes.indexOf(query.error) === -1){
            resultCount[query.error] = 1;
          }
          else {
            resultCount[query.error]++;
          }
        }
        else {
          resultCount.success++;
        }
      }
      res.render('testDetails', {
        pageTitle: 'Load Test Details',
        pageName: 'testDetails',
        timeElapsed: doc.finishedAt - doc.startedAt,
        resultCount: resultCount
      })
    }
  });
}