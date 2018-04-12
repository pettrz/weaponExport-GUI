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

function viewModel() {
    self = this;
    self.yearList = ko.observableArray();
     self.selectedYear = ko.observable({year:''});
  
     self.yearInfo = ko.computed(() =>{
       return self.selectedYear().year
     });
    self.weaponInfo = ko.computed(() => {
      return self.selectedYear().weapons
     });
      self.statsInfo = ko.computed(()=>{
       return self.selectedYear().info
      });
    
   }
  
   ko.applyBindings(viewModel, document.getElementById("viewmodel-statistics"));


function CreateStatistic(request) {
    var years = [];
    var weapons = [];
    var info = [];

    for (i = 0; i < request.length; i++) {
        years[i] = request[i].year.toString();
        weapons[i] = request[i].weapons;
    }

    window.years = years;

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
          responsive:true,
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
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 18,
                    stepSize: 2,
                    beginAtZero: true,
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
                    fontSize: 14,
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
        
        var firstPoint = chart.getElementAtEvent(canvas)[0];
        
        if (firstPoint) {
            var label = chart.data.labels[firstPoint._index];
            var value = chart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
            console.log(label);
            console.log(value);
            
            fillInfoBox(label, value, allYears[firstPoint._index].info);
        } 
    }
}

function fillInfoBox(year, weapons, info) {
    var introBox = jQuery('#chart-intro-text');
    var infoBox = jQuery('#chart-info-display');

    infoBox.find('#stat-year').html(year);
    infoBox.find('#stat-weapons').html(weapons);
    infoBox.find('#stat-info').html(info);

    introBox.hide();
    infoBox.show();
}