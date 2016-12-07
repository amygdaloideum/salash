import React, { Component, PropTypes } from 'react';

import styles from './InteractionButtons.css';
import hovers from '../../components/hovers.css';

export const LoveButton = ({ loveAction, unloveAction, interactions }) => (
  <div
    onClick={() => { interactions.love ? unloveAction() : loveAction() }}
    className={`
      ${styles['interaction-button']}
      ${styles['love-button']}
      ${!interactions.love ? `${hovers['hvr-btr']} ${hovers['hvr-btr-love']}` : null} 
      ${ interactions.love ? styles['love-button-active'] : styles['love-button-inactive'] }`}
  >
    {interactions.love}
    <i className="material-icons">{interactions.love ? 'favorite' : 'favorite_outline'}</i>
    <span>love</span>
  </div>
);

export const FavButton = ({ favoriteAction, unfavoriteAction, interactions }) => (
  <div
    onClick={() => { interactions.favorite ? unfavoriteAction() : favoriteAction() }}
    className={`
      ${styles['interaction-button']}
      ${styles['favorite-button']}
      ${!interactions.favorite ? `${hovers['hvr-btr']} ${hovers['hvr-btr-fav']}` : null} 
      ${interactions.favorite ? styles['favorite-button-active'] : styles['favorite-button-inactive'] }`}
  >
    <i className="material-icons">{interactions.favorite ? 'star' : 'star_outline'}</i>
    <span>favorite</span>
  </div>
);

export const DeleteButton = ({ deleteAction }) => (
  <div
    onClick={() => deleteAction()}
    className={`${styles['interaction-button']} ${styles['delete-button']}`}
  >
    <i className="material-icons">delete_forever</i>
    <span>delete</span>
  </div>
);

export const EditButton = ({ editAction }) => (
  <div
    onClick={() => editAction()}
    className={`${styles['interaction-button']} ${styles['edit-button']}`}
  >
    <i className="material-icons">edit</i>
    <span>edit</span>
  </div>
);