import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('employees');
  this.route('issues');
  this.route('issue-graph');
});

export default Router;
