module.exports = function(recordDatabaseId, url, totalQueries){
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
      url: url + '/product/_search',
      data: {
        "query": {
          "match": {
            "description": searchTerms[Math.floor(searchTermsLength * Math.random())]
          }
        }
      },
      headers: {'Content-Type':'application/json'},
      httpsAgent: agent 
    })
    .then(function(response) {
      queryResults.push({wasSuccessful: true, error: ''});
    })
    .catch(function(error) {
      queryResults.push({wasSuccessful: false, error: error});
      
    });
    queries++;
    if(queries === totalQueries){
      TestRecord.findOneAndUpdate(
        {_id: recordDatabaseId},
        {
          startedAt: startedAt,
          finishedAt: Date.now(),
          queries: queryResults
        },
        function(err, doc){
          if(err){
            console.log(err);
          }
        }
      )
    }
  }, 1, {iterations: totalQueries})
}