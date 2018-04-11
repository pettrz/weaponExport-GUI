//STATISTICS

//define request to get stats from database with api
var xhttpStats = new XMLHttpRequest();
xhttpStats.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var xhttpStatsList = JSON.parse(xhttpStats.response);

    CreateStatistic(xhttpStatsList);
}}
xhttpStats.open('GET', 'http://localhost:1137/stats', true);
xhttpStats.send();


function CreateStatistic(request) {
    var years = [];
    var weapons = [];
    var info = [];

    for (i = 0; i < request.length; i++) {
        years[i] = request[i].year;
        weapons[i] = request[i].weapons;
        info[i] = request[i].info;
    }

    var ctx = document.getElementById('myChart').getContext('2d');
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
