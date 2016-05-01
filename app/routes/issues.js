import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return $.getJSON('https://raw.githubusercontent.com/yhagio/em-dashboard/gh-pages/dist/data/issues.json');
  }
});
