import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutationLogin from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentWillUpdate(nextProps) {
    //   this.props // old, currenbt set of props
    //   nextProps // props when the component will rerenders
    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard if user was not signed in but now is
      hashHistory.push('/dashboard');
    }
  }

  onSubmitOnLogin({ email, password }) {
    // console.log(receivedEmail, receivedPassword);
    this.props
      .mutate({
        variables: { email: email, password: password },
        refetchQueries: [{ query: query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors: errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmitOnLogin.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutationLogin)(LoginForm));
