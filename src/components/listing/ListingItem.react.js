import classNames from 'classnames';
import ColumnImage from '../ColumnImage.react.js';
import If from '../If.react.js';
import GlobalConstants from '../../constants/GlobalConstants.js';

class ListingItem extends React.Component {

  render() {
    let self = this;
    let data = this.props.data;
    let mainClass = 'listing__section';
    let classObject = {
      [mainClass] : true,
      [mainClass + '--css-image'] : !data.photo
    };
    let classes = classNames(classObject);
    let detailLink = (data.start_time)
      ? GlobalConstants.urls.DETAILS_EVENT + data._id
      : GlobalConstants.urls.DETAILS_PLACE + data._id;

    // default
    let addressExtended = false;
    // override
    if(data.city_name && data.region_name) {
      addressExtended = <p>{data.city_name}, {data.region_name}</p>;
    } else if(data.city_name) {
      addressExtended = <p>{data.city_name}</p>;
    } else if(data.region_name) {
      addressExtended = <p>{data.region_name}</p>;
    }

    return (
      <a className={classes} href={detailLink}>
        <header><h3>{data.name}</h3></header>
        <ColumnImage url={data.photo} name={data.name} />
        <If test={data.rating}>
          <p>Rating: <strong>{data.rating}</strong></p>
        </If>
        <If test={data.address}>
          <p>{data.address}</p>
        </If>
        <If test={data.displayTime}>
          <p>{data.displayTime}</p>
        </If>
        <If test={data.venue_name}>
          <p>{data.venue_name}</p>
        </If>
        <If test={data.venue_address}>
          <p>{data.venue_address}</p>
        </If>
        {addressExtended}
      </a>
    );
  }

}
 
export default ListingItem;
