import { Project, Todo } from "./models";

// Creating storage key for our browser

const STORAGE_KEY = "todo_appdata";


// function to create a defaultData which relevant functions can get
function getDefaultData() {
    const defaultProject = new Project();

    // Add default todo to it, first get today's date
    const todayStr = new Date().toISOString().split('T')[0];

    const defaultTodo = new Todo({dueDate: todayStr, inProjectId: defaultProject.id})

    defaultProject.addTodo(defaultTodo);

    return [defaultProject];

}

export function saveData(projects) {
    try {
        // Save data with storage key, later use this key to retieve data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch(error) {
        console.error('Data saving failed! ', error);
    }
}

export function getData() {
    // Load raw data
    const rawData = localStorage.getItem(STORAGE_KEY)

    // Check if raw data exists, if not then create default data
    if (!rawData) {
        const startingData = getDefaultData();
        saveData(startingData);
        return startingData;
    }

    // if exists then parse the data from JSON
    try {
        // convert to class
        const alldata = JSON.parse(rawData);
        return alldata.map((project) => Project.convertFromJSON(project))
    } catch(error){
        console.error('Error retrieving data ', error);
        return getDefaultData();
    }
}