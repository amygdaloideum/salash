import React, { PropTypes } from 'react';

// Import Components
import RecipeListItem from './RecipeListItem/RecipeListItem';
import styles from './RecipeList.css';

function RecipeList(props) {
  return (
    <div className={styles.recipelist}>
      <div className={styles.meta}>
        <div className={styles.affirmation}>
          {props.affirmation}
        </div>
        {/*<div className={styles.optionbar}>
          <span>most loved</span>
          <a>all time</a>
          <a>this month</a>
          <a>this week</a>
        </div>*/}
      </div>
      {props.recipes.map((recipe, index) => (<RecipeListItem recipe={recipe} key={index} />))}
    </div>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired
};

export default RecipeList;
