function Todo(description){
	var self = this;
	self.description = ko.observable(description);
	self.completed = ko.observable(false);
}

function TodoApp(){
	var self = this;
	self.todos = ko.observableArray([]);
	self.newTodo = ko.observable("");
	self.saveTodo = function (data, event) { 
        //if enter was pressed then save
        if (event.keyCode == 13) {
            self.todos.push(new Todo(self.newTodo()));
            self.newTodo("");
        }
        return true;
    }   
	self.clearCompleted = function(){
    	self.todos.remove(function(todo) { return todo.completed() })
    }
}