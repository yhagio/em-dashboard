import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['id:asc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties'),
  sortAscending: false,
  // selectedProperty: 'id:asc',
  // theFilter: "",

  // checkFilterMatch(theObject, str) {
  //   let field, match;
  //   match = false;
  //   for (field in theObject) {
  //     if (theObject[field].toString().slice(0, str.length) === str) {
  //       match = true;
  //     }
  //   }
  //   return match;
  // },

  // filteredIssues() {
  //   return this.get("arrangedContent").filter((_this) => {
  //     return (theObject, index, enumerable) => {
  //       if (_this.get("theFilter")) {
  //         return _this.checkFilterMatch(theObject, _this.get("theFilter"));
  //       } else {
  //         return true;
  //       }
  //     };
  //   })(this);
  // }.property("theFilter", "sortProperties"),


  actions: {
    sortBy(property, id) {

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
      $('.table-header').each((i, el) => {
        // Check all the table header elements and if it is not
        // the clicked element, remove 'selected-column' from it
        if ( $(el).hasClass('selected-column') === true && !$(el).is(id) ) {
          $(el).removeClass('selected-column');
        }
      });
      
      // If clicked column does not 'selected-column', add the class
      if ( !$(id).hasClass('selected-column') ) {
        $(id).addClass('selected-column');
        // if ($(id).children().text() === 'keyboard_arrow_down') {
        //   $(id).children().text('keyboard_arrow_up');
        // } else {
        //   $(id).children().text('keyboard_arrow_down');
        // }
      }
    }
  }
});
