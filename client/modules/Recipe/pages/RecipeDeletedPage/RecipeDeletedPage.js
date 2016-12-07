import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import styles from './RecipeDeletedPage.css';

class RecipeDeletedPage extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>recipe deleted</h1>
        <p>it has been utterly destroyed</p>
        <Link to="/create"><i className="material-icons">add</i> add another one</Link>
      </div>
    );
  }
}

export default RecipeDeletedPage;
