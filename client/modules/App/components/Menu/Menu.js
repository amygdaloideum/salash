import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import styles from './Menu.css';

const Menu = ({ user }) => (
  <div className={styles.menu}>
    <Link>
      <i className="material-icons">search</i>
      <div>advanced</div>
    </Link>
    <Link to="/create">
      <i className="material-icons">add</i>
      <div>contribute</div>
    </Link>
    <Link to="/about">
      <i className="material-icons">info_outline</i>
      <div>about</div>
    </Link>
    { user && user.facebookId ? <Link to={`/user/${user.cuid}`}> <i className="material-icons">face</i> <div>{user.facebookName.split(' ')[0]}</div> </Link> : null }
  </div>
);

export default Menu;