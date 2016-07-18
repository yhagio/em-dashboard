import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Em.RSVP.hash({
      employees: fetchEmployees(),
      customers: fetchCustoemrs(),
      issues: issues()
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
  let boston_num = 0;
  let sanfran_num = 0;
  let orlando_num = 0;
  let chicago_num = 0;

  jsonData.forEach((employee) => {
    (employee.location === 'Boston') ? boston_num++ : null;
    (employee.location === 'San Francisco') ? sanfran_num++ : null;
    (employee.location === 'Chicago') ? chicago_num++ : null;
    (employee.location === 'Orlando') ? orlando_num++ : null;
  });

  setTimeout(() => {
    let bounds = new google.maps.LatLngBounds();
    const USA = {lat: 37.09024, lng: -95.712891};
    const map = new google.maps.Map(document.getElementById("map-canvas_home"), {
      zoom: 3,
      center: USA
    });

    // Markers array
    const markers = [
      ['Boston', boston_num, 42.3135417, -71.1975856],
      ['Chicago', chicago_num, 41.8339026, -88.0130316],
      ['San Francisco', sanfran_num, 37.7578149, -122.507812],
      ['Orlando', orlando_num, 28.4813986, -81.5091802]
    ];

    // Info Content array of each marker
    function infoWindowContent(name, num) {
      return `<div class="markerInfo"><h5>${name}</h5><p>Number of employees: ${num}</p></div>`;
    };

    // Display multiple markers on a map
    let infoWindow = new google.maps.InfoWindow();
    let marker;

    for (let i = 0; markers.length > i; i++) {
      let position = new google.maps.LatLng(markers[i][2], markers[i][3]);
      bounds.extend(position);

      // Setting each marker location
      marker = new google.maps.Marker({
        position,
        map,
        title: markers[i][0]
      });

      // Setting each marker's info window
      google.maps.event.addListener(marker, 'click', ((marker, i) => {
        return () => {
          infoWindow.setContent(infoWindowContent(markers[i][0], markers[i][1]));
          infoWindow.open(map, marker);
        }
      })(marker, i));

      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
    }

  }, 300); // ** For avoiding failing to find the element to attach the map, wait 300ms
}

// Fetch employees data and display the number
function fetchEmployees() {
  $.get('./data/employees.csv')
    .then((data) => {
      let jsonData = csvJSON(data);
      console.log('Initial Employees Data Loaded');
      setTimeout(() => {
        $('#emp-size').text(jsonData.length);
        createGeoView(jsonData);
      }, 100);
      return jsonData;
    });
  
  // POLLING: Fetch new data every hour
  setInterval(() => {
    $.get('./data/employees.csv')
      .then((data) => {
        let jsonData = csvJSON(data);
        console.log('Polling Employees Data');
        setTimeout(() => {
          // $('#emp-size').text(jsonData.length);
          var svgTextElement = document.getElementById("emp-size");
          var textNode = svgTextElement.childNodes[0];
          textNode.nodeValue = jsonData.length;

          createGeoView(jsonData);
        }, 200);
        return jsonData;
      });
  },  3000);
}

// Fetch customers data and display the number
function fetchCustoemrs() {
  $.getJSON('./data/customers.json')
    .then((data) => {
      console.log('Initial Customers Data Loaded');
      setTimeout(() => {
        $('#cus-size').text(data.length);
        createLineChart(data);
      }, 200);
      return data;
    });

  // POLLING: Fetch new data every hour
  setInterval(() => {
    return $.get('./data/customers.json')
      .then((data) => {
        console.log('Polling Customers Data');
        setTimeout(() => {
          // $('#cus-size').text(data.length);
          var svgTextElement = document.getElementById("cus-size");
          var textNode = svgTextElement.childNodes[0];
          textNode.nodeValue = data.length;

          createLineChart(data);
        }, 100);

        return data;
      });
  },  3000);
}

// Fetch issues data and display the number of closed and open issues
function issues() {
  $.getJSON('./data/issues.json')
    .then((data) => {
      console.log('Initial Issues Data Loaded');
      let open_issues = data.filter((d) => {
        return d.status_open === true;
      });
      
      let closed_issues = data.filter((d) => {
        return d.status_open === false;
      });

      $('#open-size').text(open_issues.length);
      $('#closed-size').text(closed_issues.length);

      return { data, open_issues, closed_issues };
    });
  
  // POLLING: Fetch new data every hour
  setInterval(() => {
    return $.get('./data/issues.json')
      .then((data) => {
        console.log('Polling Issues Data');
        let open_issues = data.filter((d) => {
          return d.status_open === true;
        });
        
        let closed_issues = data.filter((d) => {
          return d.status_open === false;
        });

        // $('#open-size').text(open_issues.length);
        // $('#closed-size').text(closed_issues.length);
        var svgTextElement1 = document.getElementById("open-size");
        var textNode1 = svgTextElement1.childNodes[0];
        textNode1.nodeValue = open_issues.length;

        var svgTextElement2 = document.getElementById("closed-size");
        var textNode2 = svgTextElement2.childNodes[0];
        textNode2.nodeValue = closed_issues.length;

        return { data, open_issues, closed_issues };
      });
  }, 3000);
}