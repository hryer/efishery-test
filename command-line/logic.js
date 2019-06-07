'use strict';

const assert = require('assert');
const PouchDB = require('pouchdb');

var db = new PouchDB('todos_harry');
var remoteCouch = 'http://admin:iniadmin@localhost:5984/todos_harry';

// Convert value to to lowercase
function toLower(v) {
  return v.toLowerCase();
}


/**
 * @function  [sync]
 * @returns {String} Status
 */

const sync = () => {
  console.info('syncing');
  var opts = {live: true};
  db.sync(remoteCouch, opts, syncError);
}

/**
 * @function  [addTodo]
 * @returns {String} Status
 */
const addTodo = (answer) => {
  const done = false;
  const todo = {
    created_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
    task: answer.task,
    tag: answer.tag,
    done: false
  }
  console.info('msuk pak eko');

  db.post(todo).then(function (result) {
    console.info("everything is A-OK");
    console.info(result);
  }).catch(function (err) {
    assert.equal(null,err);
  });
}

/**
 * @function  [showTodos]
 * @returns {Json} todos
 */
const showTodos = () => {
  console.info('connect');
  db.allDocs({include_docs: true, descending: true}).then(function(doc) {
    console.info(doc.rows);
    redrawTodosConsole(doc.rows);
  }).catch(function (err) {
    console.info(err);
  });
};

/**
 * @function  [editTodo]
 * @returns {Sting} status
 */
const editTodo = (todo) => {
};

/**
 * @function  [
 * ]
 * @returns {String} status
 */
const deleteTodo = (todo) => {
  try {
    db.remove(todo);
    console.info('Delete Task Success');
  } catch (error) {
    console.info(`Delete task failed ${error}`);
  }
}

/**
 * @function  [statusTodo]
 * @returns [Json] todo
 */
const statusTodo = () => {
}

const redrawTodosConsole = (todos) => {
  console.info(`No. Task Tag Done`);
  // console.info(todos);
  todos.forEach(function(todo,i) {
    console.info(todo.doc);
  });
}

// Export all methods
module.exports = {   
  addTodo, 
  showTodos,
  editTodo,
  statusTodo,
  deleteTodo
};
