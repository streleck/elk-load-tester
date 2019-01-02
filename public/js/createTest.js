$('#press-button').on('click', function(){
  for(let i=0; i<200; i++){
    console.log('going!');
    $.ajax({
      type: "POST",
      url: '/create',
      data: {
        url: 'https://e33d2ea501994214:b4b699b082a2f685@cjpoeiifd000101m3i4tz8dm5.es.vizion.ai',
        description: 'trial-1-' + i,
        totalQueries: 200
      },
      //success: success,
      dataType: 'application/json'
    });
  }
})