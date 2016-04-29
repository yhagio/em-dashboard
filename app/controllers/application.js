import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    closeNav(e) {
      console.log(this, e)
    }
  }
});