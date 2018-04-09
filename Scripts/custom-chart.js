//STATISTICS
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
        datasets: [{
            label: "Miljarder kr/år ",
            borderColor: 'rgb(255, 99, 132)',
            data: [3.1, 3.4, 6.5, 7.3, 8.6, 10.4, 9.6, 12.7, 13.5, 13.7, 13.9, 9.8, 11.9, 8.0],
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