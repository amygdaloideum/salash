import React, { PropTypes, Component } from 'react';

import styles from './SocialSignInButtons.css';

export const FacebookButton = ({auth}) => (
  <a onClick={auth} className={`${styles['social-sign-in']} ${styles.facebook}`}>
  <i className="fa fa-facebook"></i>
  <span>facebook</span>  
  </a>
);

export const GoogleButton = ({auth}) => (
  <a onClick={()=>{auth()}} className={`${styles['social-sign-in']} ${styles.google}`}>
  <i className="fa fa-google-plus"></i>
  <span>google+</span>  
  </a>
);

export const TwitterButton = ({auth}) => (
  <a onClick={()=>{auth()}} className={`${styles['social-sign-in']} ${styles.twitter}`}>
  <i className="fa fa-twitter"></i>
  <span>twitter</span>
  </a>
);