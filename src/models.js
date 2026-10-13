// Models of Project and Todo and basic methods

function generateId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    // Fallback for non-secure contexts or older browsers
    return 'id_' + Math.random().toString(36.2) + Date.now().toString(36);
}

export class Project {
    constructor({id = generateId(), 
                name = "Default Project", 
                todos = [] } = {}) {
                        
                    
                        this.id = id;
                        this.name = name;

                        this.todos = todos.map((todo) => {
                            if (todo instanceof Todo) {
                                return todo;
                            } else {
                                return Todo.convertFromJSON(todo);
                            }
                        });
    }

    addTodo(todo) {
        // push todo to the list of todos
        this.todos.push(todo);
    }

    removeTodo(id) {
        // remove todo with this paricular id
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    static convertFromJSON(data) {
        return new Project(data)
    }

}

export class Todo {
    constructor({id = generateId(), 
                name = "Default Todo",  
                priority = "medium",
                description = "Empty", 
                dueDate,
                isCompleted = false,
                inProjectId} = {}) {
                
                
                    this.id = id;
                    this.name = name;
                    this.priority = priority;
                    this.description = description;
                    this.dueDate = dueDate;
                    this.isCompleted = isCompleted;
                    this.inProjectId = inProjectId;

    }

    toggleIsCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    static convertFromJSON(data) {
        return new Todo(data);
    }
}