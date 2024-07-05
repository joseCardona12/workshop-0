class Task {
    constructor(id, description, completed = false){ // Is a special function
        this.id = id;
        this.description = description;
        this.completed = completed
    }

    toggleComplete(){ // Change state of variable completed. If true change false and again 
        this.completed = ! this.completed;
    }
}

class TaskManager { // This is class TaskManager
    constructor(){ // This constructor defined the rule of class. Every time that instantiate is executed this function
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Obtain object array with task of localStorage. There is a condition for obtain value
        this.loadTasks(); // is called method loadTasks
    }

    addTask(description){ // Method for add task 
        const id = this.tasks.length // Obtain lenght of task localStorage
                    ? this.tasks[this.tasks.length -1].id + 1 // Obtain last position of array 
                    : 1;
        const task = new Task(id,description); // Instantiate Task for use. Require two parameter
        task["toggle"] = task.toggleComplete.bind(task); // Is used bind for create new function that has te this configured to specific value - object
        this.tasks.push(task) // Add task to tasks 
        this.saveTasks(); // Save tasks use method saveTasks. This function use localStogare for save tasks
        this.renderTasks(); // Render task
    }
    deleteTask(id){ // Delete task for id
        this.tasks = this.tasks.filter(task=>task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }
    toggleTaskComplete(id){ // 
        const task = this.tasks.find(task=>task.id === id); // Find task for id 
        if(!task){ // If not exits task show object error
            console.log({message: "Error. Task not found"});
            return;
        }
        task.toggle(); // Change state complete task 
        this.saveTasks();
        this.renderTasks();
    }
    loadTasks(){ // Funtion for render app 
        this.renderTasks(); // Use/call method render Tasks
    }
    saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks)) // Send tasks to localStorage and convert a text 
    }
    renderTasks(){
        const $taskList = document.getElementById("task-list"); // Obtain element of html
        $taskList.innerHTML = ''; // Change content of task list
        this.tasks.forEach(task=>{
            const $itemList = document.createElement("LI"); // Create new element LI
            const $itemButtonComplete = document.createElement("BUTTON"); // Create new element button
            const $deleteButton = document.createElement("BUTTON"); // Create new element button
            $itemList.textContent = task.description; // Change text content of element html for description
            $itemButtonComplete.textContent = "Not complete";
            $itemList.className = task.completed // If is true execute code true
                              ? 'item-complete'
                              : '';

            $itemButtonComplete.addEventListener("click", ()=>{ // Add event to element button for change state complete
               this.toggleTaskComplete(task.id); // Call function toggle
               $itemButtonComplete.textContent = "Complete"; // Change textContent of element
            })

            $deleteButton.className = "delete-button";
            $deleteButton.textContent = "Delete";
            $deleteButton.addEventListener("click", (e)=>{
                e.stopPropagation();
                this.deleteTask(task.id)
            });
            
            $itemList.appendChild($deleteButton); // Add create elements to father element
            $itemList.appendChild($itemButtonComplete);
            $taskList.appendChild($itemList)
            }
        )
    }
}

document.addEventListener("DOMContentLoaded", ()=>{ // When domContentLaded is true execute code
    const $taskManager = new TaskManager(); // Instantiate class TaskManager 
    const $addTaskButton = document.getElementById("add-task") // Obtain elemnt button with id "add-task"

    $addTaskButton.addEventListener("click", ()=>{ // Add event elemnt button 
        const $newTaskValue = document.getElementById("new-task").value;
        if(!$newTaskValue){
            console.log({message: "Error. Please, complete the field"});
            return;
        }
        $taskManager.addTask($newTaskValue);
        document.getElementById("new-task").value = '';
    })
    
})
