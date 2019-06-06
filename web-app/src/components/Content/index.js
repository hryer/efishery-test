import React from 'react';
import { Box, CheckBox, Text, Button, Grid } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormClose } from 'grommet-icons';
import { Router } from '@reach/router';

import Loading from '../Loading';

import userStore from '../../store/user';
import todosStore from '../../store/todos';

// for playin in browser console
window.userStore = userStore;
window.todosStore = todosStore;

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_task: '',
      input_tag: '',
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
          Tasks: <button onClick={this.upload}>
            {`upload (${todosStore.countUnuploadeds()})`}
          </button>
        </h2>
        <pre>
          last upload: {todosStore.dataMeta.tsUpload}
        </pre>

        <Box>
          <Box
            border={{ side: 'top', color: 'light-3' }}
            direction="row"
            pad="medium"
            gap="small"
            align="center">
            <Box fill>
              <Text
                color={'green'}
              >
                Completed
              </Text>
            </Box>
            <Box fill>
              <Text
                color={'green'}
              >
                No
              </Text>
            </Box>
            <Box fill>
              <Text color={'green'} >
                Tasks
              </Text>
            </Box>
            <Box fill>
              <Text color={'green'} >
                Tags
              </Text>
            </Box>
            <Box fill>
              <Text color={'green'} >
                Isupload
              </Text>
            </Box>
            <Box fill>
              <Text color={'green'} >
                Deleted
              </Text>
            </Box>
          </Box>

          {
            todosStore.data.map((todo, index) => (
              <Box
                border={{ side: 'top', color: 'light-3' }}
                direction="row"
                pad="medium"
                gap="small"
                align="center"
                key={todo._id}>
                <Box fill>
                  <CheckBox checked={todo.done} onChange={e => this.changeDone(todo)} />
                </Box>
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
                    {todo.task}
                  </Text>
                </Box>
                <Box fill>
                  <Text
                    style={{ textDecoration: todo.done ? 'line-through' : '' }}
                    color={todo.done ? 'light-5' : 'dark-1'}
                  >
                    {todo.tag}
                  </Text>
                </Box>
                <Box fill>
                  <Text
                    style={{ textDecoration: todo.done ? 'line-through' : '' }}
                    color={todo.done ? 'light-5' : 'dark-1'}
                  >
                    {
                      !todosStore.checkIsUploaded(todo) ? (`not uploaded`) : (`already upload`)
                    }
                  </Text>
                </Box>
                <Box fill>
                  <Button icon={<FormClose />} onClick={() => this.deleteTodo(todo._id)} />
                </Box>
              </Box>
            ))
          }
        </Box>

        <h2>Add new Task</h2>
        <form onSubmit={this.addTodo}>
          <Text>Task :</Text>
          <p><input type='text' value={this.state.input_task} onChange={this.setInput_task} /></p>
          <Text>Tag : </Text>
          <p><input type='text' value={this.state.tag} onChange={this.setInput_tag} /></p>
          <p><button>Submit</button></p>
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

  setInput_task = (event) => {
    this.setState({
      input_task: event.target.value
    });
  }

  setInput_tag = (event) => {
    this.setState({
      input_tag: event.target.value
    })
  }

  logout = async () => {
    await todosStore.deinitialize();
    await userStore.deleteSingle();
  }

  addTodo = async (event) => {
    event.preventDefault();
    await todosStore.addItem({
      task: this.state.input_task,
      tag: this.state.input_tag,
      done: false,
    }, userStore.data);
    this.setState(
      { 
        input_task: '',
        input_tag: ''
      }
    );
  }

  deleteTodo = async (id) => {
    todosStore.deleteItem(id, userStore.data);
  }

  changeDone = async (event) => {
    event.done = !event.done;
    await todosStore.editItem(event._id, {
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