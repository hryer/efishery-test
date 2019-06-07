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
  try {
    const todo = {
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
      task: answer.task,
      tag: answer.tag,
      done: false
    }
    console.info('msuk pak eko');
  
    db.post(todo).then( result => {
      console.info("everything is A-OK");
      console.info(result);
    }).catch(function (err) {
      console.info(`add task failed ${err}`);
    });
  } catch (error) {
    console.info(`add task failed ${error}`);
  } 
}

/**
 * @function  [showTodos]
 * @returns {Json} todos
 */
const showTodos = (type) => {
  try {
    console.info('connect');
    db.allDocs({include_docs: true, descending: true}).then(function(doc) {
      redrawTodosConsole(type,doc.rows);
    }).catch(function (err) {
      console.info(`Read task Failed ${err}`);
    });
  } catch (error) {
    console.info(`Read task Failed ${error}`)
  }
};

/**
 * @function  [editTodo]
 * @returns {Sting} status
 */
const editTodo = (todo) => {
  try {
    db.put(todo).then( result => {
      console.info("everything is A-OK");
      console.info(result);
    }).catch(function (err) {
      console.info(`edit task failed ${err}`);
    });
  } catch (error) {
    console.info(`edit task failed ${error}`);
  }
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

const redrawTodosConsole = (type,todos) => {
  console.info(`No. Task Tag Done`);
  todos.forEach(function(todo,i) {
    todo = todo.doc;
    if(type === 0){
      console.info(`${i+1}. ${todo.task} ${todo.tag} ${todo.status} `);
    }else {
      console.info(`${i+1}. ${todo._id} ${todo._rev} ${todo.task} ${todo.tag} ${todo.status} `);
    }
  });
}

// Export all methods
module.exports = {   
  addTodo, 
  showTodos,
  editTodo,
  deleteTodo
};
