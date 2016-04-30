import Ember from 'ember';

export function limitCharacters(params/*, hash*/) {
  if (params[0].length > 70) {
    return params[0].slice(0, 70) + '...';
  }
  return params[0];
}

export default Ember.Helper.helper(limitCharacters);
