import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import styles from './Menu.css';

const Menu = ({ user }) => (
  <div className={styles.menu}>
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

export default Menu;