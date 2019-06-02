import React from 'react';

import userStore from './../../store/user';
import todosStore from '../../store/todos';

// for playin in browser console
window.userStore = userStore;
window.todosStore = todosStore;

class Login extends React.Component {
  state = {
    email: '',
  }
  
  render() {
    return (
      <form onSubmit={this.submit}>
        <h1>login</h1>
        <p>
          email <input type='text' value={this.state.email} onChange={this.setInput_email} />
        </p>
        <p>
          <button>submit</button>
        </p>
      </form>
    );
  }
  
  setInput_email = (event) => {
    this.setState({
      email: (event.target.value || '').trim(),
    });
  }
  
  submit = async (event) => {
    event.preventDefault();
  
    if (!this.state.email) {
      alert('gunakan email @gmail');
      return;
    }
    if (!this.state.email.endsWith('@gmail.com')) {
      alert('gunakan email @gmail.com');
      return;
    }
  
    let id = this.state.email;
    id = id.split('@').shift().replace(/\W/g, '');
  
    await userStore.editSingle({
      id,
      email: this.state.email,
    });
  }

  rerender = () => {
    this.setState({
      _rerender: new Date(),
    });
  }
}

export default Login;