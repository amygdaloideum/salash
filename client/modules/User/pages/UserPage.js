import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';

import UserRecipes from '../components/UserRecipes';

// Import Actions
import { fetchUser, addUser } from '../UserActions';
import { fetchRecipe } from '../../Recipe/RecipeActions';

// Import Selectors
import { getUser } from '../UserReducer';

export class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.params.id));
  }

  goToRecipe = (cuid, slug) => {
     this.props.dispatch(fetchRecipe(cuid)).then( ()=>{
       browserHistory.push(`/recipes/${slug}-${cuid}`);
     });
  }

  render() {
    return (
      <div>
        <UserRecipes goToRecipe={this.goToRecipe} user={this.props.user} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UserPage.need = [({ params }) => { return fetchUser(params.id); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: getUser(state),
  };
}

UserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(UserPage);
