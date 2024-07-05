import appNote from "./app.js";
class Note{ // Class first
    constructor(id,description, important = false){ // Special function. Every time that is instantiated the class is executed this function
        this.id = id;
        this.description = description;
        this.important = important;
    }

    toggleImportant(){ // Method for change state important
        this.important = !this.important;
    }
    toggleDescription(newDescription){ // Method for change the description
        this.description = newDescription;
    }
}

export class NoteManager { // Class second NoteManager
    constructor() { // Special function
        this.notes = JSON.parse(localStorage.getItem("notes")) || []; // Obtain notes of localStorage or create new array 
        console.log(this.notes)
        this.loadNotes(); // Is executed method loadNotes
        
    }
    addNote(description){   // Method for add notes
        const id = this.notes.length // Obtain id for length of notes
                    ? this.notes[this.notes.length -1].id +1
                    : 1;
        const note = new Note(id,description); // Instantiate class Note on note
        note["toggle"] = note.toggleImportant.bind(note); // Add property new with reference to method toggleImportant and is used bind for keep the context this of instantiate
        note["edit"] = note.toggleDescription.bind(note); // Add property new with reference to method toggleDescription
        this.notes.push(note); // Add note to notes using push
        this.saveNotes(); // Is executed saveNotes
        this.loadNotes(); // Is executed loadNotes
    }
    deleteNote(id){ // Method delete note for id
        this.notes = this.notes.filter(note=> note.id !== id); // Filter the notes different to id 
        this.saveNotes(); // Is executed saveNotes
        this.renderNotes(); // Is executed renderNotes
    }
    editNote(id,description){ // Method for note edit using the parameters id and description
        const note = this.notes.find(note=> note.id === id); // Is found the note for id and is saved the note for use
        note.edit(description); // Is executed el method edit for reference
        this.saveNotes(); // Is executed saveNotes 
        this.renderNotes(); // Is executed renderNotes
    }
    saveNotes(){ // Method for notes save
        localStorage.setItem("notes", JSON.stringify(this.notes)); // Is saved the notes using localStorage
    }
    loadNotes(){ // Method that execute render Notes and show changes
        this.renderNotes();
    }
    toggleImportantNote(id){ // Method for change state of property important
        const note = this.notes.find(note=>note.id === id); // Is found note for id and save note on a variable
        console.log(note)
        note.toggle(); // Is executed the method for change state important
        this.saveNotes(); // Is executed method saveNotes
        this.renderNotes(); // Is executed method renderNotes
    }
    renderNotes(){ // Method for notes render and show changes
        const $List = document.getElementById("listNote"); // Obtain element list content for inject html elements
       $List.innerHTML = ``; // Change content element
       this.notes.forEach(note => { // Iterate notes using forEach
            console.log(note)
            const $itemList          = document.createElement("LI"); // Create html elements
            const $contentItemList   = document.createElement("DIV");
            const $buttonEdit        = document.createElement("BUTTON");
            const $buttonDelete      = document.createElement("BUTTON");
            const $buttonImportant   = document.createElement("BUTTON");
            const $line              = document.createElement("HR");

            $itemList.textContent = note.description; // Change el textContent of element list
            $buttonImportant.textContent = note.important ? "Important": "Not important" // Change the textContent button dependence a condition is true

            //Add event to button delete
            $buttonDelete.addEventListener("click", ()=>{
                const confirmChoose = confirm("Do you want delete the note?"); // Confirm choose of user
                if(!confirmChoose){ // Condition false confirm choose
                    console.log({message: "Cancel delete"}); // Show error
                    return;
                }
                this.deleteNote(note.id); // Delete note using method deleteNote
            });

            // Add event to button edit
            $buttonEdit.addEventListener("click", ()=>{
                const descriptionNew = prompt("Enter new description of the note"); // Obtain description user enter
                this.editNote(note.id,descriptionNew); // Edit note using method editNote
            })

            // Add event to button Important
            $buttonImportant.addEventListener("click", ()=>{
                this.toggleImportantNote(note.id); // Execute method that change state property important note
            })

            this.changeInnerHtmlButtons($buttonEdit,$buttonDelete,$buttonImportant,note) // Change the content button html
            this.injectElements($itemList,$contentItemList, $buttonEdit, // Method for inject html elements
                                $buttonDelete, $buttonImportant, $List,$line);
            this.addClassName($buttonEdit, $buttonDelete, $buttonImportant) // Method for add class name
       });
    }
    addClassName($buttonEdit, $buttonDelete, $buttonImportant){ // Method for add attribute class to buttons
        $buttonEdit.setAttribute("class", "btn btn-primary");
        $buttonDelete.setAttribute("class", "btn btn-danger");
        $buttonImportant.setAttribute("class", "btn btn-success")
    }
    changeInnerHtmlButtons($buttonEdit, $buttonDelete, $buttonImportant,note){ // Method for change content html elements
        $buttonEdit.innerHTML = 
        `<i class="bi bi-pencil-fill"></i> Edit`;

        $buttonDelete.innerHTML = `<i class="bi bi-trash3-fill"></i>Delete`;
        $buttonImportant.innerHTML = note.important 
                                    ? `<i class="bi bi-check-lg"></i> Important`
                                    : `<i class="bi bi-check-lg"></i> Not important`

    }
    injectElements($itemList, $contentItemList, $buttonEdit,$buttonDelete, $buttonImportant, $List, $line){
        $itemList.appendChild($contentItemList); // Inject content button to itemList
        $contentItemList.appendChild($buttonEdit); // Inject button to content button 
        $contentItemList.appendChild($buttonDelete); // Inject button to content button
        $contentItemList.appendChild($buttonImportant); //
        $List.appendChild($itemList) // Inject item 3list to list
        $List.appendChild($line);
    }
}

document.addEventListener("DOMContentLoaded", appNote) // at the moment that domContentLoaded execute the function appNote
