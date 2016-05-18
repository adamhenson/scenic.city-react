class Select extends React.Component {

  render() {
    let options = this.props.options;

    let items = options.map((option) => {
      return <option value={option.value} key={option.value}>{option.name}</option>;
    });

    return <select onChange={this.props.onSelect}>{items}</select>;
  }

}
 
export default Select;
