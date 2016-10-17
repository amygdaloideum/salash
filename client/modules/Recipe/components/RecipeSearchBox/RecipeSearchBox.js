import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './RecipeSearchBox.css';

export class RecipeSearchBox extends Component {
  constructor() {
    super();
    this.state = {
      nameText: 'Tacos!'
    };
  }
  handleChange = (event) => {
    this.setState({nameText: event.target.value});
  }
  render() {
    return (
      <div className={styles['search-form']}>
        <input placeholder="Name" value={this.state.nameText} onChange={this.handleChange} className={styles['search-form-input']} ref="name"/>
        <input placeholder="Ingredients" className={styles['search-form-input']}/>
        <input placeholder="Categories" className={styles['search-form-input']}/>
        <Link to={`/recipes/search/${encodeURIComponent(this.state.nameText)}`} className={styles['recipe-search-button']}>
          Find recipes!
        </Link>
        <a href="#" className={styles['recipe-search-button']} onClick={()=>{console.log(this);}}>test</a>
      </div>
    );
  }
}

export default RecipeSearchBox;
