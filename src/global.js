import GlobalUtils from './utils/GlobalUtils.js';
import GlobalConstants from './constants/GlobalConstants.js';

{

  if(APP && APP.loadObject && APP.loadObject.listing) {
    GlobalUtils.renderDOM(GlobalConstants.Components.LISTING);
  }

  GlobalUtils.bindDOMEvents();

};