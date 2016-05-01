import Ember from 'ember';

export default Ember.Route.extend({
  // beforeModel() {
  //   this.transitionTo('employees');
  // },
  model() {
    return { title: 'Home' };
  }
});
