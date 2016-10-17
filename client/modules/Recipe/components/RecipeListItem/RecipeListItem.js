import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './RecipeListItem.css';

function RecipeListItem(props) {
  return (
    <div className={styles['single-recipe']}>
      <h3 className={styles['post-title']}>
        <Link to={`/recipes/${props.recipe.slug}-${props.recipe.cuid}`} >
          {props.recipe.title}
        </Link>
      </h3>
      <div>
        <span>Categories:</span>
        {props.recipe.categories.map((cat) => (
          <span key={cat._id}>{cat.title}</span>
        ))}
      </div>
      <div>
        <span>Ingredients:</span>
        {props.recipe.ingredients.map((ing) => (
          <span key={ing._id}>{ing.title}</span>
        ))}
      </div>
      <p className={styles['post-desc']}>{props.recipe.description}</p>
      <hr className={styles.divider} />
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
