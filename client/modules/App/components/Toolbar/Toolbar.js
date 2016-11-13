import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import styles from './Toolbar.css';

const Toolbar = ({ user }) => (
  <div className={styles.toolbar}>
    <Link to="/" className={styles.logo}>
      <h1>salash</h1>
    </Link>
    <Link>
      <i className="material-icons">search</i>
      <div>advanced</div>
    </Link>
    <Link to="/create">
      <i className="material-icons">add</i>
      <div>contribute</div>
    </Link>
    <Link>
      <i className="material-icons">info_outline</i>
      <div>about</div>
    </Link>
    { user && user._id ? <Link to={`/user/${user._id}`}> <i className="material-icons">face</i> <div>{user.username.split(' ')[0].toLowerCase()}</div> </Link> : null }
  </div>
);

export default Toolbar;