import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return $.getJSON('/data/issues.json');
    // console.log('ISSUES: ', issues);
    // return { title: 'Issues', issues }
  }
});
