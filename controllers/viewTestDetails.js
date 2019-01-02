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
      let uniqueErrors = [];
      let allErrors = [];
      for(let query of doc.queries){
        if(query.error){
          allErrors.push(query.error);
          if(uniqueErrors.indexOf(query.error) === -1){
            uniqueErrors.push(query.error);
          }
        }
      }
      res.render('testDetails', {
        pageTitle: 'Load Test Details',
        pageName: 'testDetails',
        uniqueErrors: uniqueErrors,
        allErrors: allErrors
      })
    }
  });
}