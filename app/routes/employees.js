import Ember from 'ember';

export default Ember.Route.extend({
  model() {

    return $.get('/data/employees.csv')
            .then((data) => {
              let jsonData = csvJSON(data);
              
              // Display Employee Geospatial View:
              // To avoid `document.getElementById('map-canvas')`
              // return 'null' delay it by 100 milliseconds
              setTimeout(() => {
                createGeoView(jsonData);
              }, 100);
              
              return jsonData;
            });
  }
});


function csvJSON (csv) {
  let lines=csv.split("\n");
  let result = [];
  let headers=lines[0].split(",");
  for(let i=1;i<lines.length;i++){
    let obj = {};
    let currentline=lines[i].split(",");

    for(let j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result; //JavaScript object
}

function createGeoView (jsonData) {
  let boston = 0;
  let sanfran = 0;
  let orlando = 0;
  let chicago = 0;

  jsonData.forEach((employee) => {
    (employee.location === 'Boston') ? boston++ : null;
    (employee.location === 'San Francisco') ? sanfran++ : null;
    (employee.location === 'Chicago') ? chicago++ : null;
    (employee.location === 'Orlando') ? orlando++ : null;
  });

  // google.charts.load('current', {'packages': ['geomap', 'corechart']});
  google.charts.setOnLoadCallback(drawMap);
  google.charts.setOnLoadCallback(drawChart);


  // Draw Geographic Map Chart of Employees
  function drawMap() {
    var data = google.visualization.arrayToDataTable([
      ['City', 'Number of Employees'],
      ['Boston', boston],
      ['Orlando', orlando],
      ['Chicago', chicago],
      ['San Francisco', sanfran]
    ]);

    var options = {};
    options['region'] = 'US';
    options['colors'] = [0xFF8747, 0xFFB581, 0xc06000];
    options['dataMode'] = 'markers';
    var geomap = new google.visualization.GeoMap(document.getElementById('map-canvas'));
    geomap.draw(data, options);
  }

  // Draw Donut Chart of Employees
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['City', 'Number of Employees'],
      ['Boston', boston],
      ['Orlando', orlando],
      ['Chicago', chicago],
      ['San Francisco', sanfran]
    ]);

    var options = {
      title: 'Number & Percentage of Employees',
      pieHole: 0.5,
      pieSliceText: 'value'
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

  $(window).resize(function(){
    drawChart();
  });
}