all_data=window.all_data;

// Function to calculate counts for a given column
function getCountsForColumn(data, columnName) {
    const counts = {};
    data.forEach(entry => {
        const value = entry[columnName];
        if (counts[value]) {
            counts[value]++;
        } else {
            counts[value] = 1;
        }
    });

    // Convert counts to an array of [columnName, count] pairs
    const countsArray = Object.entries(counts);

    return countsArray;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomColorArray(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
      colors.push(getRandomColor());
  }
  return colors;
}



initialStateData=getCountsForColumn(all_data,'state');
initialProductData=getCountsForColumn(all_data,'Product');
initialProblemData=getCountsForColumn(all_data,'Problem');
initialSRSData=getCountsForColumn(all_data,'SRS');
initialSRMData=getCountsForColumn(all_data,'SRM');

console.log(initialSRSData);

(async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/in/in-all.topo.json'
    ).then(response => response.json());

    const statesDropdown = document.getElementById('states');

	// Create the initial map
    const map = Highcharts.mapChart('container', {
        chart: {
            map: topology
        },
        title: {
            text: 'StateWise Service Request',
            align: 'left',
            style: {
                fontSize: 13
            }
        },
        // Other map configuration options
		
        colorAxis: {
            min: 0
        },
        series: [{
            data: initialStateData,
            color: randomColorArray(initialStateData.length),
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        dataLabels: {
            enabled: false,
                format: '{point.name}'
            }
        }]
    });

    const column = Highcharts.chart('column-chart', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Top 10 serviced products',
          align: 'left',
              style: {
              fontSize:13
                  }
        },
        xAxis: {
          categories: initialProductData.map(item => item[0]),
          crosshair: true,
          accessibility: {
            description: 'Products'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Cases'
          }
        },
        tooltip: {
          valueSuffix: ' numbers'
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Products',
            data: initialProductData.map(item => item[1])
          }
        ]
      });
      
      
      
      const bar = Highcharts.chart('bar-chart', {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Top Problems',
          align: 'left',
          style:{
          fontSize:13
          }
        },
        xAxis: {
          categories: initialProblemData.map(item => item[0]),
          title: {
            text: null
          },
          gridLineWidth: 1,
          lineWidth: 0
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Cases',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          },
          gridLineWidth: 0
        },
        tooltip: {
          valueSuffix: null
        },
        plotOptions: {
          bar: {
            borderRadius: '50%',
            dataLabels: {
              enabled: true
            },
            groupPadding: 0.1
          }
        },
       
        credits: {
          enabled: false
        },
        series: [{
          name: 'Problems',
          data: initialProblemData.map(item => item[1])
        }]
      });
      
      
      
      
      // Data retrieved from https://netmarketshare.com
      const pie = Highcharts.chart('pie-chart', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Service request status',
          align: 'left',
          style:{
          fontSize:13
          }
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: initialSRSData
        }]
      });
      
      
      
      const hist = Highcharts.chart('hist', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Resolution',
          align: 'left',
          style:{
          fontSize:13
          }
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
          }
        },
        series: [{
          name: 'Data',
          data: [4990, 7150, 10640, 12920, 14400, 17600, 13560, 12401, 9560, 5440]
      
        }]
      });
      
      
      
      
      const tree = Highcharts.chart('tree', {
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'stripes',
          alternateStartingDirection: true,
          borderColor: '#fff',
          borderRadius: 6,
          borderWidth: 2,
          dataLabels: {
            style: {
              textOutline: 'none'
            }
          },
          levels: [{
            level: 1,
            layoutAlgorithm: 'sliceAndDice',
            dataLabels: {
              enabled: true,
              align: 'left',
              verticalAlign: 'top',
              style: {
                fontSize: '15px',
                fontWeight: 'bold'
              }
            }
          }],
          data: initialSRMData
        }],
        title: {
          text: 'Service Requests Mode',
          align: 'left',
          style: {
          fontSize:13
          }
        },
        tooltip: {
          useHTML: true,
          pointFormat:
            '{point.value}'
        }
      });


    document.getElementById('goButton').addEventListener('click', () => {
        const statesDropdown = document.getElementById('states');
        const productDropdown = document.getElementById('products');
        const problemDropdown = document.getElementById('problems');
        const statusDropdown = document.getElementById('Status');
        const modeDropdown = document.getElementById('Mode');

    
        const selectedState = statesDropdown.value;
        const selectedProduct = productDropdown.value;
        const selectedProblem = problemDropdown.value;
        const selectedSRS = statusDropdown.value;
        const selectedSRM = modeDropdown.value;


        // Apply filters sequentially
        let filteredData = all_data;

        // Filter based on selectedState
        if (selectedState !== 'all-state') {
            filteredData = filteredData.filter(entry => entry.state === selectedState);
        }

        // Filter based on selectedProduct
        if (selectedProduct !== 'all-product') {
            filteredData = filteredData.filter(entry => entry.Product === selectedProduct);
        }

        // Filter based on selectedProblem
        if (selectedProblem !== 'all-problem') {
            filteredData = filteredData.filter(entry => entry.Problem === selectedProblem);
        }

        // Filter based on selectedSRS
        if (selectedSRS !== 'all-srs') {
            filteredData = filteredData.filter(entry => entry.SRS === selectedSRS);
        }

        // Filter based on selectedSRM
        if (selectedSRM !== 'all-srm') {
            filteredData = filteredData.filter(entry => entry.SRM === selectedSRM);
        }



        // Example: Calculate counts for the 'state' column
        const stateCounts = getCountsForColumn(filteredData, 'state');
        //console.log('State Counts:', stateCounts);

        // Example: Calculate counts for the 'Problem' column
        const problemCounts = getCountsForColumn(filteredData, 'Problem');
        //console.log('Problem Counts:', problemCounts);

        // Example: Calculate counts for the 'Product' column
        const productCounts = getCountsForColumn(filteredData, 'Product');
        //console.log('Product Counts:', productCounts);

        // Example: Calculate counts for the 'Problem' column
        const srsCounts = getCountsForColumn(filteredData, 'SRS');
        //console.log('SRS Counts:', srsCounts);

        // Example: Calculate counts for the 'state' column
        const srmCounts = getCountsForColumn(filteredData, 'SRM');
        //console.log('SRM Counts:', srmCounts);

        updateMap(selectedState,stateCounts)


        function updateMap() {
            map.update({
                series: [{
                    data: stateCounts
                }]
            });
            column.update({
                series: [{
                    data: productCounts
                }]
            });
            bar.update({
                series: [{
                    data: problemCounts
                }]
            });
            pie.update({
                series: [{
                    data: srsCounts
                }]
            });
            tree.update({
                series: [{
                    data: srmCounts
                }]
            });
        };
    });
})()