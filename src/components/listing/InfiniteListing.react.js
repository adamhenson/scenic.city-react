import classNames from 'classnames';
import Listing from './Listing.react.js';
import ListingActions from '../../actions/ListingActions.js';
import ListingStore from '../../stores/ListingStore.js';
import Select from '../Select.react.js';

function getStateFromStores() {
  return ListingStore.getAll();
}

class InfiniteListing extends React.Component {

  constructor(props) {
    super(props);

    this.bindEvents = this.bindEvents.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    this.state = {
      'limit' : APP.loadObject.listing.limit,
      'loading' : false,
      'page' : 1,
      'sort' : APP.loadObject.listing.sort,
      'store' : getStateFromStores(),
      'subtype' : APP.loadObject.listing.subtype,
      'type' : APP.loadObject.listing.type
    };
  }

  componentDidMount() {
    ListingStore.addChangeListener(this.onChange);
    this.bindEvents();
    ListingActions.reset(this.state);
  }

  componentWillUnmount() {
    ListingStore.removeChangeListener(this.onChange);
  }

  render() {
    let self = this;
    let items = [];
    let classObject = {
      'listing' : true,
      'listing--loading' : (this.state.loading)
    };
    let classes = classNames(classObject);

    if(self.state.store && self.state.store.data && self.state.store.data) {
      items = Object.keys(self.state.store.data).map(key => {
        return <Listing data={self.state.store.data[key]} key={key} name={key} />;
      });
    }

    return (
      <div className={classes}>
        <label className='select-helper'>
          <Select className='listing__select' onSelect={this.onSelect} options={APP.loadObject.listing.sortOptions} />
        </label>
        <div className='listing__list'>{items}</div>
        <div className='spinner'></div>
      </div>
    );
  }

  bindEvents() {
    $(window).scroll(() => {
      if(!this.state.loading && this.state.store.scroll && $(window).scrollTop() + $(window).height() > $(document).height() - 250) {
        this.state.page++;

        // we use `setState` to change the DOM to a loading state
        // primarily for the preloader.
        this.setState({
          'loading' : true
        });

        ListingActions.refresh(this.state);
      }
    });
  }

  onChange() {
    let store = getStateFromStores();
    this.setState({
      'loading' : store.loading,
      'store' : store
    });
  }

  onSelect(event) {
    this.state.page = 1;
    this.state.sort = $(event.target).val();

    ListingActions.reset(this.state);
  }

}
 
export default InfiniteListing;
