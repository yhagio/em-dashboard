define('em-dashboard/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('em-dashboard/tests/components/side-nav.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/side-nav.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/side-nav.js should pass jshint.\ncomponents/side-nav.js: line 7, col 9, \'e\' is defined but never used.\ncomponents/side-nav.js: line 8, col 9, \'$\' is not defined.\ncomponents/side-nav.js: line 9, col 7, \'$\' is not defined.\n\n3 errors');
  });
});
define('em-dashboard/tests/components/top-bar.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/top-bar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/top-bar.js should pass jshint.\ncomponents/top-bar.js: line 9, col 11, \'$\' is not defined.\ncomponents/top-bar.js: line 10, col 9, \'$\' is not defined.\ncomponents/top-bar.js: line 12, col 9, \'$\' is not defined.\ncomponents/top-bar.js: line 15, col 11, \'$\' is not defined.\ncomponents/top-bar.js: line 16, col 9, \'$\' is not defined.\n\n5 errors');
  });
});
define('em-dashboard/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass jshint.\ncontrollers/application.js: line 6, col 27, Missing semicolon.\n\n1 error');
  });
});
define('em-dashboard/tests/controllers/employees.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/employees.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/employees.js should pass jshint.');
  });
});
define('em-dashboard/tests/controllers/issues.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/issues.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/issues.js should pass jshint.\ncontrollers/issues.js: line 15, col 9, \'$\' is not defined.\ncontrollers/issues.js: line 19, col 9, \'$\' is not defined.\ncontrollers/issues.js: line 23, col 7, \'$\' is not defined.\ncontrollers/issues.js: line 26, col 14, \'$\' is not defined.\ncontrollers/issues.js: line 26, col 61, \'$\' is not defined.\ncontrollers/issues.js: line 27, col 11, \'$\' is not defined.\ncontrollers/issues.js: line 32, col 13, \'$\' is not defined.\ncontrollers/issues.js: line 33, col 9, \'$\' is not defined.\n\n8 errors');
  });
});
define('em-dashboard/tests/helpers/check-ifclosed.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/check-ifclosed.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/check-ifclosed.js should pass jshint.');
  });
});
define('em-dashboard/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('em-dashboard/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('em-dashboard/tests/helpers/limit-characters.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/limit-characters.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/limit-characters.js should pass jshint.');
  });
});
define('em-dashboard/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'em-dashboard/tests/helpers/start-app', 'em-dashboard/tests/helpers/destroy-app'], function (exports, _qunit, _emDashboardTestsHelpersStartApp, _emDashboardTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _emDashboardTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _emDashboardTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('em-dashboard/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('em-dashboard/tests/helpers/resolver', ['exports', 'em-dashboard/resolver', 'em-dashboard/config/environment'], function (exports, _emDashboardResolver, _emDashboardConfigEnvironment) {

  var resolver = _emDashboardResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _emDashboardConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emDashboardConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('em-dashboard/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('em-dashboard/tests/helpers/start-app', ['exports', 'ember', 'em-dashboard/app', 'em-dashboard/config/environment'], function (exports, _ember, _emDashboardApp, _emDashboardConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _emDashboardConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _emDashboardApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('em-dashboard/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('em-dashboard/tests/integration/components/side-nav-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('side-nav', 'Integration | Component | side nav', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 12
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'side-nav', ['loc', [null, [1, 0], [1, 12]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'side-nav', [], [], 0, null, ['loc', [null, [2, 4], [4, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('em-dashboard/tests/integration/components/side-nav-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/side-nav-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/side-nav-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/integration/components/top-bar-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('top-bar', 'Integration | Component | top bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 11
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'top-bar', ['loc', [null, [1, 0], [1, 11]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'top-bar', [], [], 0, null, ['loc', [null, [2, 4], [4, 16]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('em-dashboard/tests/integration/components/top-bar-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/top-bar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/top-bar-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('em-dashboard/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('em-dashboard/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass jshint.\nroutes/application.js: line 5, col 5, \'google\' is not defined.\n\n1 error');
  });
});
define('em-dashboard/tests/routes/employees.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/employees.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/employees.js should pass jshint.\nroutes/employees.js: line 46, col 51, Expected an assignment or function call and instead saw an expression.\nroutes/employees.js: line 47, col 59, Expected an assignment or function call and instead saw an expression.\nroutes/employees.js: line 48, col 53, Expected an assignment or function call and instead saw an expression.\nroutes/employees.js: line 49, col 53, Expected an assignment or function call and instead saw an expression.\nroutes/employees.js: line 6, col 12, \'$\' is not defined.\nroutes/employees.js: line 53, col 3, \'google\' is not defined.\nroutes/employees.js: line 54, col 3, \'google\' is not defined.\nroutes/employees.js: line 59, col 16, \'google\' is not defined.\nroutes/employees.js: line 71, col 22, \'google\' is not defined.\nroutes/employees.js: line 77, col 16, \'google\' is not defined.\nroutes/employees.js: line 91, col 21, \'google\' is not defined.\n\n11 errors');
  });
});
define('em-dashboard/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('em-dashboard/tests/routes/issue-graph.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/issue-graph.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/issue-graph.js should pass jshint.\nroutes/issue-graph.js: line 34, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 35, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 36, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 37, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 38, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 39, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 40, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 41, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 42, col 37, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 43, col 38, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 44, col 39, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 45, col 39, Expected an assignment or function call and instead saw an expression.\nroutes/issue-graph.js: line 52, col 7, \'customerNumbers\' is defined but never used.\nroutes/issue-graph.js: line 106, col 15, Missing semicolon.\nroutes/issue-graph.js: line 6, col 12, \'Em\' is not defined.\nroutes/issue-graph.js: line 7, col 18, \'$\' is not defined.\nroutes/issue-graph.js: line 17, col 15, \'$\' is not defined.\nroutes/issue-graph.js: line 66, col 3, \'google\' is not defined.\nroutes/issue-graph.js: line 69, col 16, \'google\' is not defined.\nroutes/issue-graph.js: line 91, col 21, \'google\' is not defined.\nroutes/issue-graph.js: line 110, col 3, \'google\' is not defined.\nroutes/issue-graph.js: line 113, col 16, \'google\' is not defined.\nroutes/issue-graph.js: line 119, col 20, \'google\' is not defined.\nroutes/issue-graph.js: line 125, col 21, \'google\' is not defined.\n\n24 errors');
  });
});
define('em-dashboard/tests/routes/issues.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/issues.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/issues.js should pass jshint.\nroutes/issues.js: line 5, col 12, \'$\' is not defined.\n\n1 error');
  });
});
define('em-dashboard/tests/test-helper', ['exports', 'em-dashboard/tests/helpers/resolver', 'ember-qunit'], function (exports, _emDashboardTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_emDashboardTestsHelpersResolver['default']);
});
define('em-dashboard/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/controllers/employees-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:employees', 'Unit | Controller | employees', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('em-dashboard/tests/unit/controllers/employees-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/employees-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/employees-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/controllers/issues-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:issues', 'Unit | Controller | issues', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('em-dashboard/tests/unit/controllers/issues-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/issues-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/issues-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/helpers/check-ifclosed-test', ['exports', 'em-dashboard/helpers/check-ifclosed', 'qunit'], function (exports, _emDashboardHelpersCheckIfclosed, _qunit) {

  (0, _qunit.module)('Unit | Helper | check ifclosed');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _emDashboardHelpersCheckIfclosed.checkIfclosed)([42]);
    assert.ok(result);
  });
});
define('em-dashboard/tests/unit/helpers/check-ifclosed-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/helpers/check-ifclosed-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/check-ifclosed-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/helpers/limit-characters-test', ['exports', 'em-dashboard/helpers/limit-characters', 'qunit'], function (exports, _emDashboardHelpersLimitCharacters, _qunit) {

  (0, _qunit.module)('Unit | Helper | limit characters');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _emDashboardHelpersLimitCharacters.limitCharacters)([42]);
    assert.ok(result);
  });
});
define('em-dashboard/tests/unit/helpers/limit-characters-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/helpers/limit-characters-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/limit-characters-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('em-dashboard/tests/unit/routes/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/routes/employees-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:employees', 'Unit | Route | employees', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('em-dashboard/tests/unit/routes/employees-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/employees-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/employees-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('em-dashboard/tests/unit/routes/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/routes/issue-graph-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:issue-graph', 'Unit | Route | issue graph', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('em-dashboard/tests/unit/routes/issue-graph-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/issue-graph-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/issue-graph-test.js should pass jshint.');
  });
});
define('em-dashboard/tests/unit/routes/issues-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:issues', 'Unit | Route | issues', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('em-dashboard/tests/unit/routes/issues-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/issues-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/issues-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('em-dashboard/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map