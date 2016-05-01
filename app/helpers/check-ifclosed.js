import Ember from 'ember';

export function checkIfclosed(isOpen, hash) {
  if (isOpen[0] === true) {
    return 'N/A';
  } else {
    return hash.date;
  }
}

export default Ember.Helper.helper(checkIfclosed);
