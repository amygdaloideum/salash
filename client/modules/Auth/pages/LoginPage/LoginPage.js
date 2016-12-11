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
    this.props.dispatch(facebookLoginRequest()).then( () => location.reload());
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <Helmet title='Login' />
        <div className={styles.loginwrapper}>
          {/*<section className={styles.local}>
            <header>
              <h1>login</h1>
            </header>
            <div className={styles.form}>
              <LoginForm login={this.handleLogin} facebookLogin={this.handleFacebookLogin} message={this.props.message} />
            </div>
          </section>*/}
          <header>
              <h1>login</h1>
            </header>
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
