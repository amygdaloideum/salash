import React, { Component, PropTypes } from 'react';

export default ({ user }) => (
  <div>
    {
      user.recipes && !user.recipes.length
        ? <span>{user.username} has no recipes :(</span>
        : <h1>{user.username}'s recipes</h1>
    }
    {user.recipes && user.recipes.map( (recipe, index) => (
      <div key={index}>
        <span>{recipe.title}</span>
      </div>
    ))}
  </div>
);