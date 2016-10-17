import React, { PropTypes } from 'react';

// Import Components
import RecipeListItem from './RecipeListItem/RecipeListItem';

function RecipeList(props) {
  return (
    <div className="listView">
      {
        props.recipes.map(recipe => (
          <RecipeListItem
            recipe={recipe}
            key={recipe.cuid}
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
