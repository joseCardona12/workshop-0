## Informe del ejercicio notes

### Clases 
#### Clase Note
1. Creación de la clase Note
2. Creación del constructor de la clase. El constructor requiere 3 parámetros __id__, __description__ y por degecto __important__
3. Creación del método __toggleImportant()__ para cambiar el estado del important según el usuario.
4. Creación del método __toggleDescription()__ para cambiar el estado
de la descripción de la nota 

#### Clase NoteManager
1. Creación de la clase NoteManager

2. ##### Creación del constructor de la clase
    - Dentro del constructor se obtienen las notas del localstorage dependiendo de una condición. Si hay notas obtenerlas, sino crear un array vacío
    - Dentro del constructor se llama el método __loadNotes()__, este método a su vez llama el métdo __renderNotes()__

3. ##### Creación del método addNote
    - El método requiere un parámetro __description__
    - Se obtiene el id por medio de la propiedad length de las notas y se guarda en una constante
    - La constante id depende de una condición, si no se cumple el id
    será 1
    - Se instancia la clase Note y se pasasn los argumentos __id__ y __description__
    - Se agrega dos nuevas propiedades al objeto notes __toggle__ y __edit__, estás propiedades ocupan las refrencias de las funciones especificadas en clase Note __toggleImportant__ y __toggleDescription__.Asimismo, para poder utilzar los respectivos métodos sin problemas es necesario utilizar __bind__, el cual mantiene la configuración del this según el objeto principal y ejecutar en el momento que la llamemos.
    - Se agrega la note con los cambios al objeto y/o array de objetos __notes__
    - Se llama el método __saveNotes()__ para guardar los cambios en el __localStorage__
    - Se llama el método __loadNotes()__ para cargar las notas renderizando los cambios respectivos

4. ##### Creación del método deleteNote
    - Se filtra la nota por id y se reasigna notes según las notas diferentes a la seleccionada
    - Se llama el método __saveNotes()__ para guardar las notas
    - Se renderiza las notas por medio del método __renderNotes()__

5. ##### Creación del método editNote
    - Se utiliza el método __find__ para encontrar la nota por id y guardarla en una variable y llamar el método asignado a la propieda __edit__. Este método requiere __description__
    - Se guarda las notas por medio del método __saveNotes()__
    -Se renderiza las notas por medio del método __renderNotes()__

6. ##### Creación del método saveNotes
    - Este método utiliza el localStorage para guardar las notas transformado en texto por medio de JSON.stringify()

7. ##### Creación del método loadNotes
    - Esté método llamaa el método __renderNotes()__
    con el fin de rendizar las notas

8. ##### Creación del método togleImportantNote
    - Se encuentra la nota por medio del método __find__ para recorrer el array y obtner el la nota encontrada.
    - Se ejecuta la función __toggleImportant__ por medio de la refernecia __toggle__, debido a que se guardó en esa propieda para agregarla al array __notes__
    - Se ejecuta el método __saveNotes()__
    - Se ejecuta el método __renderNotes()__

9. ##### Creación del método renderNotes
    - Obtener el elemento list del documento html
    - Cambiar el innertHTML del elemento list
    - Iterar las notas parar utilizar cada note individualmente y agregar los respectivos anexos
    - Crear los elementos html desde javascript __[LI,DIV,BUTTON,BUTTON,BUTTON,HR]__
    - Cambiar el contenido del elemento __LI__ por la descripción de la note
    - Cambiar el contenido del elemento __BUTTON__ por el estado importante de la note, dependiendo de la existencia del estado __[true,false]__
    - Agregar el evento clic al botón __buttonDelete__ para eliminar las notes
    - Agreagr el evento clck al botón __buttonEdit__ para editar las notes
    - Agregar el evento click al botón __buttonimportant__ parar cambiar el estado de las notes
    - Ejecutar el método __changeInnerHtmlButtons__ para cambiar el contenido de los botones
    - Ejecutar el método __injectElements__ para inyectar los elementos creados desde javascript al documento html
    - Ejecutar el método __addClassName__ para agregar las clases a los elementos botones

10. ##### Código javascript comentado 
###### Archivo note-management.js
```

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
```

###### Archivo app.js
```
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
 