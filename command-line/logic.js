'use strict';

const assert = require('assert');
const PouchDB = require('./node_modules/pouchdb/lib');

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
 * @function  [updateTodo]
 * @returns {Sting} status
 */
const updateTodo = (_id, todo) => {
  assert.equal(null, err);
    console.info('Updated successfully');

  db.update({ _id }, contact)
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Updated successfully');
    db.disconnect();
  });
};

/**
 * @function  [deleteContact]
 * @returns {String} status
 */
const deleteContact = (_id) => {
  Contact.remove({ _id })
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Deleted successfully');
    db.disconnect();
  })
}

/**
 * @function  [getContactList]
 * @returns [contactlist] contacts
 */
const getContactList = () => {
  Contact.find()
  .exec((err, contacts) => {
    assert.equal(null, err);
    console.info(contacts);
    console.info(`${contacts.length} matches`);
    db.disconnect();
  })
}

const redrawTodosConsole = (todos) => {
  console.info(`No. Task Tag Done`);
  todos.forEach(function(todo,i) {
    console.info(`${i}. ${todo.doc.id} `);
  });
}

// Export all methods
module.exports = {   
  addTodo, 
  showTodos, 
};
