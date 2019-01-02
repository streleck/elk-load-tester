module.exports = function(req, res, next){  
  res.render('createTest', {
    pageTitle: 'Start New Test',
    pageName: 'createTest'
  })
}