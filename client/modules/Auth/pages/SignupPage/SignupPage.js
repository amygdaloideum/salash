import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Import Style
//import styles from './LoginPage.css';


export function SignupPage(props) {
  return (
    <div>
      <Helmet title='Login' />
      <form action="/auth/signup" method="post">
        <h3>Signup</h3>
        <input type='text' name="email" placeholder='email'/>
        <input type='password' name="password" placeholder='password'/>
        <button type="submit">Signup!</button>
      </form>
    </div>
  );
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {};
}

SignupPage.propTypes = {};

export default connect(mapStateToProps)(SignupPage);
