import { getData, saveData } from "./storage";
import { Project, Todo } from "./models";

// state object

const state = {
    
    projects: [],
    activeView: 'all',

}

// getter and setter functions

export function initAppState() {
    
    state.projects = getData();

}

export function getProjects() {
    
    return state.projects;

}

export function getActiveView() {
    
    return state.activeView;

}

export function setActiveView(view) {
    
    // activeView can be all, today, thisWeek and project Id
    state.activeView = view;
    return state.activeView;

}

// adding and removing

export function addProject(data) {
    
    const newProject = new Project({...data});
    state.projects.push(newProject);
    saveData(state.projects);
    return newProject;

}


export function removeProject(id) {
    
    if (state.projects.length > 0 && state.projects[0].id == id ) {
        console.warn("Cannot remove default project! ");
        alert("Cannot remove default project.");
        return;
    }
    
    state.projects = state.projects.filter((project) => project.id !== id);
    
    if (state.activeView === id) {
        // if active is set at the removing project then set it to all
        state.activeView = 'all'
    }
    saveData(state.projects);
}

export function addTodo(data) {
    
    let targetProjectId = data.inProjectId;

    // find project 
    let project = state.projects.find((project) => project.id === targetProjectId);

    // if project not in state.projects
    if(!project) {
        project = state.projects[0];
    }

    // Add todo to project
    const todo = Todo.convertFromJSON({...data, inProjectId: project.id});
    project.addTodo(todo);

    // save to storage
    saveData(state.projects);
}


export function deleteTodo(id) {
    
    for (const project of state.projects) {
        project.removeTodo(id);
    }
    saveData(state.projects);

}


export function toggleTodo(id) {
    // going through all projects to get project with todoid
    for (const project of state.projects) {
        const theTodo = project.todos.find((todo) => todo.id === id);
        if (theTodo) {
            theTodo.toggleIsCompleted();
            saveData(state.projects);
            return;
        }
    }
}