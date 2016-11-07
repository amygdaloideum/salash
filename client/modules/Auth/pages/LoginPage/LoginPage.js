import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loginUserRequest, facebookLoginRequest } from '../../AuthActions';
import { browserHistory } from 'react-router';

import LoginForm from '../../components/loginform/loginform';
import { FacebookButton, GoogleButton, TwitterButton } from '../../components/SocialSignInButtons/SocialSignInButtons';

import { getMessage } from '../../AuthReducer';

// Import Style
import styles from './LoginPage.css';

class LoginPage extends Component {

  handleLogin = ({email, password}) => {
    this.props.dispatch(loginUserRequest({ email, password })).then(() => browserHistory.push('/'));
  };

  handleFacebookLogin = () => {
    this.props.dispatch(facebookLoginRequest());
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <Helmet title='Login' />
        <LoginForm login={this.handleLogin} facebookLogin={this.handleFacebookLogin} message={this.props.message} />
        <div className={styles.separator}> or</div>
        <FacebookButton auth={this.handleFacebookLogin} />
        <GoogleButton />
        <TwitterButton auth={facebookLoginRequest} />
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    message: getMessage(state)
  };
}

LoginPage.propTypes = {};

export default connect(mapStateToProps)(LoginPage);
