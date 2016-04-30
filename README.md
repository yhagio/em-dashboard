# Ember-dashboard

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

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
- [ ] Main area
- [ ] Employees
- [X] Issues

Employees Geospatial View
- [ ] Display number of employees
- [ ] Google Map Integration for the location of employees

Metrics View (Issues)
- [ ] Display open issues
- [ ] Line chart of number of paying customers
- [ ] Bar chart of number of reported issues

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


```
bower install --save material-design-lite
```

Isseu 1:
- Problem: http://stackoverflow.com/questions/31492069/material-design-lite-inputs-in-ember-js-app-loses-it-design-after-route-transiti
- Solution: Not to use javascript animations from libraries since not needed