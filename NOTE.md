### Project Description / Requirements

The dashboard application must contain:
- a header (with the currently selected dashboard’s name)
- a menu, allowing the user to navigate between dashboards
- the primary dashboard display area. 
- find or create own data files in CSV and JSON formats to provide data to the dashboards. 

The required dashboards are:
A geospatial view:
- identifying the number of employees at various company locations.

A “key metrics” view, containing components displaying: 
- the number of open issues
- a line chart reflecting number of paying customers over a period of time
- a bar chart reflecting number of reported issues over a period of time.

A “data view” of all issues, with an appearance similar to a spreadsheet, that is sortable and filterable.

An issue should contain: 
- submission timestamp
- customer name
- customer email
- description
- open/closed status
- closed timestamp
- employee name


### Project progress

JSON data (issues)
- id
- submitted_at
- customer_name
- customer_email
- description
- status
- closed_at
- employee_name

CSV data (employees)
- id
- employee_name
- location

Navigation menu:
- [X] Main area
- [X] Employees
- [X] Issues

Employees Geospatial View
- [X] Display number of employees
- [X] Google Chart Integration for the location of employees

Metrics View (Issues)
- [X] Display open issues
- [X] Line chart of number of paying customers
- [X] Bar chart of number of reported issues

Data Views (Issues) Spreadsheet-like
- [X] Display all issues
- [X] Filterable / Sortable Issues


Issue 1:
- Problem: http://stackoverflow.com/questions/31492069/material-design-lite-inputs-in-ember-js-app-loses-it-design-after-route-transiti
- Solution: Not to use javascript animations from libraries since not needed

Issue 2:
- Problem: Google Visualization: Geomap does not work on mobile web browser
- Solution: Use Google Map instead

#### Known Issues
- [Google Maps API warning on Geochart](https://github.com/google/google-visualization-issues/issues/2292)

#### Updates
Enabled Responsiveness of Table:
- Responsive table with this technique :[Responsive table tricks](https://css-tricks.com/responsive-data-tables/)

To run minimized files:
- Minimize assets by running `ember build --prod` with help of `http-server` module

Added column chart for total issues opened over time

Polling Data
```js
  // Ember.run.later method version of fetching employees data every 3 seconds

  Ember.run.later(this, function() {
    this.model().then()
        .then((data) => {
          let jsonData = csvJSON(data);

          setTimeout(() => {
            createGeoView(jsonData);
          }, 100);    
        });
  }, 3000);
  return $.get('./data/employees.csv');
```