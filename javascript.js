const apiEndpoint = 'http://localhost:3000/api/data';

const jsonEndpoint = 'http://localhost:3000/api/mapdata'

fetch(apiEndpoint)
  .then((response) => response.json())
  .then((data) => {
    const all_data = data;
    

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

function getCountsByMonth(all_data) {
  const monthCounts = {};

  all_data.forEach(entry => {
    const date = new Date(entry.date);
    const month = date.toLocaleString('default', { month: 'long' });

    if (monthCounts[month]) {
      monthCounts[month]++;
    } else {
      monthCounts[month] = 1;
    }
  });

  const monthCountsArray = Object.entries(monthCounts);

  // Custom sorting function to order months
  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  monthCountsArray.sort((a, b) => {
    const monthA = a[0];
    const monthB = b[0];
    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
  });

  return monthCountsArray;
}

initialDateData=getCountsForColumn(all_data,'date');
initialStateData=getCountsForColumn(all_data,'state');
initialProductData=getCountsForColumn(all_data,'product');
initialProblemData=getCountsForColumn(all_data,'problem');
initialSRSData=getCountsForColumn(all_data,'srs');
initialSRMData=getCountsForColumn(all_data,'srm');
initialMonthsData=getCountsByMonth(all_data);

//console.log(initialMonthsData);

function findMinimumCount(dataArray) {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    // Handle invalid input gracefully, e.g., return an error or throw an exception
    return null;
  }

  // Use Array.reduce to find the minimum count
  const minValue = dataArray.reduce((min, currentValue) => {
    const count = currentValue[1];
    return count < min ? count : min;
  }, dataArray[0][1]);

  return minValue;
}

(async () => {
    const topology = await fetch(
      jsonEndpoint
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
            min: findMinimumCount(initialStateData)
        },
        series: [{
            data: initialStateData,
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
            borderWidth: 0,
            colorByPoint: true
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
            groupPadding: 0.1,
            colorByPoint: true
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
            shadow: false,
            colorByPoint: true
          }
        },
        series: [{
          name: 'Monthly Requests',
          data: initialMonthsData
      
        }]
      });
      
      
      
      
      const tree = Highcharts.chart('tree', {
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'squarified',
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
            layoutAlgorithm: 'squarified',
            colorByPoint: true,
            hover:{enabled:true},
            dataLabels: {
              enabled: true,
              align: 'left',
              verticalAlign: 'top',
              style: {
                fontSize: '15px',
                fontWeight: 'bold',
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
        const iniDateDropdown = document.getElementById("date1");
        const finDateDropdown = document.getElementById("date2");

        const statesDropdown = document.getElementById('states');
        const productDropdown = document.getElementById('products');
        const problemDropdown = document.getElementById('problems');
        const statusDropdown = document.getElementById('Status');
        const modeDropdown = document.getElementById('Mode');

        const startDate = iniDateDropdown.value;
        const endDate = finDateDropdown.value;

        const selectedState = statesDropdown.value;
        const selectedProduct = productDropdown.value;
        const selectedProblem = problemDropdown.value;
        const selectedSRS = statusDropdown.value;
        const selectedSRM = modeDropdown.value;
        console.log(startDate)

        // Apply filters sequentially
        let filteredData = all_data;

        //Filter based on date range
        if (startDate !== '' && endDate !== '') {
          // Both initial and final dates are provided
          filteredData = filteredData.filter(entry => {
            const dateInArray = entry.date; // Assuming your date is in entry.date
            const dateObj = new Date(dateInArray);
            return dateObj >= new Date(startDate) && dateObj <= new Date(endDate);
          });
        } else if (startDate !== '') {
          // Only initial date is provided
          filteredData = filteredData.filter(entry => {
            const dateInArray = entry.date; // Assuming your date is in entry.date
            const dateObj = new Date(dateInArray);
            const today = new Date();
            return dateObj >= new Date(startDate) && dateObj <= today;
          });
        } else if (endDate !== '') {
          // Only final date is provided
          filteredData = filteredData.filter(entry => {
            const dateInArray = entry.date; // Assuming your date is in entry.date
            const dateObj = new Date(dateInArray);
            return dateObj <= new Date(endDate);
          });
}



        // Filter based on selectedState
        if (selectedState !== 'all-state') {
            filteredData = filteredData.filter(entry => entry.state === selectedState);
        }

        // Filter based on selectedProduct
        if (selectedProduct !== 'all-product') {
            filteredData = filteredData.filter(entry => entry.product === selectedProduct);
        }

        // Filter based on selectedProblem
        if (selectedProblem !== 'all-problem') {
            filteredData = filteredData.filter(entry => entry.problem === selectedProblem);
        }

        // Filter based on selectedSRS
        if (selectedSRS !== 'all-srs') {
            filteredData = filteredData.filter(entry => entry.srs === selectedSRS);
        }

        // Filter based on selectedSRM
        if (selectedSRM !== 'all-srm') {
            filteredData = filteredData.filter(entry => entry.srm === selectedSRM);
        }



        // Example: Calculate counts for the 'state' column
        const stateCounts = getCountsForColumn(filteredData, 'state');
        //console.log('State Counts:', stateCounts);

        // Example: Calculate counts for the 'Problem' column
        const problemCounts = getCountsForColumn(filteredData, 'problem');
        //console.log('Problem Counts:', problemCounts);

        // Example: Calculate counts for the 'Product' column
        const productCounts = getCountsForColumn(filteredData, 'product');
        //console.log('Product Counts:', productCounts);

        // Example: Calculate counts for the 'Problem' column
        const srsCounts = getCountsForColumn(filteredData, 'srs');
        //console.log('SRS Counts:', srsCounts);

        // Example: Calculate counts for the 'state' column
        const srmCounts = getCountsForColumn(filteredData, 'srm');
        //console.log('SRM Counts:', srmCounts);

        const updateMonthCounts = getCountsByMonth(filteredData)
        //console.log(updateMonthCounts)

        updateMap(selectedState,stateCounts)


        function updateMap() {
            map.update({
              colorAxis: {
                min: findMinimumCount(stateCounts)
            },
                series: [{
                    data: stateCounts
                }]
            });
            column.update({
              xAxis: {
                categories: productCounts.map(item => item[0]),
              },
                series: [{
                    data: productCounts
                }]
            });
            bar.update({
              xAxis: {
                categories: problemCounts.map(item => item[0]),
              },
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
            hist.update({
              series: [{
                  data: updateMonthCounts
              }]
          });
        };
    })
  })();
})
  .catch((error) => {
    console.error('Error fetching data: ' + error);
    });