import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['id:asc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties'),
  sortAscending: false,

  actions: {
    // property: the table column you want to sort by
    // id: the id of the header of the table you want to sort
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
      }
    }
  },

  // Filter features
  // Can filter the table by either customer's name, description, or employee's name
  filterText: '',
  filteredResults: function() {
    var filterWord = this.get('filterText');
    if (filterWord.length > 0) {

      return this.get('sortedModel').filter((item) => {
        return item.customer_name.toLowerCase().indexOf(filterWord) !== -1 ||
               item.description.toLowerCase().indexOf(filterWord) !== -1 ||
               item.employee_name.toLowerCase().indexOf(filterWord) !== -1;
      });
    }
    return this.get('sortedModel');
  }.property('filterText', 'sortedModel')
});
