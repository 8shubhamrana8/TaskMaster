import './styles.css';

import { 
    initAppState,
    setActiveView,
    addProject,
    addTodo,
    toggleTodo,
    deleteTodo,
    removeProject
} from './appState.js'

import { renderPage, updateProjectDropdown } from './dom.js';


document.addEventListener(("DOMContentLoaded"), () => {
    initAppState();
    renderPage();

    const todoDialog = document.getElementById('todo-dialog');

    document.getElementById('taskBtn').addEventListener(('click'), () => {
        updateProjectDropdown();
        todoDialog.showModal();
    });

    document.getElementById('todo-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo({
        name: document.getElementById('todo-title').value,
        description: document.getElementById('todo-desc').value,
        dueDate: document.getElementById('todo-date').value,
        priority: document.getElementById('todo-priority').value,
        inProjectId: document.getElementById('todo-project-select').value,
        });
        todoDialog.close();
        e.target.reset();
        renderPage();
    });
    
    document.getElementById('close-todo-modal').addEventListener(('click'), () => {
        todoDialog.close();
    });

    document.getElementById('addproject').addEventListener('click', (e) => {
        e.preventDefault();
        if (document.getElementById('projectname').value === '') return;
        const name = document.getElementById('projectname').value;
        if (name.trim() === '') return;
        addProject({name: name});
        document.getElementById('projectname').value = '';
        renderPage();
    });

    document.addEventListener(("click"), (e) => {
        const doneBtn = e.target.closest('.done');
        const removeBtn = e.target.closest('.removetask');
        const timeFilter = e.target.closest('.filter');
        const sidebarProject = e.target.closest('#projectlist > li');
        const removeProjectBtn = e.target.closest('.removeProject');

        if (doneBtn) {
            toggleTodo(doneBtn.dataset.id);
            renderPage();
        };

        if (removeBtn) {
            deleteTodo(removeBtn.dataset.id);
            renderPage();
        };

        if (timeFilter) {
            const viewId = timeFilter.id;
            if (viewId === 'all') setActiveView('all');
            if (viewId === 'today') setActiveView('today');
            if (viewId === 'thisweek') setActiveView('week');
            renderPage();
        }

        if (sidebarProject && !e.target.closest('.removeProject')) {
            setActiveView(sidebarProject.dataset.id);
            renderPage();
        }

        if (removeProjectBtn) {
            removeProject(removeProjectBtn.dataset.id);
            renderPage();
        }
    });
});