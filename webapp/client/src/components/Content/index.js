import React from 'react';
import { Box, CheckBox, Text, Button, Grid } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormClose } from 'grommet-icons';
import { Router } from '@reach/router';

import Loading from '../Loading';

import userStore from './../../store/user';
import todosStore from '../../store/todos';

// for playin in browser console
window.userStore = userStore;
window.todosStore = todosStore;

// import * as Styled from './styles';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_text: '',
      _rerender: this.props._rerender
    }
    this.changeDone.bind(this);
    this.deleteTodo.bind(this);

  }

  render() {
    return (
      <div>
        <p>
          halo {userStore.data.email} <button onClick={this.logout}>logout</button>
        </p>

        <h2>
          todos: <button onClick={this.upload}>
            {`upload (${todosStore.countUnuploadeds()})`}
          </button>
        </h2>
        <pre>
          last upload: {todosStore.dataMeta.tsUpload}
        </pre>

        <Box>
          {
            todosStore.data.map((todo, index) => (
              <Box
                border={{ side: 'top', color: 'light-3' }}
                direction="row"
                pad="medium"
                gap="small"
                align="center"
                key={todo._id}>
                <CheckBox checked={todo.done} onChange={e => this.changeDone(todo)} />
                <Box fill>
                  <Text
                    style={{ textDecoration: todo.done ? 'line-through' : '' }}
                    color={todo.done ? 'light-5' : 'dark-1'}
                  >
                    {index + 1}
                  </Text>
                </Box>
                <Box fill>
                  <Text
                    style={{ textDecoration: todo.done ? 'line-through' : '' }}
                    color={todo.done ? 'light-5' : 'dark-1'}
                  >
                    {todo.text}
                    {
                      !todosStore.checkIsUploaded(todo) && (
                        ` (belum upload)`
                      )
                    }
                  </Text>
                </Box>
                <Button icon={<FormClose />} onClick={() => this.deleteTodo(todo._id)} />
              </Box>
            ))
          }
        </Box>

        <h2>add new todo</h2>
        <form onSubmit={this.addTodo}>
          <p><input type='text' value={this.state.input_text} onChange={this.setInput_text} /></p>
          <p><button>submit</button></p>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.unsubTodos = todosStore.subscribe(this.rerender);
  }

  componentWillUnmount() {
    this.unsubTodos();
  }

  setInput_text = (event) => {
    this.setState({
      input_text: event.target.value,
    });
  }

  logout = async () => {
    await todosStore.deinitialize();
    await userStore.deleteSingle();
  }

  addTodo = async (event) => {
    event.preventDefault();
    await todosStore.addItem({
      text: this.state.input_text,
      done: false,
    }, userStore.data);
    this.setState({ input_text: '' });
  }

  deleteTodo = async (id) => {
    todosStore.deleteItem(id, userStore.data);
  }

  changeDone = async (event) => {
    event.done = !event.done;
    console.log(event.done);
    console.log(event);
    await todosStore.editItem(event._id,{
      done: event.done
    });
  }

  upload = async () => {
    console.log('uploading...');
    try {
      await todosStore.upload();
      console.log('upload done');
    } catch (err) {
      alert(err.message);
      console.log('upload failed');
    }
  }

  rerender = () => {
    this.setState({
      _rerender: new Date(),
    });
  }
}

export default Content;