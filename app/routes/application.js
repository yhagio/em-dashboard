import Ember from 'ember';

export default Ember.Route.extend({
  init() {
    google.charts.load('current', {'packages': ['geomap', 'corechart']});
  }
});
