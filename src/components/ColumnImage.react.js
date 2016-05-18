import classNames from 'classnames';
import GlobalConstants from '../constants/GlobalConstants.js';

class ColumnImage extends React.Component {

  constructor(props) {
    super(props);

    this.loadImage = this.loadImage.bind(this);
    this.imageUrl = (!this.props.url)
      ? false
      : GlobalConstants.urls.CACHE + this.props.url;
  }

  componentWillMount() {
    this.state = {
      'loading' : true
    };

    this.loadImage();
  }

  loadImage() {
    let self = this;
    let image = new Image();

    image.src = this.imageUrl;

    image.onload = function() {
      self.setState({
        'loading' : false
      });
    };
  }

  render() {
    let self = this;
    let classObject = {
      'col' : true,
      'square-image' : true,
      'loading' : (this.state.loading)
    };
    let classes = classNames(classObject);

    if(this.imageUrl) {
      return (
        <div className={classes}>
          <figure>
            <img src={this.imageUrl} alt={self.props.name} />
          </figure>
        </div>
      );
    } else {
      return (
        <div className={classes}>
          <figure></figure>
        </div>
      );
    }
  }

}
 
export default ColumnImage;