import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import slug from 'limax';
import { Link } from 'react-router';
import { build } from '../../../../util/queryBuilder';

// Import Components
import RecipeSearchForm from '../../components/RecipeSearchForm/RecipeSearchForm';

import styles from './RecipeSearchPage.css';

// Import Actions
import { fetchCategories } from '../../../Category/CategoryActions';

// Import Selectors
import { getCategories } from '../../../Category/CategoryReducer';

class RecipeSearchPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  handleSearch = (fields) => {
    browserHistory.push(build('search', fields));
  };

  handleQuickSearch = (fields) => {
    const ingredient1 = slug(encodeURIComponent(fields.ingredient1.replace(/\s/g, "-")));
    const ingredient2 = slug(encodeURIComponent(fields.ingredient2.replace(/\s/g, "-")));
    browserHistory.push(`/search?category=${fields.category}&ingredient=${ingredient1}&ingredient=${ingredient2}`);
  };

  initialValues = {
    categories: [],
    ingredients: []
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>find recipes</h1>
        <RecipeSearchForm initialValues={this.initialValues} categories={this.props.categories} handleSearch={this.handleSearch}/>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RecipeSearchPage.need = [() => { return fetchCategories(); }];

//Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: getCategories(state),
  };
}
export default connect(mapStateToProps)(RecipeSearchPage);
