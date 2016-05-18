import AppDispatcher from '../dispatcher/AppDispatcher.js';
import GlobalConstants from '../constants/GlobalConstants.js';
import WebAPIUtils from '../utils/WebAPIUtils.js';
import FileAPIUtils from '../utils/FileAPIUtils.js';

let GlobalActions = {

  /**
   * Get data from via http GET request. This action simply
   *    executes the request. The response is then delegated 
   *    via the `receive` action.
   * @param  {object} url A URL to make the GET request with.
   * @param  {object} component A React component class name.
   */
  get(url, component) {
    AppDispatcher.dispatch({
      'actionType' : GlobalConstants.Actions.GET,
      'component' : component
    });

    WebAPIUtils.get(url, component);
  },

  /**
   * Save data from a submitted form, via http POST, PUT, or DELETE
   *    request. This action simply executes the request. The response
   *    is then delegated via the `receive` action.
   * @param  {object} event An event object. This should be a change
   *    event from a file input.
   * @param  {object} component A React component class name.
   */
  save(event, component) {
    AppDispatcher.dispatch({
      'actionType' : GlobalConstants.Actions.SAVE,
      'component' : component
    });

    WebAPIUtils.save(event, component);
  },

  /**
   * Get image file from an input on change invoked by input. This action
   * simply executes the file API method to get the file. The data that
   * is retrieved is delegated via the `receive` method.
   * @param  {object} event An event object. This should be a change
   *    event from a file input.
   * @param  {object} component A React component class name.
   */
  getImageFile(event, component) {
    AppDispatcher.dispatch({
      'actionType' : GlobalConstants.Actions.GET_IMAGE_FILE,
      'component' : component
    });

    FileAPIUtils.getImageFile(event, component);
  },

  /**
   * Receive a payload, analyze, and delegate to stores.
   * @param  {object} payload An object containing message, http, and/or
   *    component data. This data is delegated to stores.
   */
  receive(payload) {
    AppDispatcher.dispatch({
      'actionType' : GlobalConstants.Actions.RECEIVE,
      'payload' : payload
    });
  }

};

export default GlobalActions;
