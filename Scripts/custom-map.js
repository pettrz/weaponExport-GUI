var FHstatus = {};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var xhttpCountries = JSON.parse(xhttp.response);
    
    
    for (var i = 0; i < xhttpCountries.length; i++) {  
      countryList.push(xhttpCountries[i]);
      FHstatus[xhttpCountries[i].code] = xhttpCountries[i].FHstatus;
      if(countryList()[i].code=='SE'){
        selectedCountry(countryList()[i]);
        
      }
    }
    
    CreateMapFreedom();
}}
xhttp.open('GET', 'http://localhost:1137/map', true);
xhttp.send();

function viewModelMap() {
  self = this;
  self.countryList = ko.observableArray();
  self.selectedCountry = ko.observable({code:''});

  self.searchTerm = ko.observable("");
  self.flag = ko.computed(function(){
    return 'flag-icon flag-icon-' + self.selectedCountry().code.toLowerCase()
  });
  self.statusInfo = ko.computed(function(){
    return self.selectedCountry().FHstatus
  });
  self.GPIInfo = ko.computed(function(){
    return self.selectedCountry().gpi + ' av 163'
  });
  self.linksInfo = ko.computed(function(){
    return self.selectedCountry().links
  });
  self.mapInfo = ko.computed(()=>{
    return self.selectedCountry().info
  });
  


}
ko.applyBindings(viewModelMap, document.getElementById("map"));

function viewModelSearch() {

  
  self.showList = function(){
    if (self.searchTerm() == '') {
      
      console.log('all countries returned')
    
      countryList().sort(function(a, b) { 
        var countryA = a.country.toUpperCase();
        var countryB = b.country.toUpperCase();
        if (countryA < countryB) {
          return -1;
        }
        if (countryA > countryB) {
          return 1;
        }
      });
      
      return self.countryList();
    } else {
      var countries = [];
      for (i = 0; i < countryList().length; i++) {
        if (countryList()[i].country.toUpperCase().includes(searchTerm().toUpperCase())) {
          countries[i] = countryList()[i];
          countries = countries.filter(function(n){ return n != undefined });
        }
      }
      if (countries.length == 0) {
        console.log('no match in list')
        return [{country: "Inget resultat hittades."}]
      } else {
        console.log('returned matches in list')
        return countries;
      }
    }
  };
  
}


ko.applyBindings(viewModelSearch, document.getElementById("dropdown-wrapper"));

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
              'Fri': '#75d187',
              'Delvis fri': '#efe599',
              'Ofri': '#b54d4d'
            },
            normalizeFunction: 'polynomial',
            legend: {
              title: 'Demokratisk status',
              vertical: true,
        }}]},
        onRegionOver: function(e, code) {
          if (!(code in FHstatus))
            e.preventDefault();
        },
        onRegionTipShow: function(e, el, code){
          if (!(code in FHstatus))
            e.preventDefault();
          else{
            for (i=0; i < countryList().length; i++)  {
              if(countryList()[i].code == code) {
                el.html(countryList()[i].country);
                //console.log(selectedCountry());
              }
            }
          }
        },
        onRegionClick: function(e, code) {
            for (i=0; i < countryList().length; i++)  {
              if(countryList()[i].code == code) {
                selectedCountry(countryList()[i]);
                console.log(selectedCountry());
                

                changeInfobox()
                if(expanded){
                  $('.buttonInfo').click();
                }
                
                
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

//Read more button - changing content on click
var expanded = false;

    function changeSize(){

        if(!expanded){
            document.getElementById('countryInfo').style.height = '375px';
            document.getElementById('countryInfo').style.overflow = 'auto';   
            document.getElementById('countryInfo').classList.remove("overflow-fade"); 
            document.getElementById('btnInfo').innerHTML='Visa mindre'; 
            document.getElementById('info').style.paddingRight='12px';  
            expanded = true;
            
         } 
         else {
            document.getElementById('countryInfo').style.height = '290px';
            document.getElementById('countryInfo').style.overflow = 'hidden';
            document.getElementById('countryInfo').classList.add("overflow-fade");   
            document.getElementById('btnInfo').innerHTML='Läs mer';  
            document.getElementById('info').style.paddingRight='20px';  

            expanded = false;       
    }
}

  //Cooldown on button
  $(".buttonInfo").on("click", function() {
    
    $("#countryInfo").scrollTop(0);

    $(".buttonInfo").toggleClass("btnDisabled")
    
    setTimeout(function(){
      $(".buttonInfo").toggleClass("btnDisabled")
    }, 350); 
    
  });

$(window).resize(function(){
 var width = $(window).width();
if(width <= 992){
  document.getElementById('btnInfo').style.display = 'static';
 $('#countryData').on('hide.bs.collapse', function (e) {
       e.preventDefault(e);
   })
  } else {
     document.getElementById('countryInfo').style.height = '290px';
     $('#countryData').unbind('hide.bs.collapse')
   }
 })
.resize();

function changeInfobox(){
  document.getElementById('infobox-before').style.display = 'none';
  document.getElementById('viewmodel-map').style.display = 'block';

  if(expanded){
    $('.buttonInfo').click();
  }
  
}