//STATISTICS
// var weapons ={};

//define request to get stats from database with api
var xhttpStats = new XMLHttpRequest();
xhttpStats.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var xhttpStatsList = JSON.parse(xhttpStats.response);

    for (var i = 0; i < xhttpStatsList.length; i++) {  
        yearList.push(xhttpStatsList[i]);
         //weapons[xhttpStatsList[i].year] = xhttpStatsList[i].weapons;
        // console.log(yearList()[i].year)
      }

    CreateStatistic(xhttpStatsList);
    }
}
xhttpStats.open('GET', 'http://localhost:1137/stats', true);
xhttpStats.send();

function viewModelStats() {
    self = this;
    self.yearList = ko.observableArray();
     self.selectedYear = ko.observable({code:''});
  
    //  self.yearInfo = ko.computed(() =>{
    //    return self.selectedYear().year
    //  });
    //  self.weaponInfo = ko.computed(() => {
    //   return self.selectedYear().weapons
    //  });
    //   self.statsInfo = ko.computed(()=>{
    //    return self.selectedYear().info
    //   });
      self.linksStats = ko.computed(function(){
        return self.selectedYear().statLinks
      });
      self.statFlag = ko.computed(function(){
          console.log(self.selectedYear());
        return 'flag-icon flag-icon-' + self.selectedYear().code.toLowerCase()
  });
    
   }
  
   ko.applyBindings(viewModelStats, document.getElementById("stats"));


function CreateStatistic(request) {
    var years = [];
    var weapons = [];
    var info = [];
    var statLinks = [];


    for (i = 0; i < request.length; i++) {
        years[i] = request[i].year.toString();
        weapons[i] = request[i].weapons;
    }

    window.years = years;
    //Calculates max value for weapons
    var maxWeapons = Math.round(Math.max.apply(Math, weapons));
    

    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: years,
            datasets: [{
                label: "Miljarder kr/år ",
                borderColor: 'rgb(255, 99, 132)',
                data: weapons,
                borderWidth: 5,
                // radius: 10,
                
                // backgroundColor: '#505050',
               
                //  hoverBorderWidth: 5,
                
            }]
        },
    
        // Configuration options go here
        options: {
            
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 7,
                    hoverRadius: 12,
                    mode: 'index',
                    backgroundColor: 'rgb(255, 99, 132)',
                }
            },
            legend: {
                display: false,
                // position: 'top',
                // labels: {
                //   fontColor: "white",
                //   fontSize: 18,
                // }
            },
            title: {
                display: true,
                text: 'Svensk vapenexportsumma',
                fontColor: 'white',
                fontSize: 16,
                horizontalAlign: "center",
            },
            hover: {
                
                onHover: function(e, el) {
                    $("#myChart").css("cursor", el[0] ? "pointer" : "default");
                }
                
            },         
            layout: {
                padding: {
                    left: 15,
                    right: 45,
                    top: 5,
                    bottom: 15
                }
            },
            
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 16,
                        stepSize: 2,
                        beginAtZero: true,
                        max: maxWeapons + 4,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Miljarder kr',
                        fontColor: "white",
                        fontSize: 20,
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 16,
                        stepSize: 4,
                        beginAtZero: true,
                    },
                    scaleLabel: {
                    display: true,
                    labelString: 'Årtal',
                    fontColor: "white",
                    fontSize: 20,
                    }
                }]
            }
        }
    });

    clickOnPoint(canvas, chart, request);
}

/**
 * Handles click event when point in chart is clicked, 
 * returns label and value of clicked point
 * 
 * @param {*} canvas 
 * @param {*} chart 
 */
function clickOnPoint(canvas, chart, allYears) {
    
    canvas.onclick = function(canvas) {
        
        // Scrolltop animation onclick
        $("#statsInfo").animate({
            scrollTop: 0
        }, 200);

        var firstPoint = chart.getElementAtEvent(canvas)[0];

        if (firstPoint) {
            //Converts years data to label (foreach points index)
            var label = chart.data.labels[firstPoint._index];
            //Converts weapons data to value (foreach points index)
            var value = chart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
            console.log(label);
            console.log(value);
            
            for (var i=0; i < yearList().length; i++)  {
                if(yearList()[i].year == label) {
                   selectedYear(yearList()[i]);
                   console.log("Selectedyear:" + selectedYear());
                 }
               }

            //Sends values to fill infobox
            fillInfoBox(label, value, allYears[firstPoint._index].info);
        } 
    }
}

//Sends values to infobox
function fillInfoBox(year, weapons, info) {
    //Swtiches infobox content
    var introBox = jQuery('#chart-intro-text');
    var infoBox = jQuery('#chart-info-display');

    //Retrives from database
    infoBox.find('#stat-year').html(year);
    infoBox.find('#stat-weapons').html(weapons);
    infoBox.find('#stat-info').html(info);
    // infoBox.find('#stat-links').html(links);

    introBox.hide();
    infoBox.show();
}
