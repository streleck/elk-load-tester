var tableRows = document.getElementsByTagName('tr');

for(let row of tableRows){
  row.addEventListener('click', function(event){
    window.location = '/' + event.currentTarget.id;
  });
}