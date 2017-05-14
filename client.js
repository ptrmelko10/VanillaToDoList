var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
	  var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos.
    this.todos.forEach(function(todo){
      if(todo.completed) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      if(completedTodos === totalTodos) {
        // Case 1: If everything’s true, make everything false.
        todo.completed = false;
      } else {
        // Case 2: Otherwise, make everything true.
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';


    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      todoLi.textContent = todo.todoText;
      todoLi.id = position;
      todoLi.appendChild(this.createToggleButton(todo.completed));
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },

  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton btn btn-danger';
    return deleteButton;
  },

  createToggleButton: function(status) {
    var toggleButton = document.createElement('button');
    if(status){
      toggleButton.textContent = "\u2611";  //completed: \u2611
    } else {
      toggleButton.textContent = "\u2610"; //open task: \u2610
    }
    toggleButton.className = "toggleButton btn btn-primary";
    return toggleButton;
  },

  setupEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;

      if(elementClicked.className === "deleteButton btn btn-danger") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
      if(elementClicked.className === "toggleButton btn btn-primary") {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setupEventListeners();
