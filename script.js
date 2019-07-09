var todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleCompletedAll: function () {
    var completedCount = 0;

    // Number of completed todos 
    this.todos.forEach(function (todo) {
      if (todo.completed) {
        completedCount++;
      }
    });

    // If everything is TRUE, make it all FALSE
    if (completedCount === this.todos.length && completedCount !== 0) {
      this.todos.forEach(function (todo) {
        todo.completed = false;
      });

      //Otherwise, make everything TRUE
    } else {
      this.todos.forEach(function (todo) {
        todo.completed = true;
      })
    }
    view.displayTodos();
  }
};

// var displayTodosButton = document.getElementById("displayTodos");
// var toggleAllButton = document.getElementById("toggleAll");

// displayTodosButton.addEventListener("click", function () {
//   todoList.displayTodos();
// });

// toggleAllButton.addEventListener("click", function () {
//   todoList.toggleCompletedAll();
// });


//handle html buttons action 
var handlers = {
  toggleAll: function () {
    todoList.toggleCompletedAll();
  },
  addTodo: function () {
    // get element from input, add to todos array then clear the input textfield
    var addTodoText = document.getElementById("textTodo");
    todoList.addTodo(addTodoText.value);
    addTodoText.value = "";
    view.displayTodos();
  },
  changeTodo: function () {
    var changeTodoPosition = document.getElementById("changePositionTodo");
    var changeTodoText = document.getElementById("changeTodoText");
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
    changeTodoText.value = "";
    changeTodoPosition.value = "";
    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleTodo: function () {
    var toggleCompleted = document.getElementById("toggleTodo");
    todoList.toggleCompleted(toggleCompleted.valueAsNumber);
    toggleCompleted.value = "";
    view.displayTodos();
  }
};

var view = { // object to deal with the client ui
  displayTodos: function () {
    //select the html ul and make it empty
    var todoUl = document.querySelector("ul");
    todoUl.innerHTML = "";
    var completed = "(x) ";
    var notCompleted = "( ) "

    // for every item in todos add list item
    todoList.todos.forEach(function (todo, position) {
      var todoLi = document.createElement("li");
      var todoText = todo.todoText;

      if (todo.completed) {
        todoLi.textContent = completed + todoText;
      } else {
        todoLi.textContent = notCompleted + todoText;
      }

      todoLi.id = position;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    }, this); // specify this to refer to view object because we have forEach function which would refer this to undefined so createDeleteButton would not work
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },

  //Event delegation(design pattern):
  setUpEventListeners: function () {
    // on click on one of the items in ul we get info of the click event, then from info we get the parent ID of delete button if it was clicked.
    var todoUl = document.querySelector("ul");
    todoUl.addEventListener("click", function (event) {
      console.log(event.target.parentNode.id);

      //element clicked 
      var elementClicked = event.target;

      // check if the element clicked on is a button 
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    })
  }
};

view.setUpEventListeners();