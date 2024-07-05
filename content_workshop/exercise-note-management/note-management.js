import appNote from "./app.js";
class Note{
    constructor(id,description, important = false){
        this.id = id;
        this.description = description;
        this.important = important;
    }

    toggleImportant(){
        this.important = !this.important;
    }
    toggleDescription(newDescription){
        this.description = newDescription;
    }
}

export class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem("notes")) || [];
        console.log(this.notes)
        this.loadNotes();
        
    }
    addNote(description){  
        const id = this.notes.length
                    ? this.notes[this.notes.length -1].id +1
                    : 1;
        const note = new Note(id,description);
        note["toggle"] = note.toggleImportant.bind(note);
        note["edit"] = note.toggleDescription.bind(note);
        this.notes.push(note);
        this.saveNotes();
        this.loadNotes();
    }
    deleteNote(id){
        this.notes = this.notes.filter(note=> note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }
    editNote(id,description){
        const note = this.notes.find(note=> note.id === id);
        note.edit(description);
        this.saveNotes();
        this.renderNotes();
    }
    saveNotes(){
        localStorage.setItem("notes", JSON.stringify(this.notes));
    }
    loadNotes(){
        this.renderNotes();
    }
    toggleImportantNote(id){
        const note = this.notes.find(note=>note.id === id);
        console.log(note)
        note.toggle();
        this.saveNotes();
        this.renderNotes();
    }
    renderNotes(){
        const $List = document.getElementById("listNote"); // Obtain element list content for inject html elements
       $List.innerHTML = ``;
       this.notes.forEach(note => {
            console.log(note)
            const $itemList          = document.createElement("LI"); // Create html elements
            const $contentItemList   = document.createElement("DIV");
            const $buttonEdit        = document.createElement("BUTTON");
            const $buttonDelete      = document.createElement("BUTTON");
            const $buttonImportant   = document.createElement("BUTTON");
            const $line              = document.createElement("HR");

            $itemList.textContent = note.description;
            $buttonImportant.textContent = note.important ? "Important": "Not important"

            //Add event to button delete
            $buttonDelete.addEventListener("click", ()=>{
                const confirmChoose = confirm("Do you want delete the note?");
                if(!confirmChoose){
                    console.log({message: "Cancel delete"});
                    return;
                }
                this.deleteNote(note.id);
            });

            // Add event to button edit
            $buttonEdit.addEventListener("click", ()=>{
                const descriptionNew = prompt("Enter new description of the note");
                this.editNote(note.id,descriptionNew);
            })

            // Add event to button Important
            $buttonImportant.addEventListener("click", ()=>{
                this.toggleImportantNote(note.id);
            })

            this.changeInnerHtmlButtons($buttonEdit,$buttonDelete,$buttonImportant,note)
            this.injectElements($itemList,$contentItemList, $buttonEdit, 
                                $buttonDelete, $buttonImportant, $List,$line);
            this.addClassName($buttonEdit, $buttonDelete, $buttonImportant)
       });
    }
    addClassName($buttonEdit, $buttonDelete, $buttonImportant){
        $buttonEdit.setAttribute("class", "btn btn-primary");
        $buttonDelete.setAttribute("class", "btn btn-danger");
        $buttonImportant.setAttribute("class", "btn btn-success")
    }
    changeInnerHtmlButtons($buttonEdit, $buttonDelete, $buttonImportant,note){
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

document.addEventListener("DOMContentLoaded", appNote)
