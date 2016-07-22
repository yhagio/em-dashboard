import Ember from 'ember';
import { csvJSON, countNumOfAMonth } from '../utils/helpers';

let map;
let bounds;
let randomNum = 0; // Incrementing number for demo purpose

export default Ember.Route.extend({
  model() {
    return Em.RSVP.hash({
      employees: fetchEmployees(),
      customers: fetchCustoemrs(),
      issues: issues()
    });
  }
});

// Customer Aquisition Line Chart of each month
function createLineChart (data) {
  let total = Array(12).fill(0);
  let monthNumArray = [];

  // Count number of paid customers of each month
  data.forEach((d) => {
    monthNumArray = countNumOfAMonth(d.signup_date, total);
  });

  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Paid Customers'],
      ['Jan',  monthNumArray[0]],
      ['Feb',  monthNumArray[1]],
      ['Mar',  monthNumArray[2]],
      ['Apr',  monthNumArray[3]],
      ['May',  monthNumArray[4] + randomNum],
      ['Jun',  monthNumArray[5]],
      ['Jul',  monthNumArray[6]],
      ['Aug',  monthNumArray[7]],
      ['Sep',  monthNumArray[8]],
      ['Oct',  monthNumArray[9]],
      ['Nov',  monthNumArray[10]],
      ['Dec',  monthNumArray[11]]
    ]);

    var options = {
      title: 'Paid Customer / Month in 2015',
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

// Initialize the map
function initializeMap() {
  bounds = new google.maps.LatLngBounds();
  const USA = {lat: 37.09024, lng: -95.712891};
  map = new google.maps.Map(document.getElementById("map-canvas_home"), {
    zoom: 3,
    center: USA
  });
}

// Update markers
// It only updates the number of employees.
// Marker's position is fixed to 4 office locations.
function updateMarkers(jsonData) {
  // For DEMO purpose, randomly generates base employee number for each office
  let boston = (Math.floor(Math.random() * 10) + 1);
  let sanfran = (Math.floor(Math.random() * 10) + 1);
  let orlando = (Math.floor(Math.random() * 10) + 1);
  let chicago = (Math.floor(Math.random() * 10) + 1);

  // let boston = 0;
  // let sanfran = 0;
  // let orlando = 0;
  // let chicago = 0;

  // Count each office location's number of employees
  jsonData.forEach((employee) => {
    (employee.location === 'Boston') ? boston++ : null;
    (employee.location === 'San Francisco') ? sanfran++ : null;
    (employee.location === 'Chicago') ? chicago++ : null;
    (employee.location === 'Orlando') ? orlando++ : null;
  });

  // Markers array
  const markers = [
    ['Boston', boston, 42.3135417, -71.1975856],
    ['Chicago', chicago, 41.8339026, -88.0130316],
    ['SanFrancisco', sanfran, 37.7578149, -122.507812],
    ['Orlando', orlando, 28.4813986, -81.5091802]
  ];

  // Display multiple markers on a map
  let marker;
  let labelNum = 0;

  // Add each marker on map
  for (let i = 0; markers.length > i; i++) {
    let position = new google.maps.LatLng(markers[i][2], markers[i][3]);
    bounds.extend(position);

    // Setting each marker location
    marker = new google.maps.Marker({
      position,
      map,
      title: markers[i][0],
      label: `${labelNum++}`
    });

    // Display employee number
    $(`#num-emp-${markers[i][0]}`).text(markers[i][1]);

    //Automatically center the map fitting all markers on the screen on resizing window
    $(window).resize(function(){
      map.fitBounds(bounds);
    });
  }
}



// Fetch employees data and display the number
function fetchEmployees() {

  // Initial Load
  $.get('./data/employees.csv')
      .then((data) => {
        let jsonData = csvJSON(data);
        console.log('Initial employees data Loaded');

        // Display Employee Geospatial View:
        // To avoid `document.getElementById('map-canvas_home')`
        // return 'null' delay it by 100 milliseconds
        setTimeout(() => {
          // $('#emp-size').text(jsonData.length);

          let svgTextElement = document.getElementById("emp-size");
          let textNode = svgTextElement.childNodes[0];
          textNode.nodeValue = jsonData.length;

          // createGeoView(jsonData);
          initializeMap();
          updateMarkers(jsonData)
        }, 300);
        
        return jsonData;
      });

  // Fetch new data every 3 seconds
  // if route changes, it stops polling
  let getHandleEmployeesData = function() {
    setTimeout(() => { // Make sure route changed if changed
      console.log('!!!window.location.hash ', window.location.hash );
      if ((window.location.hash !== '') && (window.location.hash !== '#/')) {
        console.log('Cancelled polling employees data');
        clearInterval(looping);
      } else {
        return $.get('./data/employees.csv')
                .then((data) => {
                  console.log('Polling employees data');
                  let jsonData = csvJSON(data);

                  setTimeout(() => {
                    let svgTextElement = document.getElementById("emp-size");
                    let textNode = svgTextElement.childNodes[0];
                    textNode.nodeValue = jsonData.length + randomNum;

                    // createGeoView(jsonData);
                    updateMarkers(jsonData)
                  }, 100);

                  return jsonData;
                });
      }
    }, 300);
  };
  let looping = setInterval(getHandleEmployeesData, 3000);
}

// Fetch customers data and display the number
function fetchCustoemrs() {

  // Initial Load
  $.getJSON('./data/customers.json')
      .then((data) => {
        console.log('Initial customers data Loaded');

        // Display Line Chart:
        // To avoid `document.getElementById()`
        // return 'null' delay it by 100 milliseconds
        setTimeout(() => {
          $('#cus-size').text(data.length);
          createLineChart(data);
        }, 100);
        
        return data;
      });

  // Fetch new data every 3 seconds
  // if route changes, it stops polling
  let getHandleCustomersData = function() {
    setTimeout(() => { // Make sure route changed if changed
      if ((window.location.hash !== '') && (window.location.hash !== '#/')) {
        console.log('Cancelled polling customers data');
        clearInterval(looping);
      } else {
        return $.getJSON('./data/customers.json')
                .then((data) => {
                  console.log('Polling customers data');

                  setTimeout(() => {
                    var svgTextElement = document.getElementById("cus-size");
                    var textNode = svgTextElement.childNodes[0];
                    textNode.nodeValue = data.length + randomNum;

                    createLineChart(data);
                  }, 100);
                  
                  return data;
                });
      }
    }, 100);
  };
  let looping = setInterval(getHandleCustomersData, 3000);
}

// Fetch issues data and display the number of closed and open issues
function issues() {

  // Initial Load
  $.getJSON('./data/issues.json')
      .then((data) => {
        console.log('Initial issues data Loaded');

        // Display Line Chart:
        // To avoid `document.getElementById()`
        // return 'null' delay it by 100 milliseconds
        setTimeout(() => {
          let open_issues = data.filter((d) => {
            return d.status_open === true;
          });
          
          let closed_issues = data.filter((d) => {
            return d.status_open === false;
          });

          $('#open-size').text(open_issues.length);
          $('#closed-size').text(closed_issues.length);
          
          return { data, open_issues, closed_issues };
        }, 100);
        
        return data;
      });

  // Fetch new data every 3 seconds
  // if route changes, it stops polling
  let getHandleIssuesData = function() {
    setTimeout(() => { // Make sure route changed if changed
      if ((window.location.hash !== '') && (window.location.hash !== '#/')) {
        console.log('Cancelled polling issues data');
        clearInterval(looping);
      } else {
        return $.getJSON('./data/issues.json')
                .then((data) => {
                  // ** just incrementing to see real time update for demo purpose
                  randomNum++;

                  console.log('Polling issues data');

                  setTimeout(() => {
                    let open_issues = data.filter((d) => {
                      return d.status_open === true;
                    });
                    
                    let closed_issues = data.filter((d) => {
                      return d.status_open === false;
                    });

                    let svgTextElement1 = document.getElementById("open-size");
                    let textNode1 = svgTextElement1.childNodes[0];
                    textNode1.nodeValue = open_issues.length + randomNum;

                    let svgTextElement2 = document.getElementById("closed-size");
                    let textNode2 = svgTextElement2.childNodes[0];
                    textNode2.nodeValue = closed_issues.length + randomNum;

                  }, 100);
                  
                  return data;
                });
      }
    }, 100);
  };
  let looping = setInterval(getHandleIssuesData, 3000);
}