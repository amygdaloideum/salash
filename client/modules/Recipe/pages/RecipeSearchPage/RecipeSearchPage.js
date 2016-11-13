import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import slug from 'limax';
import { Link } from 'react-router';

// Import Components
import RecipeSearchBox from '../../components/RecipeSearchBox/RecipeSearchBox';
import RecipeQuickSearch from '../../components/RecipeQuickSearch/RecipeQuickSearch';

import styles from './RecipeSearchPage.css';

// Import Actions
import { fetchCategories } from '../../../Category/CategoryActions';

// Import Selectors
import { getCategories } from '../../../Category/CategoryReducer';

class RecipeSearchPage extends Component {
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
        <div className={styles.bottom}>
          <div className={styles.menu}>
            <Link>
              <div></div>
              <div>advanced</div>
              <div><i className="fa fa-chevron-right"></i></div>
            </Link>
            <Link to="/create">
              <div></div>
              <div>contribute</div>
              <div><i className="fa fa-chevron-right"></i></div>
            </Link>
            <Link>
              <div></div>
              <div>about</div>
              <div><i className="fa fa-chevron-right"></i></div>
            </Link>
          </div>
          <div className={styles.search}>
            <RecipeQuickSearch handleQuickSearch={this.handleQuickSearch} categories={this.props.categories} />
          </div>
        </div>
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
