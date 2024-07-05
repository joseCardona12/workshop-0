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
4. ##### Creación del método toggleImportantNote
 