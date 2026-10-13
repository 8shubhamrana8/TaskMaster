import {
    getProjects,
    getActiveView,
} from './appState';

import {isToday, isThisWeek} from './dateFilter'
import { Project } from './models';

export function renderPage() {
    renderSidebar();
    renderTodos();
}

function renderSidebar() {

    const projectListElements = document.getElementById('projectlist');
    const projects = getProjects();

    projectListElements.innerHTML = '';

    projects.forEach((project) => {
        const listElement = document.createElement('li');
        listElement.dataset.id = project.id;

        listElement.innerHTML = `${project.name}<div><button class="removeProject" data-id=${project.id}>X</button></div>`;

        projectListElements.appendChild(listElement);
    });
}

// filters todos and sends them to renderTodos
function getFilteredTodos() {
    const projects = getProjects();
    const activeView = getActiveView();
    const allTodos = projects.flatMap((project) => project.todos);

    if (activeView === 'all') return allTodos;
    if (activeView === 'today') return allTodos.filter((todo) => isToday(todo.dueDate));
    if (activeView === 'week') return allTodos.filter((todo) => isThisWeek(todo.dueDate));

    // if actiview is project Id
    const selectedProject = projects.find((project) => project.id === activeView);
    return selectedProject ? selectedProject.todos : [];
}

// Renders the todos sent by the getFilteredTodos Function
function renderTodos() {
    const container = document.getElementById('container');
    const taskview = document.getElementById('taskview');
    const activeView = getActiveView();
    const todos = getFilteredTodos();
    const projects = getProjects();

    if (['all', 'week', 'today'].includes(activeView)) {
        taskview.innerHTML = `${activeView.toUpperCase()} Tasks`
    } else {
        const selectedProject = projects.find((project) => project.id === activeView);
        taskview.innerHTML = `${selectedProject.name}'s Task`;
    }
      
    container.innerHTML = '';

    if (todos.length === 0) {
        container.innerHTML = 'No tasks found in this view.';
        return;
    }

    todos.forEach((todo) => {
        const card = document.createElement('div');
        const isComplete = todo.isCompleted ? 'Completed' : 'Not completed';
        const projectId = todo.inProjectId;
        const projects = getProjects()
        const project = projects.find((p) => p.id === projectId)

        card.innerHTML = `
        <div class="task">
            <div class="tasktext" id="${todo.id}">
                <div class="tasktitle">${todo.name}</div>
                <div class="taskproject">${project.name} - ${todo.dueDate}</div>
                <div class="taskdescription">${todo.description}</div>
            </div>
            <div class="taskactions">
                <div class="priority badge">${isComplete}</div>
                <div class="priority badge">${todo.priority}</div>
                <div class="done" data-id="${todo.id}">Done</div>
                <div class="removetask" data-id="${todo.id}">Remove</div>
            </div>
        </div>
        `
        container.appendChild(card)
    });
}

// Populate project dropdown inside the task modal form
export function updateProjectDropdown() {
  const select = document.getElementById('todo-project-select');
  select.innerHTML = '';
  getProjects().forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    select.appendChild(opt);
  });
}