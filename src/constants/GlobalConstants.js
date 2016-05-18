import keyMirror from 'keymirror';

let GlobalConstants = {
  'copy' : {},
  'urls' : {
    'CACHE' : '/cache?url=',
    'DETAILS_EVENT' : '/detail/event/',
    'DETAILS_PLACE' : '/detail/place/',
    'EVENT_GET' : '/api/event',
    'PLACE_GET' : '/api/place'
  }
}

GlobalConstants.Actions = keyMirror({
  GET : null,
  LISTING_RESET : null,
	SAVE : null,
  RECEIVE : null,
});

GlobalConstants.Components = keyMirror({
  LISTING : null
});

export default GlobalConstants;