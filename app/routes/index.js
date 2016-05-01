import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Em.RSVP.hash({
      employees: $.get('https://raw.githubusercontent.com/yhagio/em-dashboard/gh-pages/dist/data/employees.csv')
                  .then((data) => {
                    let jsonData = csvJSON(data);
                    
                    setTimeout(() => {
                      createGeoView(jsonData);
                    }, 100);

                    return jsonData;
                  }),

      customers: $.getJSON('https://raw.githubusercontent.com/yhagio/em-dashboard/gh-pages/dist/data/customers.json')
                  .then((data) => {
                    
                    setTimeout(() => {
                      createLineChart(data);
                    }, 100);

                    return data;
                  }),

      issues: $.getJSON('https://raw.githubusercontent.com/yhagio/em-dashboard/gh-pages/dist/data/issues.json')
                .then((data) => {

                  let open_issues = data.filter((d) => {
                    return d.status_open === true;
                  });
                  
                  let closed_issues = data.filter((d) => {
                    return d.status_open === false;
                  });

                  return { data, open_issues, closed_issues };
                })
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


// Count the number of customer signups of each month
function countNumOfAMonth (signupDate, total) {
  let monthInt = parseInt(signupDate.substr(0, signupDate.indexOf('/')));

  ( monthInt === 1 ) ? total[0]++ : null;
  ( monthInt === 2 ) ? total[1]++ : null;
  ( monthInt === 3 ) ? total[2]++ : null;
  ( monthInt === 4 ) ? total[3]++ : null;
  ( monthInt === 5 ) ? total[4]++ : null;
  ( monthInt === 6 ) ? total[5]++ : null;
  ( monthInt === 7 ) ? total[6]++ : null;
  ( monthInt === 8 ) ? total[7]++ : null;
  ( monthInt === 9 ) ? total[8]++ : null;
  ( monthInt === 10 ) ? total[9]++ : null;
  ( monthInt === 11 ) ? total[10]++ : null;
  ( monthInt === 12 ) ? total[11]++ : null;

  return total;
}

// Customer Aquisition Line Chart of each month
function createLineChart (data) {
  let customerNumbers = 0;
  let total = Array(12).fill(0);
  let monthNumArray = [];

  // Count number of signups of each month
  data.forEach((d) => {
    monthNumArray = countNumOfAMonth(d.signup_date, total);
  });

  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Per Month Signups'],
      ['Jan',  monthNumArray[0]],
      ['Feb',  monthNumArray[1]],
      ['Mar',  monthNumArray[2]],
      ['Apr',  monthNumArray[3]],
      ['May',  monthNumArray[4]],
      ['Jun',  monthNumArray[5]],
      ['Jul',  monthNumArray[6]],
      ['Aug',  monthNumArray[7]],
      ['Sep',  monthNumArray[8]],
      ['Oct',  monthNumArray[9]],
      ['Nov',  monthNumArray[10]],
      ['Dec',  monthNumArray[11]]
    ]);

    var options = {
      title: 'Customer sinups / motnh in 2015',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_home'));

    chart.draw(data, options);
  }
  $(window).resize(function(){
    drawChart();
  });
}

// Geogrpahic Location Map of branch offices
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
    var geomap = new google.visualization.GeoMap(document.getElementById('map-canvas_home'));
    geomap.draw(data, options);
  }

}