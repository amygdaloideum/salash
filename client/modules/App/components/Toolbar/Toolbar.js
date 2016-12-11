import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import styles from './Toolbar.css';

const Toolbar = ({ user }) => (
  <div className={styles.toolbar}>
    <Link to="/" className={styles.logo}>
      <h1>salash</h1>
    </Link>
    <Link to="/" id={styles.home}>
      <i className="material-icons">home</i>
      <div>home</div>
    </Link>
    <Link to="/find" className={styles.find}>
      <i className="material-icons">search</i>
      <div>find</div>
    </Link>
    <Link to="/create" className={styles.create}>
      <i className="material-icons">add</i>
      <div>add</div>
    </Link>
    { !user || !user.cuid ? <Link to="/about" className={styles.about}><i className="material-icons">info_outline</i><div>about</div></Link> : null }
    { user && user.cuid ? <Link to={`/user/${user.cuid}`} className={styles.user}> <i className="material-icons">face</i> <div>you</div> </Link> : null }
  </div>
);

export default Toolbar;