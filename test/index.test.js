const index = require("../src/js/index");
var assert = require("assert");

function Task(name, id, date, done, description, userID) {
  this.name = name;
  this.id = id;
  this.date = date;
  this.done = done;
  this.description = description;
  this.userID = userID;
}
let listeTasks = [
  new Task("Task1", "1", new Date(), true, "Description", "1"),
  new Task("Task2", "2", new Date(), true, "Description", "1"),
  new Task("Task3", "3", new Date(), true, "Description", "2"),
];
function getTasks(id) {
  return listeTasks.filter((element) => element.userID == id);
}
function addTodo(task) {
  if (
    task.name == "" ||
    task.id == "" ||
    task.userID == "" ||
    task.name == undefined ||
    task.id == undefined ||
    task.userID == undefined
  ) {
    throw new TypeError("Element manquants");
  } else {
    listeTasks.push(task);
  }
}
function editTodo(task) {
  if (
    task.name == "" ||
    task.id == "" ||
    task.userID == "" ||
    task.name == undefined ||
    task.id == undefined ||
    task.userID == undefined
  ) {
    throw new TypeError("Element manquants");
  } else {
    let pos = listeTasks.findIndex((element) => element.id == task.id);
    if (pos == -1) {
      throw new TypeError("Element manquants");
    } else {
      listeTasks[pos] = task;
    }
  }
}
function deleteTodo(idTask) {
  if (idTask == undefined || idTask == "") {
    throw new TypeError("Element manquants");
  } else {
    let pos = listeTasks.findIndex((element) => element.id == idTask);
    if (pos == -1) {
      throw new TypeError("Element manquants");
    } else {
      listeTasks.splice(pos, 1);
    }
  }
}

describe("index", function () {
  describe("#getTasks()", function () {
    it("should return an array of Tasks", function () {
      let id = "1";
      assert.equal(getTasks(id).length, 2);
      id = "2";
      assert.equal(getTasks(id).length, 1);
      id = "3";
      assert.equal(getTasks(id).length, 0);
    });
  });
  describe("#addTodo()", function () {
    it("should return an array of Tasks", function () {
      let newTask = new Task(
        "Task4",
        "4",
        new Date(),
        true,
        "Description",
        "2"
      );
      assert(newTask.name != "");
      assert(newTask.id != "");
      assert(newTask.userID != "");
      addTodo(newTask);
      assert.equal(listeTasks.length, 4);
    });
    it("should return an error", function () {
      assert.throws(
        () => {
          let newTask = new Task();
          addTodo(newTask);
        },
        TypeError,
        "Element manquants"
      );
      assert.throws(
        () => {
          let newTask = new Task("", "", new Date(), false, "", "");
          addTodo(newTask);
        },
        TypeError,
        "Element manquants"
      );
    });
  });
  describe("#editTodo()", function () {
    it("should return an array of Tasks", function () {
      listeTasks = [
        new Task("Task1", "1", new Date(), true, "Description", "1"),
        new Task("Task2", "2", new Date(), true, "Description", "1"),
        new Task("Task3", "3", new Date(), true, "Description", "2"),
      ];
      let newTask = new Task(
        "Task3",
        "3",
        new Date(),
        false,
        "Description 2",
        "2"
      );
      editTodo(newTask);
      assert.equal(listeTasks.length, 3);
      let pos = listeTasks.findIndex((element) => element.id == newTask.id);
      assert.equal(pos, 2);
      assert(listeTasks[pos].name == newTask.name);
      assert(listeTasks[pos].id == newTask.id);
      assert(listeTasks[pos].userID == newTask.userID);
      assert(listeTasks[pos].description == newTask.description);
    });
    it("should return an error", function () {
      assert.throws(
        () => {
          let newTask = new Task();
          editTodo(newTask);
        },
        TypeError,
        "Element manquants"
      );
      assert.throws(
        () => {
          let newTask = new Task("", "", new Date(), false, "", "");
          editTodo(newTask);
        },
        TypeError,
        "Element manquants"
      );
    });
  });
  describe("#deleteTodo()", function () {
    it("should return an array of Tasks", function () {
      listeTasks = [
        new Task("Task1", "1", new Date(), true, "Description", "1"),
        new Task("Task2", "2", new Date(), true, "Description", "1"),
        new Task("Task3", "3", new Date(), true, "Description", "2"),
      ];
      let newID = "3";
      let pos = listeTasks.findIndex((element) => element.id == newID);
      assert.equal(pos, 2);
      deleteTodo(newID);
      assert.equal(listeTasks.length, 2);
    });
    it("should return an error", function () {
      assert.throws(
        () => {
          let newID = undefined;
          deleteTodo(newID);
        },
        TypeError,
        "Element manquants"
      );
      assert.throws(
        () => {
          let newID = "";
          deleteTodo(newID);
        },
        TypeError,
        "Element manquants"
      );
    });
  });
});
