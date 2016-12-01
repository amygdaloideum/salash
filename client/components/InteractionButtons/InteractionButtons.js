import React, { Component, PropTypes } from 'react';

import styles from './InteractionButtons.css';
export const LoveButton = ({ loveAction, unloveAction, interactions }) => (
  <div
    onClick={() => { interactions.love ? unloveAction() : loveAction() }}
    className={`${styles['interaction-button']} ${styles['love-button']} ${ interactions.love ? styles['love-button-active'] : styles['love-button-inactive'] }`}
  >
    {interactions.love}
    <i className="material-icons">{interactions.love ? 'favorite' : 'favorite_outline'}</i>
    <span>love</span>
  </div>
);

export const FavButton = ({ favoriteAction, unfavoriteAction, interactions }) => (
  <div
    onClick={() => { interactions.favorite ? unfavoriteAction() : favoriteAction() }}
    className={`${styles['interaction-button']} ${styles['favorite-button']} ${ interactions.favorite ? styles['favorite-button-active'] : styles['favorite-button-inactive'] }`}
  >
    <i className="material-icons">{interactions.favorite ? 'star' : 'star_outline'}</i>
    <span>favorite</span>
  </div>
);