#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
// Require logic.js file and extract controller functions using JS destructuring assignment


const assert = require('assert');
const PouchDB = require('pouchdb');

const db = new PouchDB('todos_harry');
const remoteCouch = 'http://admin:iniadmin@localhost:5984/todos_harry';

// Convert value to to lowercase
function toLower(v) {
  return v.toLowerCase();
}

const { addTodo, showTodos, editTodo, deleteTodo } = require('./logic');

const addQuestions = [
  {
    type : 'input',
    name : 'task',
    message : 'Enter task ...'
  },
  {
    type : 'input',
    name : 'tag',
    message : 'Enter tag ...'
  }
];

const editQuestions = [
  {
    type : 'input',
    name : '_id',
    message: 'Enter id ...'
  },
  {
    type : 'input',
    name : '_rev',
    message : 'Enter rev ...'
  },
  {
    type : 'input',
    name : 'task',
    message : 'Enter task ...'
  },
  {
    type : 'input',
    name : 'tag',
    message : 'Enter tag ...'
  },
  {
    type : 'input',
    name : 'status',
    message : 'Enter status ...'
  }
];

const statusQuestion = [
  {
    type : 'input',
    name : '_id',
    message : 'Enter id ...'
  },
  {
    type : 'input',
    name : '_rev',
    message : 'Enter rev ...'
  },
  {
    type : 'input',
    name : 'status',
    message : 'Enter status ...'
  }
]

const deleteQuestion = [
  {
    type : 'input',
    name : '_id',
    message : 'Enter id ...'
  },
  {
    type : 'input',
    name : '_rev',
    message : 'Enter rev ...'
  }
]

program
  .version('0.0.1')
  .description('Task Management E-fishery');

program
  .command('getTaskList')
  .alias('r')
  .description('Get Task List')
  .action(() => {
    db.info(function(err, info) {
      if(!err) {
        db.changes({
            since: info.update_seq,
            live: true
          });  
      }
    });

    showTodos(0);
  });

program
  .command('syncDB')
  .alias('s')
  .description('Synronize DB')
  .action(() => {
    try {
      console.info('syncing');  
      var opts = {live: false};
      db.sync(remoteCouch, opts);
      console.info('synronize to server success');
    } catch (error) {
      console.info('error');
    }
  });

program
  .command('addTask')
  .alias('a')
  .description('Add a task')
  .action(() => {
    prompt(addQuestions).then(answers => {
      addTodo(answers);
    })
  });

program
  .command('editTask')
  .alias('e')
  .description('Edit a task')
  .action(() => {
    prompt(editQuestions).then(answers => {
      showTodos(1);
      editTodo(answers);
    })
  });

program
  .command('statusTask')
  .alias('c')
  .description('Change status task')
  .action(() => {
    prompt(statusQuestion).then(answers => {
      editTodo(answers);
    })
  });

program
  .command('deleteTask')
  .alias('d')
  .description('Delete Task')
  .action(() => {
    prompt(deleteQuestion).then(answers => {
      deleteTodo(answers);
    })
  });

program.parse(process.argv);