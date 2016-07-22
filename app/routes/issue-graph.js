import Ember from 'ember';
import { countNumOfAMonth } from '../utils/helpers';

export default Ember.Route.extend({
  model() {
    return Em.RSVP.hash({
      customers: fetchCustomers(),
      issues: fetchIssues()
    });
  }
});

// Customer Aquisition Line Chart of each month
function createLineChart (data) {
  let total = Array(12).fill(0);
  let monthNumArray = [];

  // Count number of signups (paid) of each month
  data.forEach((d) => {
    monthNumArray = countNumOfAMonth(d.signup_date, total);
  });

  // Accumulate number of signups (paid) each month
  for (let i = 1; 12 > i; i++) {
    monthNumArray[i] += monthNumArray[i-1];
  }

  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Total Paid Customers'],
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
      title: 'Total Paid Customers in 2015',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }
  $(window).resize(function(){
    drawChart();
  });
}

// Open or Closed status of issues of 2015
function createBarChart (data) {
  let open = 0;
  let closed = 0;

  data.forEach((d) => {
    if (d.status_open) {
      open++;
    } else {
      closed++
    }
  });

  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Status", "Number", { role: "style" } ],
      ["Open", open, "red"],
      ["Closed", closed, "green"],
    ]);

    var view = new google.visualization.DataView(data);

    var options = {
      title: "Summary: Open / Closed Issue Status of 2015",
      legend: { position: "none" }
    };
    var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
    chart.draw(view, options);
  }
  $(window).resize(function(){
    drawChart();
  });
}

// A bar chart reflecting number of reported issues over a period of time
// X axis: Time period
// Y axis: Number of issues
function createIssueChart (data) {
  let total = Array(12).fill(0);
  let monthNumArray = [];

  // Count number of issues of each month
  data.forEach((d) => {
    monthNumArray = countNumOfAMonth(d.submitted_at, total);
  });

  // Accumulate number of issues each month
  for (let i = 1; 12 > i; i++) {
    monthNumArray[i] += monthNumArray[i-1];
  }

  google.charts.setOnLoadCallback(drawIssueChart);

  function drawIssueChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Accumulated Total Opened Issues'],
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
      title: 'Accumulated opened issues over time in 2015',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('issue_chart'));

    chart.draw(data, options);
  }
  $(window).resize(function(){
    drawIssueChart();
  });
}


function fetchCustomers() {
  // Initial Load
  $.getJSON('./data/customers.json')
      .then((data) => {
        console.log('Initial customers data Loaded');

        // Display Line Chart:
        // To avoid `document.getElementById()`
        // return 'null' delay it by 100 milliseconds
        setTimeout(() => {
          createLineChart(data);
        }, 100);
        
        return data;
      });

  // Fetch new data every 3 seconds
  // if route changes, it stops polling
  let getHandleCustomersData = function() {
    setTimeout(() => { // Make sure route changed if changed
      if (window.location.hash !== '#/issue-graph') {
        console.log('Cancelled polling customers data');
        clearInterval(looping);
      } else {
        return $.getJSON('./data/customers.json')
                .then((data) => {
                  console.log('Polling customers data');

                  setTimeout(() => {
                    createLineChart(data);
                  }, 100);
                  
                  return data;
                });
      }
    }, 100);
  };
  let looping = setInterval(getHandleCustomersData, 3000);
}

function fetchIssues() {
  // Initial Load
  $.getJSON('./data/issues.json')
      .then((data) => {
        console.log('Initial issues data Loaded');

        // Display Line Chart:
        // To avoid `document.getElementById()`
        // return 'null' delay it by 100 milliseconds
        setTimeout(() => {
          createBarChart(data);
          createIssueChart(data);
        }, 100);
        
        return data;
      });

  // Fetch new data every 3 seconds
  // if route changes, it stops polling
  let getHandleIssuesData = function() {
    setTimeout(() => { // Make sure route changed if changed
      if (window.location.hash !== '#/issue-graph') {
        console.log('Cancelled polling issues data');
        clearInterval(looping);
      } else {
        return $.getJSON('./data/issues.json')
                .then((data) => {
                  console.log('Polling issues data');

                  setTimeout(() => {
                    createBarChart(data);
                    createIssueChart(data);
                  }, 100);
                  
                  return data;
                });
      }
    }, 100);
  };
  let looping = setInterval(getHandleIssuesData, 3000);
}
