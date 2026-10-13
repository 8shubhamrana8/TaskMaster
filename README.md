# TaskMaster 🚀 - https://8shubhamrana8.github.io/TaskMaster/

> *Organized mind. Accomplished goals.*

A minimalist, dark-themed Todo List web application built following The Odin Project curriculum. TaskMaster features a modular ES6 architecture, dynamic filtering, persistent local storage, and custom project organization.

---

## ✨ Features

* **Task Management:** Create, view, complete, and delete tasks with priority levels (Low, Medium, High) and due dates.
* **Project Organization:** Group tasks into custom projects or use the default project workspace.
* **Smart Date Filters:** Instantly view tasks categorized by **All Tasks**, **Today**, or **This Week** (powered by `date-fns`).
* **Data Persistence:** Automatically saves your projects and tasks to the browser's `localStorage` with full model re-hydration.
* **Event Delegation:** High-performance, scalable UI event handling for dynamic elements.
* **Sleek Modern UI:** Crafted with a dark-mode aesthetic, CSS gradients, and smooth hover micro-interactions.

---

## 🛠️ Built With

* **JavaScript (ES6 Modules):** Modular architecture handling separation of concerns.
* **Webpack:** Asset bundling and configuration.
* **date-fns:** Modern JavaScript date utility library for filtering tasks by date.
* **HTML5 & CSS3:** Responsive layouts, CSS Flexbox, and native `<dialog>` modals.

---

## 📁 Project Architecture

```text
src/
├── appState.js      # Centralized application runtime state and actions
├── models.js        # ES6 Classes for Project and Todo with JSON conversion
├── storage.js       # LocalStorage integration and data persistence layer
├── dateFilter.js    # Date helper functions using date-fns
├── dom.js           # UI rendering engine and DOM manipulation
├── main.js          # App entry point and event delegation controller
├── styles.css       # Visual styling and responsive design
└── index.html       # Main HTML template

🚀 Getting Started
Prerequisites
Make sure you have Node.js installed on your machine.

Installation & Local Setup
Clone the repository:

Bash
git clone [https://github.com/your-username/taskmaster.git](https://github.com/your-username/taskmaster.git)
cd taskmaster
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm start
Open your browser and navigate to http://localhost:8080 (or the port specified by your Webpack dev server).
