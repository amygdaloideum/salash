import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Import Style
//import styles from './LoginPage.css';


export function NotFoundPage(props) {
  return (
    <div>
      <Helmet title='Page not found!' />
      <form action="/auth/authenticate" method="post">
        <h1>404 - Page Not Found</h1>
        <p>Bruh, what u doin out here?</p>
      </form>
    </div>
  );
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {};
}

NotFoundPage.propTypes = {};

export default connect(mapStateToProps)(NotFoundPage);
