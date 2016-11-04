import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './RecipeListItem.css';

function RecipeListItem(props) {
  return (
    <div className={styles['single-recipe']}>
      <h3 className={styles.title}>
        <Link to={`/recipes/${props.recipe.slug}-${props.recipe.cuid}`} >
          {props.recipe.title}
        </Link>
      </h3>
      <div className={styles.categories}>
        <span className={styles.label}>Categories:</span>
        {props.recipe.categories.map((cat, i) => (
          <span className={styles.category} key={i}>{cat.title}</span>
        ))}
      </div>
      <div className={styles.ingredients}>
        <span className={styles.label}>Ingredients:</span>
        {props.recipe.ingredients.map((ing, i) => (
          <span className={styles.ingredient} key={i}>{ing.ingredient}</span>
        ))}
      </div>
      <p className={styles.desc}>{props.recipe.description}</p>
      <div className={styles.divider}></div>
    </div>
  );
}

RecipeListItem.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired
};

export default RecipeListItem;
