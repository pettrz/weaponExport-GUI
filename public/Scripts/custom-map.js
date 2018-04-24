var FHstatus = {};

//define request to get mapcontent from database with api
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var xhttpCountries = JSON.parse(xhttp.response);  
    
    //creates countrylist from database
    for (var i = 0; i < xhttpCountries.length; i++) {  
      countryList.push(xhttpCountries[i]);
      FHstatus[xhttpCountries[i].code] = xhttpCountries[i].FHstatus;
    }
    
    //runs map function
    CreateMapFreedom();
}}
xhttp.open('GET', 'http://localhost:1137/map', true);
xhttp.send();

//viewmodel for map
//viewmodel for statistics - creates variables for clicked element
function viewModelMap() {
  self = this;
  self.countryList = ko.observableArray();
  self.selectedCountry = ko.observable({code:''});

  self.mapFlag = ko.computed(function(){
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
  self.mapInfo = ko.computed(function(){
    return self.selectedCountry().info
  });
}
//sends map viewmodel to map
ko.applyBindings(viewModelMap, document.getElementById("map"));

//viewmodel for searchbox
function viewModelSearch() {
    self.searchTerm = ko.observable("");
    self.showList = function(){
    if (self.searchTerm() == '') {
      console.log('all countries returned')
      
      //sorts countrylist in alphabetical order
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
        //compares search with countrylist
        for (i = 0; i < countryList().length; i++) {
          if (countryList()[i].country.toUpperCase().includes(searchTerm().toUpperCase())) {
            countries[i] = countryList()[i];
            countries = countries.filter(function(n){ return n != undefined });
          }
        }
        //returns countries
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

//sends search viewmodel to dropdown-wrapper
ko.applyBindings(viewModelSearch, document.getElementById("dropdown-wrapper"));

//creates worldmap
var $container = $('#world-map');
function CreateMapFreedom() {
  var map = $(function(){
    $('#world-map').vectorMap({
        container: '',
        map: 'world_mill',
        series: {
          regions: [{
            values: FHstatus,
            scale: {
              'Fri': '#75d187',
              'Delvis fri': '#efe599',
              'Inte fri': '#b54d4d'
            },
            normalizeFunction: 'polynomial',
            legend: {
              title: 'Demokratisk status',
              vertical: true,
        }}]},
        //hover over country
        onRegionOver: function(e, code) {
          if (!(code in FHstatus))
            e.preventDefault();
        },
        //tooltip for country
        onRegionTipShow: function(e, el, code){
          if (!(code in FHstatus))
            e.preventDefault();
          else{
            for (i=0; i < countryList().length; i++)  {
              if(countryList()[i].code == code) {
                el.html(countryList()[i].country);
              }
            }
          }
        },
        //click on country
        onRegionClick: function(e, code) {
            for (i=0; i < countryList().length; i++)  {
              if(countryList()[i].code == code) {
                selectedCountry(countryList()[i]);
                console.log(selectedCountry());
                changeInfobox()
                if(expanded){
                  $('.buttonInfo').click();
                }
              }
            }
        },
    });
  });
}

//read more button - changing content on click
var expanded = false;
    function changeSize(){
        if(!expanded){
            document.getElementById('countryInfo').style.height = '390px';
            document.getElementById('countryInfo').style.overflow = 'auto';   
            document.getElementById('countryInfo').classList.remove("overflow-fade"); 
            document.getElementById('btnInfo').innerHTML='Visa mindre'; 
            document.getElementById('info').style.paddingRight='12px';  
            expanded = true;
         } 
         else {
            document.getElementById('countryInfo').style.height = '270px';
            document.getElementById('countryInfo').style.overflow = 'hidden';
            document.getElementById('countryInfo').classList.add("overflow-fade");   
            document.getElementById('btnInfo').innerHTML='Läs mer';  
            document.getElementById('info').style.paddingRight='20px';  
            expanded = false;       
    }
}

  //cooldown on button
  $(".buttonInfo").on("click", function() {
    //on country click scrolls to top
    $("#countryInfo").scrollTop(0);
    //disable button
    $(".buttonInfo").toggleClass("btnDisabled")
    //enable button
    setTimeout(function(){
      $(".buttonInfo").toggleClass("btnDisabled")
    }, 350);   
  });

//responsive infobox toggling
$(window).resize(function(){
 var width = $(window).width();
if(width <= 992){
  if(expanded){
    $("#countryData").collapse('show');
  }
  $('#countryData').on('hide.bs.collapse', function (e) {
       e.preventDefault(e);
  })
  } else {
     $('#countryData').unbind('hide.bs.collapse')
     if(expanded){
      $("#countryData").collapse('hide');
    }
   }
 })
.resize();

//changes infobox from startpage to country
function changeInfobox(){
  document.getElementById('infobox-before').style.display = 'none';
  document.getElementById('viewmodel-map').style.display = 'block';

  if(expanded){
    $('.buttonInfo').click();
  }
  
}

// hide search on other tabs than map
$('.nav-item a').click(function (e) {
  e.preventDefault();

  if($(this).attr('href')=='#map'){
      $('#dropdown-wrapper').show();
  }
  else{
      $('#dropdown-wrapper').hide();
  }
  $(this).tab('show');
}); 

// map resize on tab click
$('.nav-item a[href^="#map"]').click(function() {
    $container.resize();
});