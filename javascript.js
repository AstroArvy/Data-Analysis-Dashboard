all_data=window.all_data;
console.log(window.all_data[0]);

// Create an object to store the counts for each state
const stateCounts = {};

// Count the occurrences of each state
for (const entry of all_data) {
    const { state } = entry;
    if (stateCounts[state]) {
        stateCounts[state]++;
    } else {
        stateCounts[state] = 1;
    }
}

// Convert the state counts into the desired format (array of arrays)
const formattedStateCounts = Object.entries(stateCounts).map(([state, count], index) => [state, count]);

// Sort the array based on state codes if needed
formattedStateCounts.sort((a, b) => a[0].localeCompare(b[0]));

// Output the result
console.log(formattedStateCounts);

(async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/in/in-all.topo.json'
    ).then(response => response.json());

    const mapContainer = document.getElementById('map-container');
    const statesDropdown = document.getElementById('states');
    
    const data = formattedStateCounts;
	
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
            data: data,
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

	statesDropdown.addEventListener('change', (event) => {
		const selectedState = event.target.value;
		console.log(statesDropdown.value);
		if (statesDropdown.value === 'all-state') {
			// Show all data on the map
			updateMapForAllData();
		} else {
			// Show data for the selected state
			const selectedData = data.find(item => item[0] === selectedState)[1];
			updateMap(selectedState, selectedData);
		}
	});

    // Function to update the map with selected data
    function updateMap(selectedState, selectedData) {
        map.update({
            series: [{
                data: [
                    [selectedState, selectedData]
                ]
            }]
        });
    }
	
	function updateMapForAllData() {
		map.update({
            series: [{
                data: data,
            }]
        });
    }
    
}
	
)();




    



Highcharts.chart('column-chart', {
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
    categories: ['UPS EB', 'EPS E2', 'Stabilizer', 'Jumbo', 'Online UPS', 'UPS XP'],
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
      name: 'complaints',
      data: [40629, 26000, 10700, 6830, 27500, 14500]
    },
    {
      name: 'feedbacks',
      data: [5108, 13600, 5500, 14100, 10718, 7700]
    }
  ]
});



Highcharts.chart('bar-chart', {
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
    categories: ['Charging Problem', 'No Output Voltage', 'Load Problem', 'Switch Problem', 'BEEP sound', 'No Display', 'Backup Problem'],
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
    valueSuffix: ' thousands'
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
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -20,
    y: 280,
    floating: true,
    borderWidth: 1,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'complaints',
    data: [814, 841, 3714, 726, 1125, 987, 756]
  }, {
    name: 'Feedbacks',
    data: [1276, 1007, 4561, 746, 1010, 870, 767]
  }]
});




// Data retrieved from https://netmarketshare.com
Highcharts.chart('pie-chart', {
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
    data: [{
      name: 'Set Registered',
      y: 70.67,
      sliced: true,
      selected: true
    }, {
      name: 'Assigned',
      y: 14.77
    },  {
      name: 'Spare Parts Unavailable',
      y: 4.86
    }, {
      name: 'Safari',
      y: 2.63
    }, {
      name: 'Estimation Pending Approval',
      y: 1.53
    },  {
      name: 'Pending Delivery',
      y: 1.40
    }, {
      name: 'Pending',
      y: 0.84
    }, {
      name: 'Closed/Cancel',
      y: 0.51
    }, {
      name: 'Installation Done',
      y: 2.6
    }]
  }]
});



Highcharts.chart('hist', {
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




Highcharts.chart('tree', {
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
    data: [{
      id: 'A',
      color: '#50FFB1'
    }, {
      id: 'B',
      color: '#F5FDEF'
    }, {
      id: 'C',
      color: '#A09FA8'
    }, {
      id: 'D',
      color: '#E7ECEF'
    }, {
      id: 'E',
      color: '#A9B4C2'
    },{     
      id: 'F',
      color: '#A9B4C2'
	},{     
      id: 'G',
      color: '#A9B4C2'
	},{
      name: 'Call',
      parent: 'A',
      value: 25506
    },{
      name: 'Dealer',
      parent: 'B',
      value: 13229
    }, {
      name: 'Call center',
      parent: 'C',
      value: 12064
    }, {
      name: 'Customer',
      parent: 'D',
      value: 10473
    }, {
      name: 'Whatsapp',
      parent: 'E',
      value: 8576
    }, {
      name: 'Email',
      parent: 'F',
      value: 22768
    }, {
      name: 'Carry in',
      parent: 'G',
      value: 2148
    }]
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
