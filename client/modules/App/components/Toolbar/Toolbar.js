import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import styles from './Toolbar.css';

const Toolbar = ({ user }) => (
  <div className={styles.toolbar}>
    <Link to="/" className={styles.logo}>
      <h1>salash</h1>
    </Link>
    <Link to="/find">
      <i className="material-icons">search</i>
      <div>find</div>
    </Link>
    <Link to="/create">
      <i className="material-icons">add</i>
      <div>contribute</div>
    </Link>
    <Link to="/about">
      <i className="material-icons">info_outline</i>
      <div>about</div>
    </Link>
    { user && user.facebookId ? <Link to={`/user/${user.cuid}`}> <i className="material-icons">face</i> <div>{user.facebookName.split(' ')[0].toLowerCase()}</div> </Link> : null }
  </div>
);

export default Toolbar;