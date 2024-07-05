import { NoteManager } from "./note-management.js";
const appNote = () =>{
    const noteManager = new NoteManager(); // Instantiate the class NoteManeger for use
    const $formNote = document.getElementById("formNote");  // Obtain element form
    $formNote.addEventListener("submit", (e)=>{ // Add event submit to form
        e.preventDefault();
        const $enterNote = document.getElementById("enterNote");

        if(!$enterNote.value){ // Verify enter value
            console.log({message: "Error. Please, complete the field"});
            return;
        }
        console.log({message: "Entered note"})
        noteManager.addNote($enterNote.value)
    })

}

export default appNote;