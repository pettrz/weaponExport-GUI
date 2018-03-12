var FHstatus = {};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var xhttpCountries = JSON.parse(xhttp.response);
    
    
    for (var i = 0; i < xhttpCountries.length; i++) {  
      countryList.push(xhttpCountries[i]);
      FHstatus[xhttpCountries[i].code] = xhttpCountries[i].FHstatus;
    }
    CreateMapFreedom();
}}
xhttp.open('GET', 'http://localhost:1137/map', true);
xhttp.send();

function viewModel() {
  self = this;
  self.countryList = ko.observableArray();
  self.selectedCountry = ko.observable({
    country: 'Sweden',
    code: 'SE',
    FHstatus: 'Partly Free',
    gpi: '10',
    info: 'Svenska vapen finns över hela världen. 2014 sålde Sverige krigsmateriel till 54 länder. Svenska vapen finns över hela världen. 2014 sålde Sverige krigsmateriel till 54 länder. Svenska vapen finns över hela världen. 2014 sålde Sverige krigsmateriel till 54 länder. Svenska vapen finns över hela världen. 2014 sålde Sverige krigsmateriel till 54 länder. Svenska vapen finns över hela världen. 2014 sålde Sverige krigsmateriel till 54 länder. Svenska vapen finns över hela världen. 2014 sålde Sverige krigsmateriel till 54 länder. Svenska vapen finns över hela världen. 2014 sålde Sverige krigsmateriel till 54 länder. Svenska vapen finns över hela världen. 2014 sålde Sverige krigsmateriel till 54 länder.',
    links: 'This is where links show up'
  });
  self.searchTerm = ko.observable("");
  self.flag = ko.computed(() => {
    return 'flag-icon flag-icon-' + self.selectedCountry().code.toLowerCase()
  });
  self.statusInfo = ko.computed(() =>{
    return self.selectedCountry().FHstatus
  });
  self.GPIInfo = ko.computed(() => {
    return self.selectedCountry().gpi + ' av 162'
  });
  self.showList = () => {
    if (self.searchTerm() == '') {
      
      console.log('all countries returned')
      return self.countryList();
    } else {
      var countries = [];
      for (i = 0; i < countryList().length; i++) {
        if (countryList()[i].country.includes(searchTerm())) {
          countries[i] = countryList()[i];
        }
      }
      if (countries.length == 0) {
        console.log('no match in list')
        return [{country: "Sorry, we couldn't find any countries that match your search!"}]
      } else {
        console.log('returned matches in list')
        return countries;
      }
    }
  };
}

ko.applyBindings(viewModel);

// function CreateMapWeapons() {
//   var map = $(function(){
//     $('#world-map').vectorMap({
//         map: 'world_mill',
//         series: {
//           regions: [{
//             values: weapons,
//             scale: ['#f9bbbb', '#ad1414'],
//             normalizeFunction: 'polynomial',
//             legend: {
//               title: 'Status ' + "<br>" +'Freedom House',
//               vertical: true,
//         }}]},
//         onRegionOver(e, code) {
//           if (!(code in weapons))
//             e.preventDefault();
//         },
//         onRegionTipShow: function(e, el, code){
//           if (!(code in weapons))
//             e.preventDefault();
//         },
//         onRegionClick(e, code) {
//             for (i=0; i < countryList().length; i++)  {
//               if(countryList()[i].code == code) {
//                 selectedCountry(countryList()[i]);
//                 console.log(selectedCountry());innerHTML = country.gpi + ' av 162';
//               }
//             }
//         },
//     });
//   });
// }

function CreateMapFreedom() {
  var map = $(function(){
    $('#world-map').vectorMap({
        map: 'world_mill',
        series: {
          regions: [{
            // values: guns,
            values: FHstatus,
            scale: {
              'Free': '#75d187',
              'Partly Free': '#efe599',
              'Not Free': '#b54d4d'
            },
            normalizeFunction: 'polynomial',
            legend: {
              title: 'Status ' + "<br>" +'Freedom House',
              vertical: true,
        }}]},
        onRegionOver(e, code) {
          if (!(code in FHstatus))
            e.preventDefault();
        },
        onRegionTipShow: function(e, el, code){
          if (!(code in FHstatus))
            e.preventDefault();
        },
        onRegionClick(e, code) {
            for (i=0; i < countryList().length; i++)  {
              if(countryList()[i].code == code) {
                selectedCountry(countryList()[i]);
                console.log(selectedCountry());
                // document.getElementById('country').innerHTML = country.country;
                // document.getElementById('info').innerHTML = country.info;
                // document.getElementById('flag').className = 'flag-icon flag-icon-' + code.toLowerCase();
                // document.getElementById('weaponInfo').innerHTML = country.FHstatus + ' / år';
                // document.getElementById('GPIInfo').innerHTML = country.gpi + ' av 162';
              }
            }
        },
    });
  });
}