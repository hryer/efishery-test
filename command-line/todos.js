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

const { addTodo, showTodos } = require('./logic');

const questions = [
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
        }).on('change', console.info(info));  
      }
    });

    showTodos()
  });

program
  .command('syncDB')
  .alias('sd')
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
    prompt(questions).then(answers => {
      console.info(answers)
      addTodo(answers);
    })
  });

  program.parse(process.argv);