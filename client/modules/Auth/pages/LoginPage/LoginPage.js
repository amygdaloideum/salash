import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { loginUserRequest } from '../../AuthActions';

// Import Style
//import styles from './LoginPage.css';

let LoginForm = ({ handleSubmit, login }) => (
  <form onSubmit={handleSubmit(login)}>
    <h3>Login</h3>
    <Field name="email" component="input" type="text" />
    <Field name="password" component="input" type="password" />
    <button type="submit">Login</button>
  </form>
)

LoginForm = reduxForm({ form: 'loginForm' })(LoginForm);

class LoginPage extends Component {

  handleLogin = ({email, password}) => {
    this.props.dispatch(loginUserRequest({email, password}));
  };

  render() {
    return (
      <div>
        <Helmet title='Login' />
        <LoginForm login={this.handleLogin} />
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {};
}

LoginPage.propTypes = {};

export default connect(mapStateToProps)(LoginPage);
