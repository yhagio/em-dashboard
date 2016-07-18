import Ember from 'ember';

export default Ember.Route.extend({
  model() {

    // Initial Load
    $.get('./data/employees.csv')
        .then((data) => {
          let jsonData = csvJSON(data);
          console.log('Initial Employee Data Loaded');
          
          // Display Employee Geospatial View:
          // To avoid `document.getElementById('map-canvas')`
          // return 'null' delay it by 100 milliseconds
          setTimeout(() => {
            createGeoView(jsonData);
          }, 100);
          
          return jsonData;
        });

    // Fetch new data every 3 seconds
    // if route changes, it stops polling
    let getHandleEmployeesData = function() {
      if (window.location.pathname !== '/employees') {
        return clearInterval(getHandleEmployeesData);
      }

      return $.get('./data/employees.csv')
              .then((data) => {
                console.log('Polling Employee Data');
                let jsonData = csvJSON(data);

                setTimeout(() => {
                  createGeoView(jsonData);
                }, 100);
                
                return jsonData;
              });
    };

    setInterval(getHandleEmployeesData, 3000);

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

  google.charts.setOnLoadCallback(drawMap);
  google.charts.setOnLoadCallback(drawChart);


  // Draw Geographic Map Chart of Employees
  function drawMap() {

    setTimeout(() => {
      let bounds = new google.maps.LatLngBounds();
      const USA = {lat: 37.09024, lng: -95.712891};
      const map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 3,
        center: USA
      });

      // Markers array
      const markers = [
        ['Boston', boston, 42.3135417, -71.1975856],
        ['Chicago', chicago, 41.8339026, -88.0130316],
        ['San Francisco', sanfran, 37.7578149, -122.507812],
        ['Orlando', orlando, 28.4813986, -81.5091802]
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


  // Draw Donut Chart of Employees
  function drawChart() {
    let data = google.visualization.arrayToDataTable([
      ['City', 'Number of Employees'],
      ['Boston', boston],
      ['Orlando', orlando],
      ['Chicago', chicago],
      ['San Francisco', sanfran]
    ]);

    let options = {
      title: 'Number & Percentage of Employees',
      pieHole: 0.5,
      pieSliceText: 'value'
    };

    let chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

  $(window).resize(function(){
    drawChart();
    drawMap();
  });
}