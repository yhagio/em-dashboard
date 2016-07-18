import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Em.RSVP.hash({
      customers: $.getJSON('./data/customers.json')
                  .then((data) => {

                    setTimeout(() => {
                      createLineChart(data);
                    }, 100);

                    return data;
                  }),

      issues: $.getJSON('./data/issues.json')
                .then((data) => {

                  setTimeout(() => {
                    createBarChart(data);
                    createIssueChart(data);
                  }, 100);

                  return data;
                })
    });
  }
});

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

  // Accumulate number of signups each month
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