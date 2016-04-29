import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: 'demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600',

  click(e) {
    if (e.target.id === 'nav-open-button') {
      if ($('#side-nav').hasClass('is-visible')) {
        $('#side-nav').removeClass('is-visible');
      } else {
        $('#side-nav').addClass('is-visible');
      }
    } else {
      if ($('#side-nav').hasClass('is-visible')) {
        $('#side-nav').removeClass('is-visible');
      }
    }
  }
});
