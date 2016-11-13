import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loginUserRequest, facebookLoginRequest } from '../../AuthActions';

import LoginForm from '../../components/loginform/loginform';
import { FacebookButton, GoogleButton, TwitterButton } from '../../components/SocialSignInButtons/SocialSignInButtons';

import { getMessage } from '../../AuthReducer';

// Import Style
import styles from './LoginPage.css';

class LoginPage extends Component {

  handleLogin = ({email, password}) => {
    this.props.dispatch(loginUserRequest({ email, password }));
  };

  handleFacebookLogin = () => {
    this.props.dispatch(facebookLoginRequest());
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loginwrapper}>
          <section className={styles.local}>
            <Helmet title='Login' />
            <header>
              <h1>login</h1>
            </header>
            <div className={styles.form}>
              <LoginForm login={this.handleLogin} facebookLogin={this.handleFacebookLogin} message={this.props.message} />
            </div>
          </section>
          <div>or log in with</div>
          <section className={styles.social}>
            <FacebookButton auth={this.handleFacebookLogin} />
            <GoogleButton />
            <TwitterButton auth={facebookLoginRequest} />
          </section>
        </div>
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
