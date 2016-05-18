import AppDispatcher from '../dispatcher/AppDispatcher.js';
import GlobalConstants from '../constants/GlobalConstants.js';
import GlobalActions from '../actions/GlobalActions.js';

let ListingActions = {

  /**
   * Refresh listing content
   * @param  {object} data Object containing data to refresh with.
   */
  refresh(data) {
    let basePart = GlobalConstants.urls.EVENT_GET;
    let secondPart = '';

    if(data.type === 'place') {
      basePart = GlobalConstants.urls.PLACE_GET;
      secondPart = '/' + data.subtype;
    }

    let url = `${basePart}${secondPart}/${data.sort}/${data.limit}/${data.page}`;
    let component = `${GlobalConstants.Components.LISTING}_${data.sort}_${data.page}`;

    AppDispatcher.dispatch({
      'actionType' : GlobalConstants.Actions.LISTING_REFRESH,
    });

    GlobalActions.get(url, component);
  },

  /**
   * Reset listing content
   * @param  {object} data Object containing data to refresh with.
   */
  reset(data) {
    AppDispatcher.dispatch({
      'actionType' : GlobalConstants.Actions.LISTING_RESET
    });

    ListingActions.refresh(data);
  }

};

export default ListingActions;
