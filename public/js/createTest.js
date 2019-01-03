$('#submit-button').on('click', function(){
 
  let numConcurrentTests = $('#concurrent-tests').val();
  let url = $('#url').val();
  let description = $('#description').val();
  let totalQueries = $('#totalQueries').val();

  for(let i=1; i<=numConcurrentTests; i++){
    $.ajax({
      type: "POST",
      url: '/create',
      data: {
        url: url,
        description: numConcurrentTests > 1  ? description + ' (' + i + ')' : description,
        totalQueries: totalQueries
      },
      success: function(){console.log('/')},
      dataType: 'application/json'
    }).then(window.location.assign('/'));
  }
})