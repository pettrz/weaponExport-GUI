//STATISTICS

//define request to get stats from database with api
var xhttpStats = new XMLHttpRequest();
xhttpStats.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var xhttpStatsList = JSON.parse(xhttpStats.response);

    CreateStatistic(xhttpStatsList);
    }
}
xhttpStats.open('GET', 'http://localhost:1137/stats', true);
xhttpStats.send();

// function viewModel() {
//     self = this;
//     self.yearList = ko.observableArray();
//     self.selectedYear = ko.observable({year:''});
  
//     self.yearInfo = ko.computed(() =>{
//       return self.selectedYear().year
//     });
//     self.weaponInfo = ko.computed(() => {
//       return self.selectedCountry().weapons
//     });
//     // self.statsInfo = ko.computed(()=>{
//     //   return self.selectedCountry().info
//     // });
//     console.log(yearInfo);
    
//   }
  
//   ko.applyBindings(viewModel);


function CreateStatistic(request) {
    var years = [];
    var weapons = [];
    var info = [];

    for (i = 0; i < request.length; i++) {
        years[i] = request[i].year;
        weapons[i] = request[i].weapons;
        info[i] = request[i].info;
    }

    var canvas = document.getElementById("chart");
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

   

}
// canvas.onclick = function (evt) {
//     var points = chart.getPointsAtEvent(evt);
//     alert(chart.datasets[0].points.indexOf(points[0]));
// };

$("#chart").click(function(e) {
   console.log("Success");

//    document.getElementById('infobox-before2').style.display = 'none';
//    document.getElementById('infobox-after2').style.display = 'block';
   
//     for (i = 0; i < yearList().length; i++) {
//         if(yearList()[i].year == year)
//         {
//             selectedYear()(yearList()[i]);
//             console.log(selectedYear());
//         }
//     }


 });
