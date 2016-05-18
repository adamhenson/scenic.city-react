import GlobalConstants from '../constants/GlobalConstants.js';
import InfiniteListing from '../components/listing/InfiniteListing.react.js';

export default {

  bindDOMEvents() {
    $('.photos figure > a').lighterbox();
    
    $('.ac-gn-menuicon').on('click', (e) => {
      e.preventDefault();
      $(e.target).closest('.header--main').toggleClass('header__main--nav-active');
    });
  },

  renderDOM(component) {
    if(component === GlobalConstants.Components.LISTING) {
      let $el = $('<div/>', {
        'class' : 'react-dom--listings'
      });

      $el.appendTo('.main--page');

      ReactDOM.render(
        <InfiniteListing />,
        $el[0]
      );
    }
  }

};