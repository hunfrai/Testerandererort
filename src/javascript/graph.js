// Hier steht der Code für den Graphen
function categories(){
    var list = [];
    for(var i = 0; i <= localStorage.getItem('zyklen'); i++){
        list.push("Jahr " + i);
    }
    return(list);

}

function sendChartDataToLOL() {

    var options = {
    
    chart: {
        width: "100%",
        background: 'white',
        height: 380,
        type: "bar",
        
        
    },
    plotOptions: {
        bar: {
            horizontal: false
        }
    },
    dataLabels: {
        enabled: false
    },

    stroke: {
        width: 1,
        colors: ["#fff"]
    },
    series: [],
    xaxis: {
        categories: []
    },
    legend: {
        position: "right",
        verticalAlign: "top",
        containerMargin: {
            left: 35,
            right: 60
        }
    },
    responsive: [
        {
            breakpoint: 1000,
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                legend: {
                    position: "bottom"
                }
            }
        }
    ]
    };
    var chartData = {
        categories: categories(),
        series: [
            { name: 'Eier', data: [] },
            { name: 'Raupen', data: [] },
            { name: 'Schmetterlinge', data: [] }
            
        ]
    };

    var chart = new ApexCharts(document.querySelector('#chart'), options);
    console.log("Funktionsstart grafik");
    if (chartData && chartData.categories && chartData.series) {
        options.series = chartData.series;
        options.xaxis.categories = chartData.categories;

        var chart = new ApexCharts(document.querySelector('#chart'), options);
        chart.render();
    } 

    var zyklen = localStorage.getItem("zyklen");
    for (var i = 0; i <= zyklen; i++) {
        chartData.series[0].data.push(parseInt(localStorage.getItem("eier" + i)));
        chartData.series[1].data.push(parseInt(localStorage.getItem("raupen" + i)));
        chartData.series[2].data.push(parseInt(localStorage.getItem("schmetterlinge" + i)));
        
    }
    
    localStorage.setItem("chartData", JSON.stringify(chartData));
    console.log("Funktionsende grafik");
}
