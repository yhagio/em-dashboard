# Ember-dashboard

![Screenshot](/screenshot.png)

#### [DEMO](http://yhagio.github.io/em-dashboard/dist)

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

---
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

### Resources & Inspirations
- https://guides.emberjs.com/v2.5.0/
- https://getmdl.io/components/index.html
- https://design.google.com/icons/
- http://codepen.io/zavoloklom/pen/IGkDz?editors=1100
- https://github.com/typicode/json-server
- https://www.mockaroo.com/
- http://www.jarrodctaylor.com/posts/Filter-And-Sort-Tables-In-Ember/
- https://www.freshdesignweb.com/free-bootstrap-admin-templates/
- https://developers.google.com/chart/interactive/docs/gallery/geomap

```
bower install --save material-design-lite
```

Isseu 1:
- Problem: http://stackoverflow.com/questions/31492069/material-design-lite-inputs-in-ember-js-app-loses-it-design-after-route-transiti
- Solution: Not to use javascript animations from libraries since not needed