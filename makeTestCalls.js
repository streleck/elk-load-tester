module.exports = function(url, description, totalQueries){
  const axios = require('axios');
  const https = require('https');
  var TestRecord = require('./models/TestRecord');
  const interval = require('interval-promise');

  // To allow http requests
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });

  const searchTerms = require('./searchTerms');
  const searchTermsLength = searchTerms.length;
  const startedAt = Date.now();
  
  let queries = 0;
  let queryResults = [];

  interval(async () => {
    await axios({
      method:'post',
      url: url + '/product' + '1' + '/_search',
      data: {
        "query": {
          "match": {
            "description": searchTerms[4]
          }
        }
      },
      headers: {'Content-Type':'application/json'},
      httpsAgent: agent 
    })
    .then(function(response) {
      console.log('good');
      queryResults.push({wasSuccessful: true, error: ''});
    })
    .catch(function(error) {
      console.log('bad');
      queryResults.push({wasSuccessful: true, error: error});
      
    });
    queries++;
    if(queries === totalQueries){
      console.log(queryResults);
      var newTestRecord = new TestRecord({
        description: description,
        url: url,
        startedAt: startedAt,
        finishedAt: Date.now(),
        queries: queryResults
      });
      newTestRecord.save(function(err, doc) {
        if(err){
          console.log('ERROR WRITING TO DATABASE!!! \n', err);
        }
        else{
          console.log(doc);
        }
      });
    }
  }, 1, {iterations: totalQueries})
}