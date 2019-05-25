import React from 'react';
import { Grommet, Box, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Router } from '@reach/router';

import Content from '../Content';
import Header from '../Header';
import Loading from '../Loading';
import Login from '../Login';

import userStore from './../../store/user';
import todosStore from '../../store/todos';

// for playin in browser console
window.userStore = userStore;
window.todosStore = todosStore;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialized: false,
      _rerender: new Date(),
    };
  }

  render() {
    if (!this.state.isInitialized) {
      return <Loading />;
    }

    return (
      userStore.data.email ? (
        <Grommet full={true} theme={grommet}>
          <Header />
          <Content _rerender={this.state._rerender} />
        </Grommet>
      ) : (
          <Login />
        )
    );
  }

  async componentDidMount() {
    await userStore.initialize();
    this.setState({
      isInitialized: true,
    });

    this.unsubUser = userStore.subscribe(this.rerender);
  }

  async componentDidUpdate() {
    if (userStore.data.email && !todosStore.isInitialized) {
      console.log('popup initialize all offline data...');
      todosStore.setName(userStore.data.id);
      await todosStore.initialize();
      console.log('popup done');
    }
  }

  componentWillUnmount() {
    this.unsubUser();
  }

  rerender = () => {
    this.setState({
      _rerender: new Date(),
    });
  }

}

export default App;
