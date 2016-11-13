import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import slug from 'limax';
import { Link } from 'react-router';

// Import Components
import RecipeQuickSearch from '../../../Recipe/components/RecipeQuickSearch/RecipeQuickSearch';
import Menu from '../../components/Menu/Menu';

import styles from './StartPage.css';

// Import Actions
import { fetchCategories } from '../../../Category/CategoryActions';

// Import Selectors
import { getCategories } from '../../../Category/CategoryReducer';

class StartPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  handleQuickSearch = (fields) => {
    const ingredient1 = slug(encodeURIComponent(fields.ingredient1.replace(/\s/g, "-")));
    const ingredient2 = slug(encodeURIComponent(fields.ingredient2.replace(/\s/g, "-")));
    browserHistory.push(`/search?category=${fields.category}&ingredient=${ingredient1}&ingredient=${ingredient2}`);
  };

  render() {
    return (
      <div className={styles.wrapper}>
      <div className={styles.menu}>
          <Menu user={this.props.user} />
        </div>
        <h1> salash </h1>
        <h2>raw food recipe hub</h2>
        <div className={styles.bottom}>
          <div className={styles.search}>
            <RecipeQuickSearch handleQuickSearch={this.handleQuickSearch} categories={this.props.categories} />
          </div>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
StartPage.need = [() => { return fetchCategories(); }];

//Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: getCategories(state),
    user: state.auth.user
  };
}
export default connect(mapStateToProps)(StartPage);
