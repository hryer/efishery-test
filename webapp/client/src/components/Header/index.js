import React from 'react';
import { Grommet, Box, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Router } from '@reach/router';
import * as Styled from './styles';

import userStore from './../../store/user';
import todosStore from '../../store/todos';

// for playin in browser console
window.userStore = userStore;
window.todosStore = todosStore;

class Header extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Box
        background={{ color: 'brand', dark: false }}
        pad='small'
        elevation="small"
        fill="horizontal"
        justify='between'
        responsive
        direction="row"
        tag="header"
      >
        <Box
          tag="nav"
          direction="row"
          responsive
          justify='between'
          margin={{ right: 'medium', left: 'medium' }}
        >
        </Box>
        <Box
          tag="div"
          direction="row"
          responsive
          margin={{ right: 'medium', left: 'medium' }}
        >
          <Text color={'white'}>Task List</Text>
        </Box>
        <Box
          tag="div"
          direction="row"
          responsive
          justify='between'
          margin={{ right: 'medium', left: 'medium' }}
        >
        </Box>
      </Box>
    );
  }
}

export default Header;