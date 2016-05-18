import ListingItem from './ListingItem.react.js';

class Listing extends React.Component {

  render() {
    let listings = this.props.data;

    let items = listings.map((listing) => {
      return <ListingItem data={listing} key={listing._id} />;
    });

    return <div>{items}</div>;
  }

}
 
export default Listing;
