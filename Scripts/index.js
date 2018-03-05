var countries;
var weapons = {'AF':20, 'US':70};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    countries = JSON.parse(xhttp.response);
    console.log(xhttp.response);
    console.log(JSON.parse(xhttp.response));
    
    for (var i = 0; i < countries.length; i++) {  
      weapons[countries[i].code] = Number(countries[i].weapons);
    } 
    CreateMap();
    console.log(weapons); }}
xhttp.open('GET', 'http://localhost:1137/map', true);
xhttp.send();

//  var guns = {
//    "AF": 50,
//    "NO": 100,
//    "DZ": 150,
//    "US": 200,
// };
// console.log(guns);

function CreateMap() {
  var map = $(function(){
    $('#world-map').vectorMap({
        map: 'world_mill',
        series: {
          regions: [{
            // values: guns,
            values: weapons,
            scale: ['#64ff64', '#ff6464'],
            normalizeFunction: 'polynomial',
            legend: {
              title: 'Weapons',
              vertical: false,
        }}]},
        onRegionOver(e, code) {
          if (!(code in weapons))
            e.preventDefault();
        },
        onRegionTipShow: function(e, el, code){
          if (!(code in weapons))
            e.preventDefault();
        },
        onRegionClick(e, code) {
            for (i=0; i < countries.length; i++)  {
              if(countries[i].code == code) {
                var country = countries[i];
                console.log(country);
                document.getElementById('country').innerHTML = country.country;
                document.getElementById('info').innerHTML = country.info;
                document.getElementById('flag').className = 'flag-icon flag-icon-' + code.toLowerCase();
                document.getElementById('weapons').innerHTML = 'Weapons: ' + country.weapons + 'k / year';
              }
            }
        },
    });
  });
}