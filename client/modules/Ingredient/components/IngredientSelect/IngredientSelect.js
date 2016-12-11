import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import styles from './IngredientSelect.css';

class ingredientsSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //chips: [],      
      value: ''
    }
  }

  addChip = () => {
    if (!this.state.value || ~this.props.input.value.indexOf(this.state.value)) {
      this.setState({ value: '' });
      return;
    }
    const chips = [...this.props.input.value, this.state.value];
    this.props.input.onChange(chips);
    this.setState({ value: '' });
  }

  removeChip = (i) => {
    const chips = [
      ...this.props.input.value.slice(0, i),
      ...this.props.input.value.slice(i + 1)
    ];
    this.props.input.onChange(chips);
  }

  updateValue = evt => {
    this.setState({
      value: evt.target.value.toLowerCase().replace(/[^a-z\s]/g,'')
    });
  }

  handleKeyPress = evt => {
    if(evt.key === 'Enter') {
      this.addChip();
    }
  }


  render() {
    return (
      <div className={styles.container}>
        <div className={styles.chips}>
          {
            this.props.input.value.map((chip, i) => (
              <div className={styles.chip} key={i}>
                <span>{chip}</span>
                <i onClick={() => this.removeChip(i)} className="material-icons">clear</i>
              </div>
            ))
          }
        </div>
        <div className={styles.input}>
          <input value={this.state.value} onKeyPress={this.handleKeyPress} onChange={this.updateValue} type="text" />
          <button type="button" className={this.state.value ? styles['active-button'] : ''} onClick={this.addChip}><i className="material-icons">add</i></button>
        </div>
      </div>
    );
  }
}


export default ingredientsSelect;