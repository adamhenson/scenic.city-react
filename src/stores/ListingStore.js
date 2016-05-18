import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import GlobalConstants from '../constants/GlobalConstants.js';

const CHANGE_EVENT = 'change';

let loading = false;
let data = {};
let message = {};
let scroll = true;
let sorted = false;

/**
 * Receive a payload, analyze, and delegate to stores.
 * @param  {object} payload An object containing message, http, and/or
 *    component data. This data is delegated to stores.
 */
function receive(payload) {
  if(payload.data) {
    if(data[payload.component]) {
      data[payload.component] = Object.assign(data[payload.component], payload.data);
    } else {
      let componentData = {
        [payload.component] : payload.data
      };

      if(!payload.data || !payload.data.length) {
        scroll = false;
      } else {
        scroll = true;
      }

      data = Object.assign(data, componentData);
    }
  } else if(payload.body) {
    message = payload;
  }
}

let ListingStore = Object.assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Get all listing data.
   */
  getAll() {
    return {
      'data' : data,
      'loading' : loading,
      'message' : message,
      'scroll' : scroll
    };
  }

});

AppDispatcher.register((action) => {

  switch(action.actionType) {

    case GlobalConstants.Actions.LISTING_RESET:
      loading = true;
      data = {};
      ListingStore.emitChange();
      break;

    case GlobalConstants.Actions.SAVE:
      loading = true;
      ListingStore.emitChange();
      break;

    case GlobalConstants.Actions.RECEIVE:
      receive(action.payload);
      loading = false;
      ListingStore.emitChange();
      break;

    default:
      // no op

  }

});

export default ListingStore;