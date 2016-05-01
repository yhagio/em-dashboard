"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('em-dashboard/app', ['exports', 'ember', 'em-dashboard/resolver', 'ember-load-initializers', 'em-dashboard/config/environment'], function (exports, _ember, _emDashboardResolver, _emberLoadInitializers, _emDashboardConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _emDashboardConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emDashboardConfigEnvironment['default'].podModulePrefix,
    Resolver: _emDashboardResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _emDashboardConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('em-dashboard/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'em-dashboard/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _emDashboardConfigEnvironment) {

  var name = _emDashboardConfigEnvironment['default'].APP.name;
  var version = _emDashboardConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('em-dashboard/components/side-nav', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: 'demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50',

    click: function click(e) {
      if ($('#side-nav').hasClass('is-visible')) {
        $('#side-nav').removeClass('is-visible');
      }
    }
  });
});
define('em-dashboard/components/top-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'header',
    classNames: 'demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600',

    click: function click(e) {
      if (e.target.id === 'nav-open-button') {
        if ($('#side-nav').hasClass('is-visible')) {
          $('#side-nav').removeClass('is-visible');
        } else {
          $('#side-nav').addClass('is-visible');
        }
      } else {
        if ($('#side-nav').hasClass('is-visible')) {
          $('#side-nav').removeClass('is-visible');
        }
      }
    }
  });
});
define('em-dashboard/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      closeNav: function closeNav(e) {
        console.log(this, e);
      }
    }
  });
});
define('em-dashboard/controllers/employees', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('em-dashboard/controllers/issues', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    sortProperties: ['id:asc'],
    sortedModel: _ember['default'].computed.sort('model', 'sortProperties'),
    sortAscending: false,

    actions: {
      // property: the table column you want to sort by
      // id: the id of the header of the table you want to sort
      sortBy: function sortBy(property, id) {
        if (this.get('sortAscending')) {
          this.toggleProperty('sortAscending');
          this.set('sortProperties', [property + ':asc']);
          $(id).children().text('keyboard_arrow_down');
        } else {
          this.toggleProperty('sortAscending');
          this.set('sortProperties', [property + ':desc']);
          $(id).children().text('keyboard_arrow_up');
        }

        // Remove 'selected-column' from non clicked column
        $('.table-header').each(function (i, el) {
          // Check all the table header elements and if it is not
          // the clicked element, remove 'selected-column' from it
          if ($(el).hasClass('selected-column') === true && !$(el).is(id)) {
            $(el).removeClass('selected-column');
          }
        });

        // If clicked column does not 'selected-column', add the class
        if (!$(id).hasClass('selected-column')) {
          $(id).addClass('selected-column');
        }
      }
    },

    // Filter features
    // Can filter the table by either customer's name, description, or employee's name
    filterText: '',
    filteredResults: (function () {
      var filterWord = this.get('filterText').toLowerCase();
      if (filterWord.length > 0) {

        return this.get('sortedModel').filter(function (item) {
          return item.customer_name.toLowerCase().indexOf(filterWord) !== -1 || item.description.toLowerCase().indexOf(filterWord) !== -1 || item.employee_name.toLowerCase().indexOf(filterWord) !== -1;
        });
      }
      return this.get('sortedModel');
    }).property('filterText', 'sortedModel')
  });
});
define('em-dashboard/helpers/check-ifclosed', ['exports', 'ember'], function (exports, _ember) {
  exports.checkIfclosed = checkIfclosed;

  function checkIfclosed(isOpen, hash) {
    if (isOpen[0] === true) {
      return 'N/A';
    } else {
      return hash.date;
    }
  }

  exports['default'] = _ember['default'].Helper.helper(checkIfclosed);
});
define('em-dashboard/helpers/limit-characters', ['exports', 'ember'], function (exports, _ember) {
  exports.limitCharacters = limitCharacters;

  function limitCharacters(params /*, hash*/) {
    if (params[0].length > 70) {
      return params[0].slice(0, 70) + '...';
    }
    return params[0];
  }

  exports['default'] = _ember['default'].Helper.helper(limitCharacters);
});
define('em-dashboard/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('em-dashboard/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('em-dashboard/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'em-dashboard/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _emDashboardConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_emDashboardConfigEnvironment['default'].APP.name, _emDashboardConfigEnvironment['default'].APP.version)
  };
});
define('em-dashboard/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('em-dashboard/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('em-dashboard/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('em-dashboard/initializers/export-application-global', ['exports', 'ember', 'em-dashboard/config/environment'], function (exports, _ember, _emDashboardConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_emDashboardConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _emDashboardConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_emDashboardConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('em-dashboard/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('em-dashboard/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('em-dashboard/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("em-dashboard/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('em-dashboard/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('em-dashboard/router', ['exports', 'ember', 'em-dashboard/config/environment'], function (exports, _ember, _emDashboardConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emDashboardConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('employees');
    this.route('issues');
    this.route('issue-graph');
  });

  exports['default'] = Router;
});
define('em-dashboard/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    init: function init() {
      google.charts.load('current', { 'packages': ['geomap', 'corechart'] });
    }
  });
});
define('em-dashboard/routes/employees', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {

      return $.get('/data/employees.csv').then(function (data) {
        var jsonData = csvJSON(data);

        // Display Employee Geospatial View:
        // To avoid `document.getElementById('map-canvas')`
        // return 'null' delay it by 100 milliseconds
        setTimeout(function () {
          createGeoView(jsonData);
        }, 100);

        return jsonData;
      });
    }
  });

  function csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result; //JavaScript object
  }

  function createGeoView(jsonData) {
    var boston = 0;
    var sanfran = 0;
    var orlando = 0;
    var chicago = 0;

    jsonData.forEach(function (employee) {
      employee.location === 'Boston' ? boston++ : null;
      employee.location === 'San Francisco' ? sanfran++ : null;
      employee.location === 'Chicago' ? chicago++ : null;
      employee.location === 'Orlando' ? orlando++ : null;
    });

    // google.charts.load('current', {'packages': ['geomap', 'corechart']});
    google.charts.setOnLoadCallback(drawMap);
    google.charts.setOnLoadCallback(drawChart);

    // Draw Geographic Map Chart of Employees
    function drawMap() {
      var data = google.visualization.arrayToDataTable([['City', 'Number of Employees'], ['Boston', boston], ['Orlando', orlando], ['Chicago', chicago], ['San Francisco', sanfran]]);

      var options = {};
      options['region'] = 'US';
      options['colors'] = [0xFF8747, 0xFFB581, 0xc06000];
      options['dataMode'] = 'markers';
      var geomap = new google.visualization.GeoMap(document.getElementById('map-canvas'));
      geomap.draw(data, options);
    }

    // Draw Donut Chart of Employees
    function drawChart() {
      var data = google.visualization.arrayToDataTable([['City', 'Number of Employees'], ['Boston', boston], ['Orlando', orlando], ['Chicago', chicago], ['San Francisco', sanfran]]);

      var options = {
        title: 'Number & Percentage of Employees',
        pieHole: 0.5,
        pieSliceText: 'value'
      };

      var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
      chart.draw(data, options);
    }
  }
});
define('em-dashboard/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('employees');
    },
    model: function model() {
      return { title: 'Home' };
    }
  });
});
define('em-dashboard/routes/issue-graph', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      // return $.getJSON('/data/issues.json');
      return Em.RSVP.hash({
        customers: $.getJSON('/data/customers.json').then(function (data) {

          setTimeout(function () {
            createLineChart(data);
          }, 100);

          return data;
        }),

        issues: $.getJSON('/data/issues.json').then(function (data) {

          setTimeout(function () {
            createBarChart(data);
          }, 100);

          return data;
        })
      });
    }
  });

  // Count the number of customer signups of each month
  function countNumOfAMonth(signupDate, total) {
    var monthInt = parseInt(signupDate.substr(0, signupDate.indexOf('/')));

    monthInt === 1 ? total[0]++ : null;
    monthInt === 2 ? total[1]++ : null;
    monthInt === 3 ? total[2]++ : null;
    monthInt === 4 ? total[3]++ : null;
    monthInt === 5 ? total[4]++ : null;
    monthInt === 6 ? total[5]++ : null;
    monthInt === 7 ? total[6]++ : null;
    monthInt === 8 ? total[7]++ : null;
    monthInt === 9 ? total[8]++ : null;
    monthInt === 10 ? total[9]++ : null;
    monthInt === 11 ? total[10]++ : null;
    monthInt === 12 ? total[11]++ : null;

    return total;
  }

  // Customer Aquisition Line Chart of each month
  function createLineChart(data) {
    var customerNumbers = 0;
    var total = Array(12).fill(0);
    var monthNumArray = [];

    // Count number of signups of each month
    data.forEach(function (d) {
      monthNumArray = countNumOfAMonth(d.signup_date, total);
    });

    // Accumulate number of signups each month
    for (var i = 1; 12 > i; i++) {
      monthNumArray[i] += monthNumArray[i - 1];
    }

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([['Year', 'Total Signups'], ['Jan', monthNumArray[0]], ['Feb', monthNumArray[1]], ['Mar', monthNumArray[2]], ['Apr', monthNumArray[3]], ['May', monthNumArray[4]], ['Jun', monthNumArray[5]], ['Jul', monthNumArray[6]], ['Aug', monthNumArray[7]], ['Sep', monthNumArray[8]], ['Oct', monthNumArray[9]], ['Nov', monthNumArray[10]], ['Dec', monthNumArray[11]]]);

      var options = {
        title: 'Total Customer Sinups in 2015',
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

      chart.draw(data, options);
    }
  }

  // Open or Closed status of issues
  function createBarChart(data) {
    var open = 0;
    var closed = 0;

    data.forEach(function (d) {
      if (d.status_open) {
        open++;
      } else {
        closed++;
      }
    });

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([["Status", "Number", { role: "style" }], ["Open", open, "red"], ["Closed", closed, "green"]]);

      var view = new google.visualization.DataView(data);

      var options = {
        title: "Open / Closed Issue Status",
        legend: { position: "none" }
      };
      var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
      chart.draw(view, options);
    }
  }
});
define('em-dashboard/routes/issues', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return $.getJSON('/data/issues.json');
    }
  });
});
define('em-dashboard/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("em-dashboard/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 39,
            "column": 0
          }
        },
        "moduleName": "em-dashboard/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 4, 4);
        return morphs;
      },
      statements: [["inline", "side-nav", [], ["id", "side-nav"], ["loc", [null, [2, 2], [2, 29]]]], ["content", "outlet", ["loc", [null, [36, 2], [36, 12]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("em-dashboard/templates/components/side-nav", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 4
            },
            "end": {
              "line": 21,
              "column": 141
            }
          },
          "moduleName": "em-dashboard/templates/components/side-nav.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el1, "role", "presentation");
          var el2 = dom.createTextNode("home");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Home");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 4
            },
            "end": {
              "line": 23,
              "column": 152
            }
          },
          "moduleName": "em-dashboard/templates/components/side-nav.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el1, "role", "presentation");
          var el2 = dom.createTextNode("people");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Employees");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 4
            },
            "end": {
              "line": 25,
              "column": 160
            }
          },
          "moduleName": "em-dashboard/templates/components/side-nav.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el1, "role", "presentation");
          var el2 = dom.createTextNode("assessment");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Issue Graph");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 4
            },
            "end": {
              "line": 27,
              "column": 150
            }
          },
          "moduleName": "em-dashboard/templates/components/side-nav.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el1, "role", "presentation");
          var el2 = dom.createTextNode("assignment");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Issues");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 31,
            "column": 17
          }
        },
        "moduleName": "em-dashboard/templates/components/side-nav.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("header");
        dom.setAttribute(el1, "class", "demo-drawer-header");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        var el3 = dom.createTextNode("Ember Dashboard");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "demo-navigation mdl-navigation mdl-color--blue-grey-800");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(element0, 5, 5);
        morphs[3] = dom.createMorphAt(element0, 7, 7);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["class", "mdl-navigation__link"], 0, null, ["loc", [null, [21, 4], [21, 153]]]], ["block", "link-to", ["employees"], ["class", "mdl-navigation__link"], 1, null, ["loc", [null, [23, 4], [23, 164]]]], ["block", "link-to", ["issue-graph"], ["class", "mdl-navigation__link"], 2, null, ["loc", [null, [25, 4], [25, 172]]]], ["block", "link-to", ["issues"], ["class", "mdl-navigation__link"], 3, null, ["loc", [null, [27, 4], [27, 162]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("em-dashboard/templates/components/top-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 0
          }
        },
        "moduleName": "em-dashboard/templates/components/top-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "aria-expanded", "false");
        dom.setAttribute(el1, "role", "button");
        dom.setAttribute(el1, "tabindex", "0");
        dom.setAttribute(el1, "class", "mdl-layout__drawer-button");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "id", "nav-open-button");
        dom.setAttribute(el2, "class", "material-icons");
        var el3 = dom.createTextNode("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "mdl-layout__header-row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "mdl-layout-title");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 0, 0);
        return morphs;
      },
      statements: [["content", "title", ["loc", [null, [6, 33], [6, 44]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("em-dashboard/templates/employees", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "em-dashboard/templates/employees.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        dom.setAttribute(el1, "class", "mdl-layout__content");
        dom.setAttribute(el1, "style", "text-align: center;");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "pieContainer");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "donutchart");
        dom.setAttribute(el3, "style", "width: 600px; height: 400px; margin: auto;");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("hr");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createElement("strong");
        var el4 = dom.createTextNode("Employee Locations");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "map-canvas");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    \n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        return morphs;
      },
      statements: [["inline", "top-bar", [], ["title", "Employees"], ["loc", [null, [7, 0], [7, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("em-dashboard/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 85,
            "column": 0
          }
        },
        "moduleName": "em-dashboard/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        dom.setAttribute(el1, "class", "mdl-layout__content mdl-color--grey-100");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "mdl-grid demo-content");
        var el3 = dom.createTextNode("\n  \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el4 = dom.createElement("svg");
        dom.setAttribute(el4, "fill", "currentColor");
        dom.setAttribute(el4, "width", "200px");
        dom.setAttribute(el4, "height", "200px");
        dom.setAttribute(el4, "viewBox", "0 0 1 1");
        dom.setAttribute(el4, "class", "demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("use");
        dom.setAttributeNS(el5, "http://www.w3.org/1999/xlink", "xlink:href", "#piechart");
        dom.setAttribute(el5, "mask", "url(#piemask)");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "x", "0.5");
        dom.setAttribute(el5, "y", "0.5");
        dom.setAttribute(el5, "font-family", "Roboto");
        dom.setAttribute(el5, "font-size", "0.3");
        dom.setAttribute(el5, "fill", "#888");
        dom.setAttribute(el5, "text-anchor", "middle");
        dom.setAttribute(el5, "dy", "0.1");
        var el6 = dom.createTextNode("82");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tspan");
        dom.setAttribute(el6, "font-size", "0.2");
        dom.setAttribute(el6, "dy", "-0.07");
        var el7 = dom.createTextNode("%");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("svg");
        dom.setAttribute(el4, "fill", "currentColor");
        dom.setAttribute(el4, "width", "200px");
        dom.setAttribute(el4, "height", "200px");
        dom.setAttribute(el4, "viewBox", "0 0 1 1");
        dom.setAttribute(el4, "class", "demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("use");
        dom.setAttributeNS(el5, "http://www.w3.org/1999/xlink", "xlink:href", "#piechart");
        dom.setAttribute(el5, "mask", "url(#piemask)");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "x", "0.5");
        dom.setAttribute(el5, "y", "0.5");
        dom.setAttribute(el5, "font-family", "Roboto");
        dom.setAttribute(el5, "font-size", "0.3");
        dom.setAttribute(el5, "fill", "#888");
        dom.setAttribute(el5, "text-anchor", "middle");
        dom.setAttribute(el5, "dy", "0.1");
        var el6 = dom.createTextNode("82");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tspan");
        dom.setAttribute(el6, "dy", "-0.07");
        dom.setAttribute(el6, "font-size", "0.2");
        var el7 = dom.createTextNode("%");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("svg");
        dom.setAttribute(el4, "fill", "currentColor");
        dom.setAttribute(el4, "width", "200px");
        dom.setAttribute(el4, "height", "200px");
        dom.setAttribute(el4, "viewBox", "0 0 1 1");
        dom.setAttribute(el4, "class", "demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("use");
        dom.setAttributeNS(el5, "http://www.w3.org/1999/xlink", "xlink:href", "#piechart");
        dom.setAttribute(el5, "mask", "url(#piemask)");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "x", "0.5");
        dom.setAttribute(el5, "y", "0.5");
        dom.setAttribute(el5, "font-family", "Roboto");
        dom.setAttribute(el5, "font-size", "0.3");
        dom.setAttribute(el5, "fill", "#888");
        dom.setAttribute(el5, "text-anchor", "middle");
        dom.setAttribute(el5, "dy", "0.1");
        var el6 = dom.createTextNode("82");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tspan");
        dom.setAttribute(el6, "dy", "-0.07");
        dom.setAttribute(el6, "font-size", "0.2");
        var el7 = dom.createTextNode("%");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("svg");
        dom.setAttribute(el4, "fill", "currentColor");
        dom.setAttribute(el4, "width", "200px");
        dom.setAttribute(el4, "height", "200px");
        dom.setAttribute(el4, "viewBox", "0 0 1 1");
        dom.setAttribute(el4, "class", "demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("use");
        dom.setAttributeNS(el5, "http://www.w3.org/1999/xlink", "xlink:href", "#piechart");
        dom.setAttribute(el5, "mask", "url(#piemask)");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "x", "0.5");
        dom.setAttribute(el5, "y", "0.5");
        dom.setAttribute(el5, "font-family", "Roboto");
        dom.setAttribute(el5, "font-size", "0.3");
        dom.setAttribute(el5, "fill", "#888");
        dom.setAttribute(el5, "text-anchor", "middle");
        dom.setAttribute(el5, "dy", "0.1");
        var el6 = dom.createTextNode("82");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tspan");
        dom.setAttribute(el6, "dy", "-0.07");
        dom.setAttribute(el6, "font-size", "0.2");
        var el7 = dom.createTextNode("%");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.setNamespace(null);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el4 = dom.createElement("svg");
        dom.setAttribute(el4, "fill", "currentColor");
        dom.setAttribute(el4, "viewBox", "0 0 500 250");
        dom.setAttribute(el4, "class", "demo-graph");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("use");
        dom.setAttributeNS(el5, "http://www.w3.org/1999/xlink", "xlink:href", "#chart");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("svg");
        dom.setAttribute(el4, "fill", "currentColor");
        dom.setAttribute(el4, "viewBox", "0 0 500 250");
        dom.setAttribute(el4, "class", "demo-graph");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("use");
        dom.setAttributeNS(el5, "http://www.w3.org/1999/xlink", "xlink:href", "#chart");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.setNamespace(null);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "mdl-card__title mdl-card--expand mdl-color--teal-300");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6, "class", "mdl-card__title-text");
        var el7 = dom.createTextNode("Updates");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "mdl-card__supporting-text mdl-color-text--grey-600");
        var el6 = dom.createTextNode("\n          Non dolore elit adipisicing ea reprehenderit consectetur culpa.\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "mdl-card__actions mdl-card--border");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        dom.setAttribute(el6, "class", "mdl-button mdl-js-button mdl-js-ripple-effect");
        var el7 = dom.createTextNode("Read More");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "demo-separator mdl-cell--1-col");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "demo-options mdl-card mdl-color--deep-purple-500 mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "mdl-card__supporting-text mdl-color-text--blue-grey-50");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h3");
        var el7 = dom.createTextNode("View options");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("label");
        dom.setAttribute(el8, "for", "chkbox1");
        dom.setAttribute(el8, "class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("input");
        dom.setAttribute(el9, "type", "checkbox");
        dom.setAttribute(el9, "id", "chkbox1");
        dom.setAttribute(el9, "class", "mdl-checkbox__input");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("span");
        dom.setAttribute(el9, "class", "mdl-checkbox__label");
        var el10 = dom.createTextNode("Click per object");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("label");
        dom.setAttribute(el8, "for", "chkbox2");
        dom.setAttribute(el8, "class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("input");
        dom.setAttribute(el9, "type", "checkbox");
        dom.setAttribute(el9, "id", "chkbox2");
        dom.setAttribute(el9, "class", "mdl-checkbox__input");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("span");
        dom.setAttribute(el9, "class", "mdl-checkbox__label");
        var el10 = dom.createTextNode("Views per object");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("label");
        dom.setAttribute(el8, "for", "chkbox3");
        dom.setAttribute(el8, "class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("input");
        dom.setAttribute(el9, "type", "checkbox");
        dom.setAttribute(el9, "id", "chkbox3");
        dom.setAttribute(el9, "class", "mdl-checkbox__input");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("span");
        dom.setAttribute(el9, "class", "mdl-checkbox__label");
        var el10 = dom.createTextNode("Objects selected");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("label");
        dom.setAttribute(el8, "for", "chkbox4");
        dom.setAttribute(el8, "class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("input");
        dom.setAttribute(el9, "type", "checkbox");
        dom.setAttribute(el9, "id", "chkbox4");
        dom.setAttribute(el9, "class", "mdl-checkbox__input");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("span");
        dom.setAttribute(el9, "class", "mdl-checkbox__label");
        var el10 = dom.createTextNode("Objects viewed");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "mdl-card__actions mdl-card--border");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        dom.setAttribute(el6, "class", "mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-50");
        var el7 = dom.createTextNode("Change location");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "mdl-layout-spacer");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons");
        var el7 = dom.createTextNode("location_on");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "top-bar", [], ["title", ["subexpr", "@mut", [["get", "model.title", ["loc", [null, [1, 17], [1, 28]]]]], [], []]], ["loc", [null, [1, 0], [1, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("em-dashboard/templates/issue-graph", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "em-dashboard/templates/issue-graph.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        dom.setAttribute(el1, "class", "mdl-layout__content");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "curve_chart");
        dom.setAttribute(el2, "style", "margin: auto; width: 700px; height: 300px;");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("hr");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "barchart_values");
        dom.setAttribute(el2, "style", "margin: auto; width: 600px; height: 300px;");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "top-bar", [], ["title", "Issue Graph"], ["loc", [null, [6, 0], [6, 33]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("em-dashboard/templates/issues", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 63,
                "column": 8
              },
              "end": {
                "line": 74,
                "column": 8
              }
            },
            "moduleName": "em-dashboard/templates/issues.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("tr");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2, "class", "mdl-data-table__cell--non-numeric");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2, "class", "mdl-data-table__cell--non-numeric");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2, "class", "mdl-data-table__cell--non-numeric");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2, "class", "mdl-data-table__cell--non-numeric");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2, "class", "mdl-data-table__cell--non-numeric");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2, "class", "mdl-data-table__cell--non-numeric");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(8);
            morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
            morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
            morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
            morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
            morphs[4] = dom.createMorphAt(dom.childAt(element0, [9]), 0, 0);
            morphs[5] = dom.createMorphAt(dom.childAt(element0, [11]), 0, 0);
            morphs[6] = dom.createMorphAt(dom.childAt(element0, [13]), 0, 0);
            morphs[7] = dom.createMorphAt(dom.childAt(element0, [15]), 0, 0);
            return morphs;
          },
          statements: [["content", "data.id", ["loc", [null, [65, 16], [65, 29]]]], ["content", "data.status_open", ["loc", [null, [66, 58], [66, 80]]]], ["inline", "limitCharacters", [["get", "data.description", ["loc", [null, [67, 77], [67, 93]]]]], [], ["loc", [null, [67, 58], [67, 96]]]], ["content", "data.customer_name", ["loc", [null, [68, 58], [68, 82]]]], ["content", "data.customer_email", ["loc", [null, [69, 58], [69, 83]]]], ["content", "data.submitted_at", ["loc", [null, [70, 16], [70, 39]]]], ["content", "data.employee_name", ["loc", [null, [71, 58], [71, 82]]]], ["inline", "checkIfclosed", [["get", "data.status_open", ["loc", [null, [72, 75], [72, 91]]]]], ["date", ["subexpr", "@mut", [["get", "data.closed_at", ["loc", [null, [72, 97], [72, 111]]]]], [], []]], ["loc", [null, [72, 58], [72, 114]]]]],
          locals: ["data"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 4
            },
            "end": {
              "line": 78,
              "column": 4
            }
          },
          "moduleName": "em-dashboard/templates/issues.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    \n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "id", "table-id");
          dom.setAttribute(el4, "class", "table-header");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el5, "role", "presentation");
          var el6 = dom.createTextNode("keyboard_arrow_down");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("ID\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "id", "table-status");
          dom.setAttribute(el4, "class", "mdl-data-table__cell--non-numeric table-header");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el5, "role", "presentation");
          var el6 = dom.createTextNode("keyboard_arrow_down");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("Status\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "id", "table-description");
          dom.setAttribute(el4, "class", "mdl-data-table__cell--non-numeric table-header");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el5, "role", "presentation");
          var el6 = dom.createTextNode("keyboard_arrow_down");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("Description\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "id", "table-customer");
          dom.setAttribute(el4, "class", "mdl-data-table__cell--non-numeric table-header");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el5, "role", "presentation");
          var el6 = dom.createTextNode("keyboard_arrow_down");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("Customer\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "id", "table-customer-email");
          dom.setAttribute(el4, "class", "mdl-data-table__cell--non-numeric table-header");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el5, "role", "presentation");
          var el6 = dom.createTextNode("keyboard_arrow_down");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("Customer Email\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "id", "table-submitted");
          dom.setAttribute(el4, "class", "table-header");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el5, "role", "presentation");
          var el6 = dom.createTextNode("keyboard_arrow_down");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("Submitted\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "id", "table-employee");
          dom.setAttribute(el4, "class", "mdl-data-table__cell--non-numeric table-header");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el5, "role", "presentation");
          var el6 = dom.createTextNode("keyboard_arrow_down");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("Employee\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "id", "table-closed");
          dom.setAttribute(el4, "class", "mdl-data-table__cell--non-numeric table-header");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el5, "role", "presentation");
          var el6 = dom.createTextNode("keyboard_arrow_down");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("Closed\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(element1, [1, 1]);
          var element3 = dom.childAt(element2, [1]);
          var element4 = dom.childAt(element2, [3]);
          var element5 = dom.childAt(element2, [5]);
          var element6 = dom.childAt(element2, [7]);
          var element7 = dom.childAt(element2, [9]);
          var element8 = dom.childAt(element2, [11]);
          var element9 = dom.childAt(element2, [13]);
          var element10 = dom.childAt(element2, [15]);
          var morphs = new Array(9);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createElementMorph(element4);
          morphs[2] = dom.createElementMorph(element5);
          morphs[3] = dom.createElementMorph(element6);
          morphs[4] = dom.createElementMorph(element7);
          morphs[5] = dom.createElementMorph(element8);
          morphs[6] = dom.createElementMorph(element9);
          morphs[7] = dom.createElementMorph(element10);
          morphs[8] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
          return morphs;
        },
        statements: [["element", "action", ["sortBy", "id", "#table-id"], [], ["loc", [null, [29, 30], [29, 66]]]], ["element", "action", ["sortBy", "status_open", "#table-status"], [], ["loc", [null, [33, 34], [33, 83]]]], ["element", "action", ["sortBy", "description", "#table-description"], [], ["loc", [null, [37, 39], [37, 93]]]], ["element", "action", ["sortBy", "customer_name", "#table-customer"], [], ["loc", [null, [41, 36], [41, 89]]]], ["element", "action", ["sortBy", "customer_email", "#table-customer-email"], [], ["loc", [null, [45, 42], [45, 102]]]], ["element", "action", ["sortBy", "submitted_at", "#table-submitted"], [], ["loc", [null, [49, 37], [49, 90]]]], ["element", "action", ["sortBy", "employee_name", "#table-employee"], [], ["loc", [null, [53, 36], [53, 89]]]], ["element", "action", ["sortBy", "closed_at", "#table-closed"], [], ["loc", [null, [57, 34], [57, 81]]]], ["block", "each", [["get", "filteredResults", ["loc", [null, [63, 16], [63, 31]]]]], [], 0, null, ["loc", [null, [63, 8], [74, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 78,
              "column": 4
            },
            "end": {
              "line": 82,
              "column": 4
            }
          },
          "moduleName": "em-dashboard/templates/issues.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "no-result");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createTextNode("None ...");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 85,
            "column": 7
          }
        },
        "moduleName": "em-dashboard/templates/issues.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        dom.setAttribute(el1, "class", "mdl-layout__content mdl-color--grey-100");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "mdl-grid demo-content");
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-textfield");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element11 = dom.childAt(fragment, [3, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element11, [1]), 1, 1);
        morphs[2] = dom.createMorphAt(element11, 3, 3);
        return morphs;
      },
      statements: [["inline", "top-bar", [], ["title", "Issues"], ["loc", [null, [15, 0], [15, 28]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "filterText", ["loc", [null, [21, 18], [21, 28]]]]], [], []], "type", "text", "placeholder", "Filter ...", "class", "mdl-textfield__input"], ["loc", [null, [21, 4], [21, 96]]]], ["block", "if", [["get", "filteredResults", ["loc", [null, [24, 10], [24, 25]]]]], [], 0, 1, ["loc", [null, [24, 4], [82, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('em-dashboard/config/environment', ['ember'], function(Ember) {
  var prefix = 'em-dashboard';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("em-dashboard/app")["default"].create({"name":"em-dashboard","version":"0.0.0+31c7ec87"});
}

/* jshint ignore:end */
//# sourceMappingURL=em-dashboard.map