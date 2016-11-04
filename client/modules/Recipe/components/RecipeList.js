import React, { PropTypes } from 'react';

// Import Components
import RecipeListItem from './RecipeListItem/RecipeListItem';
//import styles from './RecipeList.css';

function RecipeList(props) {
  return (
    <div>
      {
        props.recipes.map((recipe, index) => (
          <RecipeListItem
            recipe={recipe}
            key={index}
          />
        ))
      }
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
