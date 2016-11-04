import React, { Component, PropTypes } from 'react';

class CategorySelect extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e, option) {
    const input = this.props.input;
    const index = input.value.indexOf(option);

    if (e.target.checked && index < 0) {
      input.onChange(input.value.concat([e.target.value]));
    } else {
      const copy = [...input.value];
      copy.splice(index, 1);
      input.onChange(copy);
    }
  }

  render() {
    const { fields } = this.props;
    return (
      <div>
        {this.props.options.map((option, i) => (
          <div key={i}>
            <input
              type="checkbox"
              value={option}
              checked={this.props.input.value.indexOf(option) >= 0}
              onChange={e => this.handleChange(e, option)} />
            <span>{option}</span>
          </div>
        ))}
      </div>
    );
  }
}


export default CategorySelect;