import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // return $.getJSON('./data/issues.json');

    // Initial Load
    // return $.getJSON('./data/issues.json')
    //   .then((data) => {
    //     return data;
    //   });

    // Fetch new data every 3 seconds
    // if route changes, it stops polling
    // let getHandleIssuesData = function() {
    //   if (window.location.pathname !== '/issues') {
    //     console.log('Cancelled polling issues data')
    //     return clearInterval(getHandleIssuesData);
    //   }
    //   console.log('Polling issues data');
    //   return $.getJSON('./data/issues.json');
    // };

    // return setInterval(getHandleIssuesData, 1000);



    // Fetch new data every 3 seconds with Ember.run.later 
    let pollIssues = Ember.run.later(this, function() {
      this.model().then()
          .then(function(data) {
            console.log('Polling issues data');
            this.controller.set('model', data);
          }.bind(this));
    }, 3000);

    // Cancel polling issues data when route changes, but
    // make delay it 300ms make sure to route changed before cancelling it
    setTimeout(() => {
      if (window.location.pathname !== '/issues') {
        console.log('Cancelled polling issues data');
        Ember.run.cancel(pollIssues);
      }
    }, 300);

    return Ember.$.get('./data/issues.json');

  }
});
